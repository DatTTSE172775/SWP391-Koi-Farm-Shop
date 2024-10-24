const express = require('express');
const router = express.Router();
const consignmentController = require('../controllers/consignmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Route POST tạo ký gửi
router.post('/', authMiddleware, consignmentController.createConsignment);

// Route GET lấy tất cả ký gửi
router.get('/', authMiddleware, consignmentController.getAllConsignments);

// Route GET lấy ký gửi theo ID
router.get('/:id', authMiddleware, consignmentController.getConsignmentById);

// Route PUT cập nhật trạng thái ký gửi
router.patch('/:id/status', authMiddleware, consignmentController.updateConsignmentStatus);

module.exports = router;
