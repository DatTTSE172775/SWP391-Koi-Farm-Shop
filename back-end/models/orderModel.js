const sql = require('mssql');
// Tạo đơn hàng mới
exports.createOrder = async (customerID, totalAmount, shippingAddress, paymentMethod) => {
  try {
    // Validate customerID
    if (!Number.isInteger(customerID) || customerID <= 0) {
      throw new Error('ValidationError: CustomerID must be a positive integer');
    }

    const pool = await sql.connect();
    const result = await pool.request()
      .input('CustomerID', sql.Int, customerID)
      .input('TotalAmount', sql.Decimal(10, 2), totalAmount)
      .input('ShippingAddress', sql.VarChar(255), shippingAddress)
      .input('PaymentMethod', sql.VarChar(50), paymentMethod)
      .query(`
        INSERT INTO Orders (CustomerID, TotalAmount, ShippingAddress, PaymentMethod, OrderDate, OrderStatus)
        VALUES (@CustomerID, @TotalAmount, @ShippingAddress, @PaymentMethod, GETDATE(), 'Pending');
        SELECT SCOPE_IDENTITY() AS OrderID;
      `);
    
    return { OrderID: result.recordset[0].OrderID };
  } catch (error) {
    console.error("Error in createOrder:", error);
    if (error.message.startsWith('ValidationError:')) {
      throw error; // Re-throw validation errors
    }
    if (error.code === 'EPARAM') {
      throw new Error('ValidationError: Invalid parameter value');
    }
    throw new Error('DatabaseError: Failed to create order');
  }
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (OrderID) => {
  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('OrderID', sql.Int, OrderID)
      .query('SELECT * FROM Orders WHERE OrderID = @OrderID');
    return result.recordset[0];
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
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
exports.updateOrderStatus = async (orderID, status) => {
  try {
    console.log(`Attempting to update order ${orderID} with status ${status}`);
    const pool = await sql.connect();
    const result = await pool.request()
      .input('OrderID', sql.Int, orderID)
      .input('Status', sql.VarChar(50), status)
      .query('UPDATE Orders SET OrderStatus = @Status WHERE OrderID = @OrderID');
    
    console.log(`Update result: ${JSON.stringify(result)}`);
    
    if (result.rowsAffected[0] === 0) {
      console.log(`No order found with ID ${orderID}`);
      throw new Error('Order not found');
    }
    
    return { message: 'Order status updated successfully' };
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Lấy tất cả đơn hàng
exports.getAllOrders = async () => {
  try {
    const result = await sql.query`SELECT * FROM Orders ORDER BY OrderDate DESC`;
    return result.recordset;
  } catch (error) {
    throw new Error('Error fetching all orders');
  }
};
