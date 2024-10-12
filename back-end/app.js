  const express = require('express');
  const { connectDB } = require('./config/db');
  const dotenv = require('dotenv');
  const cors = require('cors');

  // Cấu hình môi trường từ file .env
  dotenv.config();

  const app = express();

  // Middleware để phân tích JSON
  app.use(express.json());

  // Kích hoạt CORS
  app.use(cors());

  // Kết nối đến cơ sở dữ liệu SQL Server
  connectDB();

  // Import các routes
  const authRoutes = require('./routes/authRoutes');
  const koiRoutes = require('./routes/koiRoutes');
  const orderRoutes = require('./routes/orderRoutes');
  const consignmentRoutes = require('./routes/consignmentRoutes.js');

  // Sử dụng các routes với tiền tố /api
  app.use('/api/auth', authRoutes);
  app.use('/api/koi', koiRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/consignment', consignmentRoutes);


  // Khởi động server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running`);
  });
