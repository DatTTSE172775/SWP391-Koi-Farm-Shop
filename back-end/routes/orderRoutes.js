const express = require('express');
const router = express.Router();
const consignmentController = require('../controllers/consignmentController');

// Định nghĩa route POST để tạo yêu cầu ký gửi cá Koi
router.post('/create', consignmentController.createConsignment);

// Định nghĩa route PUT để cập nhật trạng thái ký gửi
router.put('/:id/status', consignmentController.updateConsignmentStatus);

module.exports = router;
