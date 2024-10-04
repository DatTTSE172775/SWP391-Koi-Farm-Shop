const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const users = [
  {
    id: 1,
    username: "customer",
    password: bcrypt.hashSync("customerpassword", 8),
    role: "customer",
    fullname: "Customer Name",
    phone: "123456789",
    email: "customer@example.com",
  },
  {
    id: 2,
    username: "admin",
    password: bcrypt.hashSync("adminpassword", 8),
    role: "admin",
    fullname: "Admin Name",
    phone: "987654321",
    email: "admin@example.com",
  },
  {
    id: 3,
    username: "staff",
    password: bcrypt.hashSync("staffpassword", 8),
    role: "staff",
    fullname: "Staff Name",
    phone: "123123123",
    email: "staff@example.com",
  },
  {
    id: 4,
    username: "jonnytran",
    password: bcrypt.hashSync("123", 8),
    role: "customer",
    fullname: "Jonny Tran",
    phone: "456456456",
    email: "jonnytran@example.com",
  },
];

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
  if (userExists) {
    return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });
  }

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