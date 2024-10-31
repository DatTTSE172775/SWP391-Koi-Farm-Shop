const express = require('express');
const router = express.Router();
const { getDashboardRevenue, getOrderStatusStatistics } = require("../controllers/dashboardController"); // Import dashboardController

// Định nghĩa route cho tổng doanh thu trên dashboard
router.get('/dashboard/revenue', getDashboardRevenue); // Định nghĩa route

// Route cho API thống kê đơn hàng theo trạng thái
router.get('/orders/status', getOrderStatusStatistics);

module.exports = router;