const express = require('express');
const { connectDB } = require('./config/db'); // Kết nối cơ sở dữ liệu
const routes = require('./routes/routes'); // Import routes
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const app = express();

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:3000',  // Cho phép frontend từ localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Cho phép các phương thức này
    credentials: true  // Cho phép gửi thông tin xác thực (cookie) nếu cần
}));

// Middleware để phân tích dữ liệu JSON từ body request
app.use(express.json());

// Kết nối cơ sở dữ liệu
connectDB();

// Cấu hình Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Koi Fish Management API Documentation',
      contact: {
        name: 'Your Name',
      },
      servers: [{ url: 'http://localhost:5000' }],
    },
  },
  apis: ['./routes/*.js'], // Đường dẫn đến file chứa các route và comment Swagger
};

// Khởi tạo Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sử dụng routes đã gộp
app.use('/api', routes);

// Ví dụ về route login
app.post('/api/auth/login', (req, res) => {
    res.json({ message: 'Login successful' });
});

// Lắng nghe server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger API Docs available at http://localhost:${PORT}/api-docs`);
});