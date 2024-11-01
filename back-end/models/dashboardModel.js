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

// Lấy tổng doanh thu hôm nay cho các đơn hàng đã giao
exports.getRevenueToday = async () => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT SUM(TotalAmount) AS RevenueToday
      FROM Orders
      WHERE CAST(OrderDate AS DATE) = CAST(GETDATE() AS DATE)
      AND OrderStatus = 'Delivered'
    `);

    return result.recordset[0]?.RevenueToday || 0;
  } catch (error) {
    console.error("Error fetching today's revenue:", error);
    throw error;
  }
};

// Lấy tổng doanh thu của tháng này cho các đơn hàng đã giao
exports.getRevenueThisMonth = async () => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT SUM(TotalAmount) AS RevenueThisMonth
      FROM Orders
      WHERE MONTH(OrderDate) = MONTH(GETDATE())
      AND YEAR(OrderDate) = YEAR(GETDATE())
      AND OrderStatus = 'Delivered'
    `);

    return result.recordset[0]?.RevenueThisMonth || 0;
  } catch (error) {
    console.error("Error fetching this month's revenue:", error);
    throw error;
  }
};

// Lấy tổng doanh thu của năm hiện tại cho các đơn hàng đã giao
exports.getRevenueThisYear = async () => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT SUM(TotalAmount) AS RevenueThisYear
      FROM Orders
      WHERE YEAR(OrderDate) = YEAR(GETDATE())
      AND OrderStatus = 'Delivered'
    `);

    return result.recordset[0]?.RevenueThisYear || 0;
  } catch (error) {
    console.error("Error fetching this year's revenue:", error);
    throw error;
  }
};

// Lấy thống kê đơn hàng theo trạng thái
exports.getOrderStatusCounts = async () => {
  try {
    const pool = await connectDB();

    const result = await pool.request().query(`
      SELECT 
        SUM(CASE WHEN OrderStatus = 'Pending' THEN 1 ELSE 0 END) AS Pending,
        SUM(CASE WHEN OrderStatus = 'Processing' THEN 1 ELSE 0 END) AS Processing,
        SUM(CASE WHEN OrderStatus = 'Delivering' THEN 1 ELSE 0 END) AS Delivering,
        SUM(CASE WHEN OrderStatus = 'Delivered' THEN 1 ELSE 0 END) AS Delivered,
        SUM(CASE WHEN OrderStatus = 'Cancelled' THEN 1 ELSE 0 END) AS Cancelled
      FROM Orders
    `);

    // Định nghĩa object chứa kết quả
    const orderStatusCounts = {
      pending: result.recordset[0]?.Pending || 0,
      processing: result.recordset[0]?.Processing || 0,
      delivering: result.recordset[0]?.Delivering || 0,
      delivered: result.recordset[0]?.Delivered || 0,
      cancelled: result.recordset[0]?.Cancelled || 0,
    };

    // Trả về object
    return orderStatusCounts;
  } catch (error) {
    console.error("Error fetching order status counts:", error);
    throw error;
  }
};

// Lấy dữ liệu doanh thu từng ngày trong tháng hiện tại
exports.getDailyRevenueThisMonthData = async () => {
  try {
    const pool = await connectDB();

    const result = await pool.request().query(`
      SELECT 
        CONVERT(VARCHAR, OrderDate, 23) AS Date,  -- Định dạng ngày theo "YYYY-MM-DD"
        SUM(TotalAmount) AS DailyRevenue
      FROM Orders
      WHERE MONTH(OrderDate) = MONTH(GETDATE())
      AND YEAR(OrderDate) = YEAR(GETDATE())
      AND OrderStatus = 'Delivered'
      GROUP BY CONVERT(VARCHAR, OrderDate, 23)
      ORDER BY Date
    `);

    const labels = result.recordset.map(row => row.Date);
    const data = result.recordset.map(row => row.DailyRevenue);

    return { labels, data };
  } catch (error) {
    console.error("Error fetching daily revenue for the current month:", error);
    throw error;
  }
};

// Lấy số lượng yêu cầu ký gửi mới
exports.getPendingConsignmentsCount = async () => {
  try {
    const pool = await connectDB();

    const result = await pool.request().query(`
      SELECT COUNT(*) AS NewConsignments
      FROM KoiConsignment
      WHERE Status = 'Pending'
    `);

    return { newConsignments: result.recordset[0]?.NewConsignments || 0 };
  } catch (error) {
    console.error("Error fetching new consignments count:", error);
    throw error;
  }
};

// Lấy số lượng cá koi đang ký gửi và trạng thái của chúng
exports.getActiveConsignmentData = async () => {
  try {
    const pool = await connectDB();
    
    const result = await pool.request()
      .query(`
        SELECT 
          COUNT(*) AS activeConsignments,
          SUM(CASE WHEN ConsignmentType = 'Care' THEN 1 ELSE 0 END) AS forCare,
          SUM(CASE WHEN ConsignmentType = 'Sale' THEN 1 ELSE 0 END) AS forSale
        FROM KoiConsignment
        WHERE ConsignmentType IN ('Care', 'Sale')
      `);

    const data = {
      activeConsignments: result.recordset[0]?.activeConsignments || 0,
      forCare: result.recordset[0]?.forCare || 0,
      forSale: result.recordset[0]?.forSale || 0,
    };

    return data;
  } catch (error) {
    console.error('Error fetching active consignment data:', error);
    res.status(500).json({ error: 'Failed to fetch active consignment data' });
  }
};

// lấy số data lượng khách hàng quay lại mua hàng trong tháng
exports.getReturningCustomerCount = async () => {
  try {
    // Kết nối đến cơ sở dữ liệu
    const pool = await connectDB();

    // Truy vấn để đếm số lượng khách hàng quay lại mua hàng trong tháng hiện tại
    const result = await pool.request().query(`
      SELECT COUNT(DISTINCT CustomerID) AS returningCustomers
      FROM Orders
      WHERE MONTH(OrderDate) = MONTH(GETDATE()) AND YEAR(OrderDate) = YEAR(GETDATE())
      AND CustomerID IN (
        SELECT CustomerID
        FROM Orders
        GROUP BY CustomerID
        HAVING COUNT(OrderID) > 1
      )
    `);

    // Trả về số lượng khách hàng quay lại mua hàng
    return result.recordset[0].returningCustomers ?? 0;
  } catch (error) {
    // Log lỗi và ném lỗi nếu có lỗi xảy ra
    console.error('Error fetching returning customer count:', error);
    throw error;
  }
};