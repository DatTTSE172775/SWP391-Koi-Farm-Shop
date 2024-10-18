const sql = require('mssql');

const Order = require("../models/orderModel");

 // Tạo đơn hàng
const createOrder = async (req, res) => {
  try {
    const { customerID, totalAmount, shippingAddress, paymentMethod } = req.body;

    // Validate input
    if (!customerID || !totalAmount || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert customerID to integer
    const parsedCustomerID = parseInt(customerID, 10);
    if (isNaN(parsedCustomerID) || parsedCustomerID <= 0) {
      return res.status(400).json({ message: "Invalid CustomerID" });
    }

    const newOrder = await Order.createOrder(
      parsedCustomerID,
      totalAmount,
      shippingAddress,
      paymentMethod
    );

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    if (err.message.startsWith('ValidationError:')) {
      return res.status(400).json({ message: "Validation error", error: err.message });
    }
    if (err.message.startsWith('DatabaseError:')) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    res.status(500).json({ message: "Error creating order", error: "An unexpected error occurred" });
  }
};

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

//Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  console.log(`Received request to update order ${orderId} with status ${status}`);

  // Các trạng thái hợp lệ
  const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  // Nếu trạng thái không hợp lệ, trả về lỗi
  if (!validStatuses.includes(status)) {
    console.log(`Invalid status: ${status}`);
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const result = await Order.updateOrderStatus(orderId, status);
    res.json(result);
  } catch (err) {
    console.error('Error updating order status:', err);
    if (err.message === 'Order not found') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get orders by customer ID
const getOrderByCustomerID = async (req, res) => {
  const { customerID } = req.params;

  try {
    const orders = await Order.getOrdersByCustomerId(customerID);
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this customer." });
    }
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders by customer ID:", err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { getAllOrders, getOrderById, updateOrderStatus, createOrder, getOrderByCustomerID };
