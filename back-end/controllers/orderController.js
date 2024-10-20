const sql = require("mssql");

const Order = require("../models/orderModel");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { customerID, totalAmount, shippingAddress, paymentMethod } = req.body;

  try {
    const newOrder = await Order.createOrder(
      customerID,
      totalAmount,
      shippingAddress,
      paymentMethod
    );
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order." });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.updateOrderStatus(orderId, status);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json({ message: "Order status updated.", order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status." });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.deleteOrder(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json({ message: "Order deleted successfully.", deletedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete order." });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
