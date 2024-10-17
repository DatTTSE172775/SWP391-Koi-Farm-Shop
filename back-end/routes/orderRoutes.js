const express = require('express');
const router = express.Router();
const consignmentController = require('../controllers/consignmentController');
const orderController = require('../controllers/orderController'); // Import orderController

console.log(orderController); // Kiểm tra xem các hàm có tồn tại hay không

// Lấy tất cả đơn hàng
router.get('/all', orderController.getAllOrders);

// Lấy đơn hàng theo ID
router.get('/:id', orderController.getOrderById);

// Cập nhật trạng thái của đơn hàng
router.put('/:id/status', orderController.updateOrderStatus);

// Thêm route để tạo đơn hàng
router.post('/create', async (req, res) => {
    try {
        const { customerID, totalAmount, shippingAddress, paymentMethod } = req.body;
        await orderModel.createOrder(customerID, totalAmount, shippingAddress, paymentMethod);
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
});

// Định nghĩa route POST để tạo yêu cầu ký gửi cá Koi
router.post('/create', consignmentController.createConsignment);

// Định nghĩa route PUT để cập nhật trạng thái ký gửi
router.put('/:id/status', consignmentController.updateConsignmentStatus);

module.exports = router;
