const express = require('express');
const router = express.Router();
const { getDashboardRevenue, getOrderStatusStatistics, getDailyRevenueThisMonth } = require("../controllers/dashboardController"); // Import dashboardController

// Định nghĩa route cho tổng doanh thu trên dashboard
router.get('/dashboard/revenue', getDashboardRevenue); // Định nghĩa route

// Route cho API thống kê đơn hàng theo trạng thái
router.get('/orders/status', getOrderStatusStatistics);

// Route cho API biểu đồ doanh thu
router.get('/revenue/daily', getDailyRevenueThisMonth);

module.exports = router;