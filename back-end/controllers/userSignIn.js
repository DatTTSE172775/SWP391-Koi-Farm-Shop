const { findUserByUsername } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSignIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Wrong username.' });
        }

        console.log('Password:', password); // Log mật khẩu người dùng nhập
        console.log('Stored Password Hash:', user.PasswordHash); // Log mật khẩu đã mã hóa trong DB

        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        console.log('Password Match:', isMatch); // Log kết quả so sánh mật khẩu;

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        const token = jwt.sign(
            { userId: user.UserID, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, role: user.Role, userId: user.UserID });
    } catch (err) {
        console.error('Error during sign in:', err); // Log lỗi chi tiết
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = userSignIn;
