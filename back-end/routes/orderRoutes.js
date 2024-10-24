const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController"); // Import orderController
const orderModel = require("../models/orderModel"); // Import orderModel
const authMiddleware = require("../middleware/authMiddleware");

console.log(orderController); // Kiểm tra xem các hàm có tồn tại hay không

//router.get("/orders", authMiddleware, getAllOrders);

// Lấy tất cả đơn hàng
router.get("/all", orderController.getAllOrders);

// Lấy đơn hàng theo ID
router.get("/:id", orderController.getOrderById);

// Thêm route để tạo đơn hàng
router.post("/create", orderController.createOrder);

// Gán đơn hàng cho nhân viên
router.patch("/:id/assign", orderController.assignOrderToStaff);

//Lấy tất cả đơn hàng của nhân viên
router.get("/user/:userId/orders", orderController.getAllStaffOrdersByUserId);

module.exports = router;
