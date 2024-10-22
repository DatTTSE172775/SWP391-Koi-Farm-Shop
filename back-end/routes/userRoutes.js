const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import userController

// Route: Lấy danh sách nhân viên (Staff)
router.get('/staff', userController.getAllStaff);

module.exports = router;
