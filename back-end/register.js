const express = require('express');
const bcrypt = require('bcryptjs');
const users = require('./users');

const router = express.Router();

// API đăng ký người dùng
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - fullname
 *               - phone
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               fullname:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Yêu cầu không hợp lệ
 */
router.post('/register', (req, res) => {
  const { username, password, fullname, phone, email } = req.body;

  if (!username || !password || !fullname || !phone || !email) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
  }

  const userExists = users.find((u) => u.username === username);
  if (userExists) return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });

  const emailExists = users.find((u) => u.email === email);
  if(emailExists) return res.status(400).json({ message: "Email này đã đăng ký" })
  

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role: "customer", // Mặc định role là customer
    fullname,
    phone,
    email,
  };

  users.push(newUser);
  res.status(201).json({ message: 'Đăng ký thành công' });

});

module.exports = router;