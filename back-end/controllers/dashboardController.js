const { getTotalOrderRevenue, getTotalKoiFishRevenue, getTotalKoiPackageRevenue } = require('../models/dashboardModel.js');

// Hàm xử lý yêu cầu từ route và trả về tổng doanh thu
exports.getDashboardRevenue = async (req, res) => {
  try {
    console.log('Fetching dashboard revenue...');

    // Gọi các hàm model để lấy từng doanh thu riêng lẻ
    const totalOrderRevenue = await getTotalOrderRevenue() || 0;
    const totalKoiFishRevenue = await getTotalKoiFishRevenue() || 0;
    const totalKoiPackageRevenue = await getTotalKoiPackageRevenue() || 0;
    
    // Định nghĩa đối tượng doanh thu
    const revenueData = {
      totalOrderRevenue,
      totalKoiFishRevenue,
      totalKoiPackageRevenue,
    };

    // Trả về đối tượng doanh thu
    return revenueData;

  } catch (error) {
    console.error('Error fetching dashboard revenue:', error);
    res.status(500).send({ message: 'Error fetching dashboard revenue' });
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