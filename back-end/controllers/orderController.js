const sql = require("mssql");

const Order = require("../models/orderModel");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.send(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error." });
  }
};7

// Create a new order
const createOrder = async (req, res) => {
  const {
    customerID,
    totalAmount,
    shippingAddress,
    paymentMethod,
    orderItems,
  } = req.body;

  try {
    const newOrder = await Order.createOrder(
      customerID,
      totalAmount,
      shippingAddress,
      paymentMethod,
      orderItems
    );
    res.status(201).send(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to create order." });
  }
};

// Cập nhật trạng thái thành "Pending"
const updateOrderToPending = async (req, res) => {
  const { orderId } = req.params;

  try {
    const updatedOrder = await Order.updateOrderStatus(orderId, "Pending");
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send({
      message: "Order status updated to Pending.",
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update order to Pending." });
  }
};

// Cập nhật trạng thái thành "Processing"
const updateOrderToProcessing = async (req, res) => {
  const { orderId } = req.params;

  try {
    const updatedOrder = await Order.updateOrderStatus(orderId, "Processing");
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send({
      message: "Order status updated to Processing.",
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update order to Processing." });
  }
};

// Cập nhật trạng thái thành "Shipped"
const updateOrderToShipped = async (req, res) => {
  const { orderId } = req.params;

  try {
    const updatedOrder = await Order.updateOrderStatus(orderId, "Shipped");
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send({
      message: "Order status updated to Shipped.",
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update order to Shipped." });
  }
};

// Cập nhật trạng thái thành "Delivered"
const updateOrderToDelivered = async (req, res) => {
  const { orderId } = req.params;

  try {
    const updatedOrder = await Order.updateOrderStatus(orderId, "Delivered");
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send({
      message: "Order status updated to Delivered.",
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update order to Delivered." });
  }
};

// Cập nhật trạng thái thành "Cancelled"
const updateOrderToCancelled = async (req, res) => {
  const { orderId } = req.params;

  try {
    const updatedOrder = await Order.updateOrderStatus(orderId, "Cancelled");
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send({
      message: "Order status updated to Cancelled.",
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update order to Cancelled." });
  }
};

//Lấy tất cả đơn hàng của Staff
const getAllStaffOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Lấy userId từ route params

    // Kết nối đến database và thực hiện truy vấn để lấy đơn hàng của nhân viên
    const pool = await sql.connect(); // Kết nối đến SQL Server

    const result = await pool.request().input("userId", sql.Int, userId) // Đặt giá trị userId vào truy vấn
      .query(`
        SELECT o.* 
        FROM Orders o
        JOIN Users u ON o.userId = u.userId
        WHERE u.userId = @userId AND u.Role = 'Staff'
      `); // Truy vấn để lấy tất cả đơn hàng cho nhân viên dựa trên UserId và Role

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .send({ message: "No orders found for the given user ID" });
    }

    res.status(200).send(result.recordset); // Trả về danh sách đơn hàng tìm thấy
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    res.status(500).send({ message: "Error fetching orders by user ID" });
  }
};

// Assign order to staff
const assignOrderToStaff = async (req, res) => {
  // Ép kiểu OrderID từ route parameter thành số nguyên
  const orderId = parseInt(req.params.id, 10);
  const { userId } = req.body; // Lấy staffId từ request body

  console.log("Order ID:", orderId); // Kiểm tra xem ID có được truyền đúng không

  if (!orderId) {
    return res.status(400).send({ message: "Order ID is required." });
  }

  try {
    // Kiểm tra xem người dùng có phải là nhân viên không
    const isStaff = await Order.isUserStaff(userId);
    if (!isStaff) {
      return res.status(400).send({ message: "User is not a Staff member." });
    }

    // Check if the order exists
    const order = await Order.getOrderById(orderId);
    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }
    // Gán đơn hàng cho nhân viên
    const assignedOrder = await Order.assignOrderToStaff(orderId, userId);
    if (assignedOrder && assignedOrder.error) {
      return res.status(400).send({ message: assignedOrder.error });
    }

    res.send({ message: "Order assigned to staff.", order: assignedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to assign order to staff." });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.getOrderById(orderId);
    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error." });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.deleteOrder(orderId);
    if (!deletedOrder) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send({ message: "Order deleted successfully.", deletedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to delete order." });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetails = await Order.getOrderDetails(orderId);
    res.send(orderDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch order details." });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderToPending,
  updateOrderToProcessing,
  updateOrderToShipped,
  updateOrderToDelivered,
  updateOrderToCancelled,
  deleteOrder,
  getAllStaffOrdersByUserId,
  assignOrderToStaff,
  getOrderDetails,
};
