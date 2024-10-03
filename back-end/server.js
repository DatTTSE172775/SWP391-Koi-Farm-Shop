const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

// Khởi tạo ứng dụng express
const app = express();
app.use(express.json()); // Để xử lý JSON trong request body

// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("ERROR: JWT_SECRET is not defined in environment variables.");
  process.exit(1);
}

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

app.post("/api/login", (req, res) => {
  const { username, password } = req.body

  // Tìm user trong danh sách users
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Sai tên đăng nhập" });
  }

  // Kiểm tra mật khẩu
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Sai mật khẩu" });
  }

  // Tạo token
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  })

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
app.get("/api/protected", verifyToken, (req, res) => {
  res.status(200).json({
    message: `Hello User ${req.userId}, your role is ${req.userRole}`,
  });
});

// Cấu hình Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Koi Farm Shop API",
      version: "1.0.0",
      description: "API for koi farm shop project",
    },
    servers: [
      {
        url: "http://localhost:5000", // Thay đổi cổng ở đây
      },
    ],
  },
  apis: ["./server.js"], // Chỉ định file nào chứa comment của Swagger
};

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Đăng nhập với username và password
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
 *                 example: 'testuser'
 *               password:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'your_jwt_token'
 *       401:
 *         description: Sai tên đăng nhập hoặc mật khẩu
 */

// Khởi tạo Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  res.status(404).json("Not found");
});

// Khởi động server trên cổng 3000 đổi sang 5000 để tránh xung đột port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api`);
});
