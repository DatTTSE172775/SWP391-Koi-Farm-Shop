const sql = require('mssql');

const Order = require("../models/orderModel");

// Tạo đơn hàng
const createOrder = async (req, res) => {
  const { customerID, totalAmount, shippingAddress, paymentMethod } = req.body;

  try {
    await Order.create({
      customerID,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });
    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Error creating order" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Các trạng thái hợp lệ
  const validStatuses = ['inprogress', 'delivering', 'delivered', 'cancelled'];
  // Nếu trạng thái không hợp lệ, trả về lỗi
  if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
  }

  try {
      const updatedOrder = await Order.findByPk(id);
      if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
      }
      updatedOrder.status = status;
      await updatedOrder.save();
      res.json(updatedOrder);
  } catch (err) {
      console.error('Error updating order status:', err);
      res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { getAllOrders, getOrderById, updateOrderStatus };

