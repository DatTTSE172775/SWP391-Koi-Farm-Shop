const sql = require('mssql');
const sendMail = require('../sendMail');
const bcrypt = require('bcryptjs');

// Hàm tạo mật khẩu ngẫu nhiên
function generateRandomPassword() {
  const chars = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let password = '';
  for (let i = 0; i < 6; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

const forgotPassword = async (req, res) => {
  const { email, userName } = req.body;

  try {
    // Kết nối tới cơ sở dữ liệu SQL Server
    const pool = await sql.connect();

    // Tìm người dùng theo email
    const result = await pool.request()
      .input('Email', sql.VarChar(255), email)
      .query('SELECT * FROM Customers WHERE Email = @Email');

    const user = result.recordset[0];
    
    // Kiểm tra nếu không tìm thấy người dùng
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Tạo mật khẩu mới và mã hóa nó
    const newPassword = generateRandomPassword();
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Cập nhật mật khẩu mới trong bảng Users
    await pool.request()
      .input('UserID', sql.Int, user.UserID)
      .input('PasswordHash', sql.VarChar(255), hashedPassword)
      .query('UPDATE Users SET PasswordHash = @PasswordHash WHERE UserID = @UserID');

    // Thông tin email để gửi mật khẩu mới
    const mailOptions = {
      from: {
        name: 'Koi Farm Shop',
        address: process.env.EMAIL_USER,
      },
      to: req.body.email,
      subject: 'Password Reset',
      html: `
        <b>Hello: ${email}</b>
        <p>Your new password is: ${newPassword}</p>
        <p>Please login and change your password within 10 minutes.</p>
        <p>Koi Farm Shop</p>
      `,
    };

    // Gửi email mật khẩu mới
    await sendMail(mailOptions);

    res.send({ message: 'Password reset successfully. Check your email for the new password.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send({ message: 'Error resetting password' });
  }
};

module.exports = forgotPassword;
