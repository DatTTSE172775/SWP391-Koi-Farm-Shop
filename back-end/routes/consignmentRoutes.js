const express = require('express');
const router = express.Router();
const consignmentController = require('../controllers/consignmentController');

// Route POST tạo ký gửi cá Koi
router.post('/create', consignmentController.getAllConsignments);

// Route PUT cập nhật trạng thái ký gửi
router.put('/:id/status', consignmentController.getConsignmentById);

module.exports = router;
