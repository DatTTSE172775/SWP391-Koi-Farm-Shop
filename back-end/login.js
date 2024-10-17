const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = [
  {
    id: 1,
    username: "customer",
    password: bcrypt.hashSync("customerpassword", 8),
    role: "customer",
  },
  {
    id: 2,
    username: "admin",
    password: bcrypt.hashSync("adminpassword", 8),
    role: "admin",
  },
  {
    id: 3,
    username: "staff",
    password: bcrypt.hashSync("staffpassword", 8),
    role: "staff",
  },
  {
    id: 4,
    username: "jonnytran",
    password: bcrypt.hashSync("123", 8),
    role: "customer",
  },
];

const secretKey = "your_secret_key";

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Đăng nhập người dùng
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
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'your_jwt_token'
 *       401:
 *         description: Sai tên đăng nhập hoặc mật khẩu
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).send({ message: "Tên đăng nhập không chính xác" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: "Mật khẩu không chính xác" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
    expiresIn: 86400, // 24 hours
  });
  res.status(200).json({ token, username: user.username });
});

// Middleware xac thuc jwt
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

// endpoint cần xác thực token
router.get("/api/protected", verifyToken, (req, res) => {
  res.status(200).json({
    message: `Hello User ${req.userId}, your role is ${req.userRole}`,
  });
});

module.exports = router;
