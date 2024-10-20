const { sql } = require('../config/db');

// Tạo đơn hàng mới
exports.createOrder = async (customerID, totalAmount, shippingAddress, paymentMethod) => {
  try {
    const result = await sql.query`
      INSERT INTO Orders (CustomerID, TotalAmount, ShippingAddress, PaymentMethod, OrderDate, OrderStatus)
      OUTPUT INSERTED.*
      VALUES (${customerID}, ${totalAmount}, ${shippingAddress}, ${paymentMethod}, GETDATE(), 'Pending')
    `;
    return result.recordset[0]; // Return the newly created order
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Error creating order');
  }
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (orderId) => {
  try {
    const result = await sql.query`SELECT * FROM Orders WHERE OrderID = ${orderId}`;
    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error fetching order by ID');
  }
};

// Lấy tất cả đơn hàng của khách hàng
exports.getOrdersByCustomerId = async (customerID) => {
  try {
    const result = await sql.query`SELECT * FROM Orders WHERE CustomerID = ${customerID}`;
    return result.recordset;
  } catch (error) {
    throw new Error('Error fetching orders by customer ID');
  }
};

// Cập nhật trạng thái của đơn hàng
exports.updateOrderStatus = async (orderId, status) => {
  try {
    const result = await sql.query`UPDATE Orders SET OrderStatus = ${status} WHERE OrderID = ${orderId}`;
    if (result.rowsAffected[0] === 0) {
      return null; // No order was updated, likely because the orderId doesn't exist
    }
    return { orderId, status }; // Return the updated order information
  } catch (error) {
    throw new Error('Error updating order status');
  }
};

exports.getAllOrders = async () => {
  try {
    const result = await sql.query`SELECT * FROM Orders ORDER BY OrderDate DESC`;
    return result.recordset;
  } catch (error) {
    throw new Error('Error fetching all orders');
  }
};

// Delete an order
exports.deleteOrder = async (orderId) => {
  try {
    const result = await sql.query`DELETE FROM Orders WHERE OrderID = ${orderId}`;
    if (result.rowsAffected[0] === 0) {
      return null; // No order was deleted, likely because the orderId doesn't exist
    }
    return { orderId }; // Return the ID of the deleted order
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Error deleting order');
  }
};
