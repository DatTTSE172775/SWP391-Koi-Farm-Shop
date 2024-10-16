const express = require('express');
const { connectDB } = require('./config/db'); // Kết nối cơ sở dữ liệu
const routes = require('./routes/routes'); // Import routes
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import route xử lý thanh toán MoMo
const paymentRoutes = require('../payment/paymentRoutes');

const app = express(); // Khởi tạo ứng dụng Express

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
  apis: ['./routes/*.js', '../payment/*.js'], // Đường dẫn đến file chứa các route và comment Swagger
};

// Khởi tạo Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sử dụng routes đã gộp
app.use('/api', routes);

// Sử dụng routes cho payment
app.use('/api/payment', paymentRoutes);

// Lắng nghe server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger API Docs available at http://localhost:${PORT}/api-docs`);
});
