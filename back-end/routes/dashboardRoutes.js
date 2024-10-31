const express = require('express');
const router = express.Router();
const { getDashboardRevenue, getOrderStatusStatistics, getDailyRevenueThisMonth, getPendingConsignments, getActiveConsignment, } = require("../controllers/dashboardController"); // Import dashboardController

// Định nghĩa route cho tổng doanh thu trên dashboard
router.get('/dashboard/revenue', getDashboardRevenue); // Định nghĩa route

// Route cho API thống kê đơn hàng theo trạng thái
router.get('/orders/status', getOrderStatusStatistics);

// Route cho API doanh thu tháng này
router.get('/revenue/daily', getDailyRevenueThisMonth);

// Route cho API số lượng yêu cầu ký gửi mới
router.get('/consignments/pending', getPendingConsignments);

// Route cho API số lượng ký gửi hiện có
router.get('/consignments/active', getActiveConsignment);

module.exports = router;