const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController'); // Import dashboardController

// Định nghĩa route cho tổng doanh thu trên dashboard
router.get('/', getDashboardData); // Định nghĩa route

module.exports = router;