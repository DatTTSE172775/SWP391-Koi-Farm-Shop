const { 
  getRevenueToday, 
  getRevenueThisMonth, 
  getRevenueThisYear,
  getOrderStatusCounts,
  getDailyRevenueThisMonthData,
  getPendingConsignmentsCount,
  getActiveConsignmentData,
  getReturningCustomerCount,
  getDailyOrderCountThisMonth,
  getPendingOrdersInfoData,
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

// Lấy dữ liệu doanh thu từng ngày trong tháng hiện tại
exports.getDailyRevenueThisMonth = async (req, res) => {
  try {
    const dailyRevenueData = await getDailyRevenueThisMonthData();
    res.status(200).json(dailyRevenueData);
  } catch (error) {
    console.error('Error fetching daily revenue data:', error);
    res.status(500).json({ message: 'Error fetching daily revenue data' });
  }
};

// Lấy số lượng yêu cầu ký gửi mới
exports.getPendingConsignments = async (req, res) => {
  try {
    const pendingConsignmentsCount = await getPendingConsignmentsCount();
    res.status(200).json(pendingConsignmentsCount);
  } catch (error) {
    console.error('Error fetching new consignments count:', error);
    res.status(500).json({ message: 'Error fetching new consignments count' });
  }
};

// Lấy số lượng ký gửi hiện có
exports.getActiveConsignment = async (req, res) => {
  try {
    const activeConsignmentData = await getActiveConsignmentData();
    res.status(200).json(activeConsignmentData);
  } catch (error) {
    console.error("Error fetching active consignment data:", error);
    res.status(500).json({ message: "Error fetching active consignment data" });
  }
};

// Xử lý việc đếm khách hàng quay lại 
exports.getReturningCustomers = async (req, res) => {
  try {
    // Gọi hàm từ model để lấy số lượng khách hàng quay lại
    const count = await getReturningCustomerCount();
    // Trả về phản hồi JSON với trạng thái 200 nếu thành công
    res.status(200).json({ returningCustomers: count });
  } catch (error) {
    // Log lỗi và trả về phản hồi với lỗi 500 nếu có lỗi
    console.error('Error fetching returning customer data:', error);
    res.status(500).json({ message: 'Error fetching returning customer data' });
  }
};

// Hàm xử lý yêu cầu API lấy số lượng đơn hàng theo ngày trong tháng hiện tại
exports.getDailyOrderCount = async (req, res) => {
  try {
    // Gọi hàm từ model để lấy dữ liệu
    const result = await getDailyOrderCountThisMonth();
    
    // Trả về phản hồi thành công với dữ liệu JSON
    res.status(200).json(result);
  } catch (error) {
    // Trả về phản hồi lỗi nếu xảy ra vấn đề
    res.status(500).json({ error: 'Failed to fetch daily order count' });
  }
};

// Controller to get detailed information of pending orders
exports.getPendingOrdersInfo = async (req, res) => {
  try {
      const data = await getPendingOrdersInfoData();
      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch pending order details' });
  }
};