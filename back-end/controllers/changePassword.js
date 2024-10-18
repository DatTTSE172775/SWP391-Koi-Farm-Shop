const sql = require('mssql');
const bcrypt = require('bcryptjs');

const changePassword = async (req, res) => {
    const { userId } = req.user; // Lấy userId từ token
    const { oldPassword, newPassword } = req.body;

    try {
        // Kết nối tới cơ sở dữ liệu
        const pool = await sql.connect();

        // Tìm người dùng bằng ID
        const result = await pool.request()
            .input('UserID', sql.Int, userId)
            .query('SELECT * FROM Users WHERE UserID = @UserID');

        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(oldPassword, user.PasswordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu trong cơ sở dữ liệu
        await pool.request()
            .input('UserID', sql.Int, user.UserID)
            .input('PasswordHash', sql.VarChar(255), hashedPassword)
            .query('UPDATE Users SET PasswordHash = @PasswordHash WHERE UserID = @UserID');

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = changePassword;
