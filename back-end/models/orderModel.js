const { sql } = require("../config/db");

// Tạo đơn hàng mới
exports.createOrder = async (
  customerID,
  totalAmount,
  shippingAddress,
  paymentMethod
) => {
  try {
    const result = await sql.query`
      INSERT INTO Orders (CustomerID, TotalAmount, ShippingAddress, PaymentMethod, OrderDate, OrderStatus)
      OUTPUT INSERTED.*
      VALUES (${customerID}, ${totalAmount}, ${shippingAddress}, ${paymentMethod}, GETDATE(), 'Pending')
    `;
    return result.recordset[0]; // Return the newly created order
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Error creating order");
  }
};

// Lấy tất cả đơn hàng của khách hàng
exports.getOrdersByCustomerId = async (customerID) => {
  try {
    const result =
      await sql.query`SELECT * FROM Orders WHERE CustomerID = ${customerID}`;
    return result.recordset;
  } catch (error) {
    throw new Error("Error fetching orders by customer ID");
  }
};

// Cập nhật trạng thái của đơn hàng
exports.updateOrderStatus = async (orderId, status) => {
  try {
    const result =
      await sql.query`UPDATE Orders SET OrderStatus = ${status} WHERE OrderID = ${orderId}`;
    if (result.rowsAffected[0] === 0) {
      return null; // No order was updated, likely because the orderId doesn't exist
    }
    return { orderId, status }; // Return the updated order information
  } catch (error) {
    throw new Error("Error updating order status");
  }
};

exports.getAllOrders = async () => {
  try {
    const result =
      await sql.query`SELECT * FROM Orders ORDER BY OrderDate DESC`;
    return result.recordset;
  } catch (error) {
    throw new Error("Error fetching all orders");
  }
};

// Check if user is staff
exports.isUserStaff = async (userId) => {
  try {
    const result = await sql.query`
      SELECT Role FROM Users WHERE UserID = ${userId}
    `;
    if (result.recordset.length === 0) {
      return false; // User not found
    }
    return result.recordset[0].Role === 'Staff';
  } catch (error) {
    console.error("Error checking user role:", error);
    throw new Error("Error checking user role");
  }
};

// Assign order to staff
exports.assignOrderToStaff = async (orderId, userId) => { 
  try {
    const isStaff = await exports.isUserStaff(userId);
    if (!isStaff) {
      return { error: "User is not a staff member." };
    }

    const result = await sql.query`
      UPDATE Orders
      SET UserID = ${userId}
      WHERE OrderID = ${orderId}
    `;
    if (result.rowsAffected[0] === 0) {
      return null; // No order was updated, likely because the orderId doesn't exist
    }
    return { orderId, userId }; // Return the updated order information
  } catch (error) {
    console.error("Error assigning order to staff:", error);
    throw new Error("Error assigning order to staff");
  }
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (orderId) => {
  try {
    console.log("Fetching order with ID:", orderId); // Log để kiểm tra orderId

    const result =
      await sql.query`SELECT * FROM Orders WHERE OrderID = ${orderId}`;
      console.log("Query result:", result.recordset); // Log để kiểm tra kết quả truy vấn

    if (result.recordset.length === 0) {
      return null; // Order not found
    }
    return result.recordset[0]; // Trả về đơn hàng
  } catch (error) {
    console.error("Error fetching order by ID: ", error);
    throw new Error("Error fetching order by ID");
  }
};

// Delete an order
exports.deleteOrder = async (orderId) => {
  try {
    const result =
      await sql.query`DELETE FROM Orders WHERE OrderID = ${orderId}`;
    if (result.rowsAffected[0] === 0) {
      return null; // No order was deleted, likely because the orderId doesn't exist
    }
    return { orderId }; // Return the ID of the deleted order
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Error deleting order");
  }
};