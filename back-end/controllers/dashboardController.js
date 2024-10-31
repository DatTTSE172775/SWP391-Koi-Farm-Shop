const { 
  getRevenueToday, 
  getRevenueThisMonth, 
  getRevenueThisYear,
  getOrderStatusCounts,
} = require('../models/dashboardModel.js');

// Lấy tổng doanh thu hôm nay, tháng này và năm nay
exports.getDashboardRevenue = async (req, res) => {
  try {
    const revenueToday = await getRevenueToday();
    const revenueThisMonth = await getRevenueThisMonth();
    const revenueThisYear = await getRevenueThisYear();

    const revenueData = {
      revenueToday,
      revenueThisMonth,
      revenueThisYear,
    };

    // Kiểm tra nếu `res` là hợp lệ trước khi gọi `status`
    if (!res || typeof res.status !== 'function') {
      throw new Error("Invalid response object.");
    }
    res.status(200).json(revenueData);

  } catch (error) {
    console.error('Error fetching dashboard revenue:', error);
    res.status(500).json({ message: 'Error fetching dashboard revenue' });
  }
};


// Lấy dữ liệu tổng quan cho dashboard
exports.getDashboardData = async (req, res) => {
  try {
    const revenue = await exports.getDashboardRevenue(); // Gọi hàm lấy doanh thu
    res.status(200).json({ revenue });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
    
    // gửi phản hồi nếu chưa gửi trước đó
    if (!res.headersSent) {  
      res.status(500).json({ message: 'Error fetching dashboard data' });
    }
  }
};

// Lấy số lượng đơn hàng theo trạng thái
exports.getOrderStatusStatistics = async (req, res) => {
  try {
    const orderStatusCounts = await getOrderStatusCounts();
    res.status(200).json(orderStatusCounts);
  } catch (error) {
    console.error('Error fetching order status statistics:', error);
    res.status(500).json({ message: 'Error fetching order status statistics' });
  }
};