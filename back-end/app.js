const express = require('express');
const { connectDB } = require('./config/db'); // Kết nối cơ sở dữ liệu
const routes = require('./routes/routes');  // Import các route chính
const orderRoutes = require('./routes/orderRoutes'); // Import orderRoutes.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors'); // Import orderRoutes
const paymentRoutes = require('./routes/paymentRoutes'); // Import route cho thanh toán VNPay
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Cấu hình CORS
app.use(cors({
  origin: [
      'http://localhost:3000',
      'https://sandbox.vnpayment.vn',
      process.env.FRONTEND_URL
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware để phân tích dữ liệu JSON từ body request
app.use(express.json());

// Kết nối cơ sở dữ liệu
connectDB().catch(err => console.error('Database connection failed:', err));

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
    components: {
      schemas: {
        PaymentRequest: {
          type: 'object',
          required: ['orderId', 'amount'],
          properties: {
            orderId: {
              type: 'string',
              description: 'Mã đơn hàng',
              example: '123456',
            },
            amount: {
              type: 'number',
              description: 'Số tiền thanh toán',
              example: 100000,
            },
            bankCode: {
              type: 'string',
              description: 'Mã ngân hàng (tùy chọn)',
              example: 'NCB',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: []
    }],
  },
  apis: ['./routes/*.js', './routes/paymentRoutes.js'], // Đảm bảo trỏ đến 'paymentRoutes.js'
};


// Khởi tạo Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sử dụng routes đã gộp
app.use('/api', routes);

// Sử dụng route cho order
app.use('/api/orders', orderRoutes); // Thêm route cho order

// Sử dụng route cho thanh toán VNPay
app.use('/api/paymentRoutes', paymentRoutes); // Thêm route cho thanh toán VNPay

// Sử dụng route cho dashboard
app.use('/api/dashboard', dashboardRoutes);

// Ví dụ về route login
app.post('/api/auth/login', (req, res) => {
    res.json({ message: 'Login successful' });
});

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Lắng nghe server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger API Docs available at http://localhost:${PORT}/api-docs`);
});

