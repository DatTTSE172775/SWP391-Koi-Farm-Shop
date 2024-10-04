const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
const registerRoutes = require("./register");
const loginRoutes = require("./login");

dotenv.config();

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

// Sử dụng các route từ register.js và login.js
app.use("/api", registerRoutes);
app.use("/api", loginRoutes);

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
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./register.js", "./login.js"], // Đảm bảo rằng Swagger lấy định nghĩa từ file register.js và login.js
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware cho route không tìm thấy
app.use((req, res, next) => {
  res.status(404).json("Not found");
});

// Khởi động server trên cổng 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api`);
});
