const express = require('express');
const router = express.Router();
const consignmentController = require('../controllers/consignmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Route POST tạo ký gửi cá Koi
router.post('/createConsignment', authMiddleware, consignmentController.getAllConsignments);

// Route PUT cập nhật trạng thái ký gửi
router.put('/:id/status', authMiddleware, consignmentController.getConsignmentById);

module.exports = router;
