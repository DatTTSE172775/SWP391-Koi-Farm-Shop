const express = require('express');
const router = express.Router();
const { getDashboardRevenue } = require('../controllers/dashboardController'); // Import dashboardController

// Định nghĩa route cho tổng doanh thu trên dashboard
router.get('/dashboard/revenue', getDashboardRevenue); // Định nghĩa route

module.exports = router;