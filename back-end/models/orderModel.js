const { sql } = require('../config/db');

// Tạo đơn hàng mới
exports.createOrder = async (customerID, totalAmount, shippingAddress, paymentMethod) => {
  try {
    await sql.query`INSERT INTO Orders (CustomerID, TotalAmount, ShippingAddress, PaymentMethod, OrderDate, OrderStatus)
                    VALUES (${customerID}, ${totalAmount}, ${shippingAddress}, ${paymentMethod}, GETDATE(), 'Pending')`;
  } catch (error) {
    throw new Error('Error creating order');
  }
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (orderID) => {
  try {
    const result = await sql.query`SELECT * FROM Orders WHERE OrderID = ${orderID}`;
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
