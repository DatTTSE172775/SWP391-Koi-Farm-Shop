const sql = require('mssql');
require('dotenv').config(); // Đảm bảo nạp biến môi trường từ .env

// Cấu hình kết nối SQL Server
const dbConfig = {
  user: process.env.DB_USER,            // Đọc từ biến môi trường DB_USER
  password: process.env.DB_PASSWORD,    // Đọc từ biến môi trường DB_PASSWORD
  server: process.env.DB_SERVER,        // Đọc từ biến môi trường DB_SERVER (phải là string, ví dụ 'localhost')
  database: process.env.DB_NAME,        // Đọc từ biến môi trường DB_NAME
  options: {
    encrypt: true,                      // Bật encrypt nếu dùng Azure, nếu không có thể để false
    trustServerCertificate: true        // Cần nếu bạn sử dụng SQL Server mà không có chứng chỉ SSL
  }
};

// Kết nối cơ sở dữ liệu
const connectDB = async () => {
  try {
    await sql.connect(dbConfig);        // Thực hiện kết nối
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('SQL connection error:', err.message);  // In lỗi ra console nếu xảy ra lỗi

    process.exit(1); // Dừng ứng dụng nếu không kết nối được
  }
};

module.exports = { connectDB, sql };
