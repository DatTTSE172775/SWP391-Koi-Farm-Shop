const { sql, connectDB } = require('../config/db');// Import hàm connectDB để kết nối SQL

// Lấy tổng doanh thu từ các đơn hàng có trạng thái 'Delivered'
exports.getTotalOrderRevenue = async () => {
  try {
    const pool = await connectDB();
  const result = await pool.request().query(`
    SELECT SUM(TotalAmount) AS TotalOrderRevenue
    FROM Orders
    WHERE OrderStatus = 'Delivered'
  `);

  return result.recordset[0]?.TotalOrderRevenue || 0;
  } catch (error) {
    console.error("Error fetching total order revenue:", error);
    throw error;
  }
};

// Lấy tổng doanh thu từ các KoiFish có Availability là 'Sold Out'
exports.getTotalKoiFishRevenue = async () => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT SUM(UnitPrice) AS TotalKoiFishRevenue
      FROM OrderDetails od
      JOIN KoiFish k ON od.KoiID = k.KoiID
      WHERE k.Availability = 'Sold Out'
    `);

    return result.recordset[0]?.TotalKoiFishRevenue || 0;
  } catch (error) {
    console.error("Error fetching total KoiFish revenue:", error);
    throw error;
  }
};

// Lấy tổng doanh thu từ các KoiPackage đã bán
exports.getTotalKoiPackageRevenue = async () => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT SUM(od.UnitPrice * od.Quantity) AS TotalKoiPackageRevenue
      FROM OrderDetails od
      JOIN KoiPackage kp ON od.PackageID = kp.PackageID
    `);

    return result.recordset[0]?.TotalKoiPackageRevenue || 0;
  } catch (error) {
    console.error("Error fetching total KoiPackage revenue:", error);
    throw error;
  }
};
