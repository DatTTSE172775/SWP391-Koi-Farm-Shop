const { sql } = require("../config/db");

// Tạo đơn hàng mới
exports.createOrder = async (
  customerID,
  totalAmount,
  shippingAddress,
  paymentMethod,
  orderItems
) => {
  const pool = await sql.connect();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    // Insert into Orders table
    const orderResult = await transaction.request()
      .input('customerID', sql.Int, customerID)
      .input('totalAmount', sql.Decimal(10, 2), totalAmount)
      .input('shippingAddress', sql.NVarChar(sql.MAX), shippingAddress)
      .input('paymentMethod', sql.NVarChar(50), paymentMethod)
      .query(`
        INSERT INTO Orders (CustomerID, TotalAmount, ShippingAddress, PaymentMethod, OrderDate, OrderStatus)
        OUTPUT INSERTED.OrderID
        VALUES (@customerID, @totalAmount, @shippingAddress, @paymentMethod, GETDATE(), 'Pending')
      `);

    const orderId = orderResult.recordset[0].OrderID;

    // Insert into OrderDetails table
    for (const item of orderItems) {
      await transaction.request()
        .input('orderId', sql.Int, orderId)
        .input('productId', sql.Int, item.productId)
        .input('packageId', sql.Int, item.packageId)
        .input('quantity', sql.Int, item.quantity)
        .input('unitPrice', sql.Decimal(10, 2), item.unitPrice)
        .input('totalPrice', sql.Decimal(10, 2), item.totalPrice)
        .input('productType', sql.VarChar(50), item.productType)
        .query(`
          INSERT INTO OrderDetails (OrderID, ProductID, PackageID, Quantity, UnitPrice, TotalPrice, ProductType)
          VALUES (@orderId, @productId, @packageId, @quantity, @unitPrice, @totalPrice, @productType)
        `);
    }

    await transaction.commit();

    return { orderId, message: "Order created successfully" };
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating order:", error);
    throw new Error("Error creating order");
  }
};

exports.getOrderDetails = async (orderId) => {
  try {
    const result = await sql.query`
      SELECT 
        od.Quantity,
        CASE 
          WHEN od.ProductType = 'Single Fish' THEN k.Name
          WHEN od.ProductType = 'Package' THEN kp.PackageName
          ELSE NULL
        END AS ProductName,
        CASE 
          WHEN od.ProductType = 'Single Fish' THEN k.Size
          WHEN od.ProductType = 'Package' THEN kp.PackageSize
          ELSE NULL
        END AS Size
      FROM OrderDetails od
      LEFT JOIN KoiFish k ON od.ProductID = k.KoiID
      LEFT JOIN KoiPackage kp ON od.PackageID = kp.PackageID
      WHERE od.OrderID = ${orderId}
    `;
    return result.recordset;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw new Error("Error fetching order details");
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
