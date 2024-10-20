const express = require('express');
const router = express.Router();
const consignmentController = require('../controllers/consignmentController');
const orderController = require('../controllers/orderController'); // Import orderController
const orderModel = require('../models/orderModel'); // Import orderModel

console.log(orderController); // Kiểm tra xem các hàm có tồn tại hay không

// Lấy tất cả đơn hàng
router.get('/all', orderController.getAllOrders);

// Lấy đơn hàng theo ID
router.get('/:id', orderController.getOrderById);

// Cập nhật trạng thái của đơn hàng
router.put('/:id/status', orderController.updateOrderStatus);

// Thêm route để tạo đơn hàng
router.post('/create', orderController.createOrder);

module.exports = router;
