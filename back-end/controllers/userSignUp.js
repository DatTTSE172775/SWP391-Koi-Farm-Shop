const bcrypt = require('bcrypt'); // Dùng để mã hóa mật khẩu
const { connectDB, sql } = require('../config/db'); // Import hàm connectDB và đối tượng sql

// Hàm đăng ký người dùng
const userSignUp = async (req, res) => {
    try {
        const { username, password, fullname, phone } = req.body;

        // Kiểm tra xem người dùng đã nhập đầy đủ thông tin chưa
        if (!username || !password || !fullname || !phone) {
            return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin' });
        }

        // Kết nối tới cơ sở dữ liệu
        await connectDB(); // Gọi hàm connectDB để kết nối cơ sở dữ liệu

        // Tạo đối tượng request để thực hiện các truy vấn
        const pool = new sql.Request();

        // Kiểm tra xem username hoặc phone đã tồn tại chưa
        const existingUserQuery = `
            SELECT * FROM Users WHERE Username = @username;
            SELECT * FROM Customers WHERE PhoneNumber = @phone;
        `;
        const existingUserResult = await pool
            .input('username', sql.VarChar, username)
            .input('phone', sql.VarChar, phone)
            .query(existingUserQuery);

        const existingUser = existingUserResult.recordsets[0];
        const existingPhone = existingUserResult.recordsets[1];

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
        }

        if (existingPhone.length > 0) {
            return res.status(400).json({ message: 'Số điện thoại đã được sử dụng' });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Bắt đầu transaction để đảm bảo tính toàn vẹn dữ liệu
        const transaction = new sql.Transaction();
        await transaction.begin();

        try {
            // Tạo một Request mới cho mỗi truy vấn trong transaction

            // 1. Lưu thông tin vào bảng Users
            const userRequest = new sql.Request(transaction);
            const insertUserQuery = `
                INSERT INTO Users (Username, PasswordHash, SubscriptionStatus)
                OUTPUT Inserted.UserID
                VALUES (@username, @passwordHash, 'Active');
            `;

            const userResult = await userRequest
                .input('username', sql.VarChar, username) // Chỉ khai báo các tham số cần thiết cho truy vấn này
                .input('passwordHash', sql.VarChar, passwordHash)
                .query(insertUserQuery);

            const userId = userResult.recordset[0].UserID;

            // 2. Lưu thông tin vào bảng Customers
            const customerRequest = new sql.Request(transaction); // Tạo một Request mới
            const insertCustomerQuery = `
                INSERT INTO Customers (UserID, FullName, Email, PhoneNumber)
                VALUES (@userId, @fullname, @username, @phone);
            `;

            await customerRequest
                .input('userId', sql.Int, userId)
                .input('fullname', sql.VarChar, fullname)
                .input('username', sql.VarChar, username) // Giả sử email là username
                .input('phone', sql.VarChar, phone)
                .query(insertCustomerQuery);

            // Commit transaction sau khi cả hai bảng đã được cập nhật thành công
            await transaction.commit();

            return res.status(201).json({ message: 'Đăng ký thành công' });
        } catch (err) {
            // Rollback nếu có lỗi
            await transaction.rollback();
            return res.status(500).json({ message: 'Lỗi trong quá trình đăng ký', error: err.message });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
    }
};

module.exports = userSignUp;
