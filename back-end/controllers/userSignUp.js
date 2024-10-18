const bcrypt = require('bcrypt');
const { connectDB, sql } = require('../config/db');

const userSignUp = async (req, res) => {
    try {
        const { username, password, fullname, phone, email } = req.body;

        if (!username || !password || !fullname || !phone || !email) {
            return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin' });
        }

        await connectDB();

        const pool = new sql.Request();

        const existingUserQuery = `
            SELECT * FROM Users WHERE Username = @username;
            SELECT * FROM Customers WHERE PhoneNumber = @phone OR Email = @email;
        `;
        const existingUserResult = await pool
            .input('username', sql.VarChar, username)
            .input('phone', sql.VarChar, phone)
            .input('email', sql.VarChar, email)
            .query(existingUserQuery);

        const existingUser = existingUserResult.recordsets[0];
        const existingCustomer = existingUserResult.recordsets[1];

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
        }

        if (existingCustomer.length > 0) {
            if (existingCustomer.some(cust => cust.PhoneNumber === phone)) {
                return res.status(400).json({ message: 'Số điện thoại đã được sử dụng' });
            }
            if (existingCustomer.some(cust => cust.Email === email)) {
                return res.status(400).json({ message: 'Email đã được sử dụng' });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const transaction = new sql.Transaction();
        await transaction.begin();

        try {
            const userRequest = new sql.Request(transaction);
            const insertUserQuery = `
                INSERT INTO Users (Username, PasswordHash, SubscriptionStatus)
                OUTPUT Inserted.UserID
                VALUES (@username, @passwordHash, 'Active');
            `;

            const userResult = await userRequest
                .input('username', sql.VarChar, username)
                .input('passwordHash', sql.VarChar, passwordHash)
                .query(insertUserQuery);

            const userId = userResult.recordset[0].UserID;

            const customerRequest = new sql.Request(transaction);
            const insertCustomerQuery = `
                INSERT INTO Customers (UserID, FullName, Email, PhoneNumber)
                VALUES (@userId, @fullname, @email, @phone);
            `;

            await customerRequest
                .input('userId', sql.Int, userId)
                .input('fullname', sql.VarChar, fullname)
                .input('email', sql.VarChar, email)
                .input('phone', sql.VarChar, phone)
                .query(insertCustomerQuery);

            await transaction.commit();

            return res.status(201).json({ message: 'Đăng ký thành công' });
        } catch (err) {
            await transaction.rollback();
            return res.status(500).json({ message: 'Lỗi trong quá trình đăng ký', error: err.message });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
    }
};

module.exports = userSignUp;
