const sql = require('mssql');

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
};

// Create a new order
const createOrder = async (req, res) => {
  const {
    customerID,
    totalAmount,
    shippingAddress,
    paymentMethod,
    orderItems,
    trackingNumber,
    discount,
    shippingCost,
    promotionID,
  } = req.body;

  // Tạo đơn hàng
  const newOrder = await Order.createOrder(
    customerID,
    totalAmount,
    shippingAddress,
    paymentMethod,
    orderItems,
    discount,
    shippingCost,
    promotionID,
    trackingNumber
  );

  try {
    // Tính tổng tiền
    // // const totalAmount = calculateTotalAmount(orderItems, discount, shippingCost);
    // const totalAmount = Order.calculateTotalAmount(orderItems);

    // Thêm từng item trong orderItems vào OrderDetails
    for (const item of orderItems) {
      const koiID = item.KoiID || null; // Kiểm tra và gán giá trị cho KoiID
      const packageID = item.PackageID || null; // Kiểm tra và gán giá trị cho PackageID
      const quantity = item.quantity || 1;

      // Xác định productType
      const productType = koiID && packageID ? "All" : koiID ? "Single Fish" : "Package";

      // Kiểm tra tồn kho trước khi thêm sản phẩm
      const availability = await Order.checkProductAvailability(koiID, packageID, quantity);

      if (availability.status !== 200) {
        // Nếu phát hiện lỗi, trả về ngay lập tức
        return res.status(availability.status).json({ message: availability.message });
      }

      // Gửi dữ liệu vào OrderDetails
      await Order.addOrderDetail({
        orderId: newOrder.orderId,
        koiID,
        packageID,
        quantity: koiID ? 1 : item.quantity || 1, // Nếu là KoiFish, quantity mặc định là 1
        productType,
        unitPrice: item.unitPrice || 0, // Đơn giá, nếu có
      });
    }

    res.status(201).send(newOrder);
  } catch (err) {
    console.error("Lỗi khi tạo đơn hàng:", err);
    // Xử lý và gửi lỗi
    if (err.status && err.message) {
      return res.status(err.status).send({ message: err.message });
    }
    res.status(500).send({ message: "Lỗi khi tạo đơn hàng." });
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

// Cập nhật trạng thái thành "Delivering"
const updateOrderToDelivering = async (req, res) => {
  const { orderId } = req.params;

  try {
    const updatedOrder = await Order.updateOrderStatus(orderId, "Delivering");
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send({
      message: "Order status updated to Delivering.",
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update order to Delivering." });
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

    // Kiểm tra xem người dùng có phải là nhân viên không
    const isStaff = await Order.isUserStaff(userId);
    if (!isStaff) {
      return res.status(400).send({ message: "User is not a Staff member." });
    }

    // Gọi hàm lấy danh sách đơn hàng theo staff từ data
    const orders = await Order.getAllStaffOrdersByUserIdData(userId);

    // Nếu không tìm thấy đơn hàng, trả về lỗi 404 - Not Found
    if (orders === null) {
      return res
        .status(404)
        .send({ message: "No orders found for the given user ID" });
    }

    res.status(200).send(orders); // Trả về danh sách đơn hàng tìm thấy
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

// Get order by customerID
const getOrderByCustomerId = async (req, res) => {
  const { customerId } = req.params; 
  try {
    const orders = await Order.getOrdersByCustomerId(customerId); 
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this customer." });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders by customer ID:", err);
    res.status(500).json({ message: "Server error." });
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

// Hàm hủy đơn hàng theo orderId
const cancelOrder = async (req, res) => {
  // Lấy orderId từ tham số URL
  const { orderId } = req.params;

  try {
    // Gọi hàm lấy thông tin đơn hàng theo ID từ cơ sở dữ liệu
    const order = await Order.getOrderById(orderId);

    // Nếu không tìm thấy đơn hàng, trả về lỗi 404 - Not Found
    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }

    // Nếu đơn hàng đã được giao (Delivered), không thể hủy
    if (order.OrderStatus === 'Delivered') {
      return res.status(400).send({ message: "Cannot cancel a delivered order." });
    }

    // Cập nhật trạng thái đơn hàng thành 'Cancelled'
    const cancelledOrder = await Order.updateOrderStatus(orderId, 'Cancelled');

    // Trả về thông báo thành công nếu quá trình hủy thành công
    res.send({ message: "Order cancelled successfully.", order: cancelledOrder });
  } catch (err) {
    // Bắt lỗi và trả về thông báo lỗi 500 - Internal Server Error
    console.error(err);
    res.status(500).send({ message: "Failed to cancel order." });
  }
};
// Hàm tổng quát để cập nhật trạng thái của đơn hàng
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.updateOrderStatus(orderId, status);
    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found." });
    }
    res.send({
      message: `Order status updated to ${status}.`,
      order: updatedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Failed to update order to ${status}.` });
  }
};


module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderToPending,
  updateOrderToProcessing,
  updateOrderToDelivering,
  updateOrderToDelivered,
  updateOrderToCancelled,
  deleteOrder,
  getAllStaffOrdersByUserId,
  assignOrderToStaff,
  cancelOrder,
  getOrderByCustomerId,
  updateOrderStatus,
};
