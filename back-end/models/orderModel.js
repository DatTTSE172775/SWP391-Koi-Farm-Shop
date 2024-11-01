const { sql } = require("../config/db");

const validStatuses = ['Pending', 'Processing', 'Delivering', 'Delivered', 'Cancelled'];

// Hàm tính tổng số tiền (totalAmount) của đơn hàng dựa trên KoiID hoặc PackageID
exports.calculateTotalAmount = async (orderItems) => {
  let totalAmount = 0; // Khởi tạo biến tổng tiền với giá trị ban đầu là 0

  // Kết nối với SQL Server
  const pool = await sql.connect();

  // Duyệt qua từng mục hàng trong orderItems
  for (const item of orderItems) {
    let unitPrice = 0; // Biến để lưu giá đơn vị (unitPrice) của từng sản phẩm

    // Kiểm tra nếu sản phẩm là KoiFish
    if (item.KoiID) {
      // Lấy giá của KoiFish từ bảng KoiFish dựa trên KoiID
      const koiResult = await pool.request()
        .input('KoiID', sql.Int, item.KoiID)
        .query('SELECT Price FROM KoiFish WHERE KoiID = @KoiID');

      // Nếu không tìm thấy KoiFish với ID đã cung cấp, ném lỗi
      if (koiResult.recordset.length === 0) {
        throw new Error(`KoiFish with ID ${item.KoiID} not found.`);
      }

      // Lưu giá đơn vị của KoiFish vào unitPrice
      unitPrice = koiResult.recordset[0].Price;
    } 
    // Kiểm tra nếu sản phẩm là Package
    else if (item.PackageID) {
      // Lấy giá của Package từ bảng Packages dựa trên PackageID
      const packageResult = await pool.request()
        .input('PackageID', sql.Int, item.PackageID)
        .query('SELECT Price FROM Packages WHERE PackageID = @PackageID');

      // Nếu không tìm thấy Package với ID đã cung cấp, ném lỗi
      if (packageResult.recordset.length === 0) {
        throw new Error(`Package with ID ${item.PackageID} not found.`);
      }

      // Lưu giá đơn vị của Package vào unitPrice
      unitPrice = packageResult.recordset[0].Price;
    }

    // Xác định số lượng của sản phẩm: KoiFish luôn có số lượng là 1
    const quantity = item.KoiID ? 1 : item.quantity || 1;

    // Cộng tổng tiền cho sản phẩm này vào totalAmount
    totalAmount += unitPrice * quantity;
  }

  // Trả về tổng số tiền của toàn bộ đơn hàng
  return totalAmount;
};

// Tạo đơn hàng mới
exports.createOrder = async (
  customerID,
  totalAmount,
  shippingAddress,
  paymentMethod,
  orderItems,
) => {
  const pool = await sql.connect();
  const transaction = new sql.Transaction(pool);

  try {
    console.log("Starting order creation..."); // Ghi log bắt đầu

    await transaction.begin();

    // Tạo đơn hàng mới và lấy OrderID
    const orderResult = await transaction
      .request()
      .input("customerID", sql.Int, customerID)
      .input("totalAmount", sql.Decimal(10, 2), totalAmount)
      .input("shippingAddress", sql.NVarChar(sql.MAX), shippingAddress)
      .input("paymentMethod", sql.NVarChar(50), paymentMethod).query(`
        INSERT INTO Orders (CustomerID, TotalAmount, ShippingAddress, PaymentMethod, OrderDate, OrderStatus)
        OUTPUT INSERTED.OrderID
        VALUES (@customerID, @totalAmount, @shippingAddress, @paymentMethod, GETDATE(), 'Pending')
      `);

    const orderId = orderResult.recordset[0].OrderID;
    

    // Insert into OrderDetails table
    for (const item of orderItems) {
      const koiID = item.KoiID || null;  // Nếu không có KoiID thì là null
      const packageID = item.PackageID || null;  // Nếu   không có PackageID thì là null

      // Xác định productType dựa trên KoiID và PackageID
      let productType = "";
      if (koiID && packageID) {
        productType = "Mixed"; // Thay vì "Single Fish, Package"
      } else if (koiID) {
        productType = "Single Fish";
      } else if (packageID) {
        productType = "Package";
      } else {
        throw new Error("Yêu cầu cần có ít nhất 1 Koi Fish hoặc 1 Koi Package.");
      }

      console.log(`Processing item: ${JSON.stringify(item)}`); // Ghi log mục hàng

      // Kiểm tra tồn kho cho Koi hoặc Package
      await checkProductAvailability(koiID, packageID, item.quantity);

      let unitPrice = 0;
      if (koiID) {
        // Lấy giá từ bảng KoiFish nếu có KoiID
        const koiResult = await pool.request()
          .input('koiID', sql.Int, koiID)
          .query('SELECT Price FROM KoiFish WHERE KoiID = @koiID');

        if (koiResult.recordset.length === 0) {
          throw new Error(`KoiFish with ID ${koiID} not found.`);
        }
        unitPrice = koiResult.recordset[0].Price;
      } else if (packageID) {
        // Lấy giá từ bảng Packages nếu có PackageID
        const packageResult = await pool.request()
          .input('packageID', sql.Int, packageID)
          .query('SELECT Price FROM Packages WHERE PackageID = @packageID');

        if (packageResult.recordset.length === 0) {
          throw new Error(`Package with ID ${packageID} not found.`);
        }
        unitPrice = packageResult.recordset[0].Price;
      }

      // Nếu là sản phẩm đơn lẻ (Koi Fish), quantity mặc định là 1
      const quantity = koiID ? 1 : item.quantity || 1;
      const totalPrice = unitPrice * quantity;  // Tính tổng giá

      console.log(`Adding item to OrderDetails: ${JSON.stringify({
        orderId, koiID, packageID, quantity, unitPrice, totalPrice, productType
      })}`); // Ghi log mục hàng chi tiết

      // Thêm sản phẩm vào bảng OrderDetails
      await transaction.request()
        .input('orderId', sql.Int, orderId)
        .input('koiID', sql.Int, koiID)
        .input('packageID', sql.Int, packageID)
        .input('quantity', sql.Int, quantity)
        .input('unitPrice', sql.Decimal(10, 2), unitPrice)
        .input('productType', sql.VarChar(50), productType)
        .query(`
          INSERT INTO OrderDetails (OrderID, KoiID, PackageID, Quantity, UnitPrice, ProductType )
          VALUES (@orderId, @koiID, @packageID, @quantity, @unitPrice, @productType )
        `);
    }

    await transaction.commit();

    console.log("Order committed successfully."); // Ghi log hoàn tất đơn hàng
    return { orderId, message: "Order created successfully." };
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating order:", error); // Ghi log lỗi chi tiết
    throw new Error("Error creating order.");
  }
};

// Kiểm tra tồn kho cho Koi Fish hoặc Koi Package 
const checkProductAvailability = async (koiID, packageID, quantity) => {
  const pool = await sql.connect();

  if (koiID) {
    // Kiểm tra xem Koi với KoiID có còn tồn tại không (vì mỗi cá chỉ có 1)
    const koiResult = await pool.request()
      .input('koiID', sql.Int, koiID)
      .query('SELECT COUNT(*) AS Count FROM KoiFish WHERE KoiID = @koiID');

    if (koiResult.recordset[0].Count === 0) {
      throw new Error(`KoiFish with ID ${koiID} is not available.`);
    }
  } else if (packageID) {
    // Kiểm tra số lượng tồn kho cho Package
    const packageResult = await pool.request()
      .input('packageID', sql.Int, packageID)
      .query('SELECT Quantity FROM Packages WHERE PackageID = @packageID');

    if (packageResult.recordset.length === 0 || packageResult.recordset[0].Quantity < quantity) {
      throw new Error(`Not enough stock for PackageID ${packageID}.`);
    }
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

  //kiểm tra các trạng thái hợp lệ
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid order status: ' + status);
  }

  try {
    const pool = await sql.connect(); // Kết nối với SQL Server

    // Chạy câu lệnh cập nhật trạng thái đơn hàng
    const result = await pool
      .request()
      .input("orderId", sql.Int, orderId)
      .input("status", sql.VarChar(50), status).query(`
        UPDATE Orders
        SET OrderStatus = @status
        WHERE OrderID = @orderId
      `);

    // Kiểm tra nếu không tìm thấy đơn hàng để cập nhật
    if (result.rowsAffected[0] === 0) {
      return null; // Không tìm thấy đơn hàng
    }

    // Trả về thông tin đơn hàng đã được cập nhật
    return { orderId, status };

  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Error updating order status");
  }
};

// Lấy tất cả đơn hàng 
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
    return result.recordset[0].Role === "Staff";
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

// Delete an order and related items from OrderDetails
exports.deleteOrder = async (orderId) => {
  const pool = await sql.connect(); // Kết nối với SQL Server
  const transaction = new sql.Transaction(pool); // Tạo transaction để đảm bảo tính toàn vẹn dữ liệu

  try {
    console.log(`Starting deletion for order: ${orderId}`); // Ghi log kiểm tra

    await transaction.begin(); // Bắt đầu transaction

    // Xóa các mục liên quan từ OrderDetails trước
    await transaction.request()
      .input("orderId", sql.Int, orderId)
      .query(`DELETE FROM OrderDetails WHERE OrderID = @orderId`);

    console.log(`Order details for order ${orderId} deleted successfully.`);

    // Xóa đơn hàng từ bảng Orders
    const result = await transaction.request()
      .input("orderId", sql.Int, orderId)
      .query(`DELETE FROM Orders WHERE OrderID = @orderId`);

    // Kiểm tra nếu không có bản ghi nào được xóa
    if (result.rowsAffected[0] === 0) {
      await transaction.rollback(); // Rollback nếu không tìm thấy đơn hàng
      return null; // Trả về null để báo không tìm thấy đơn hàng
    }

    await transaction.commit(); // Commit transaction sau khi xóa thành công

    console.log(`Order ${orderId} deleted successfully.`);
    return { orderId, message: "Order deleted successfully." }; // Trả về thông báo thành công

  } catch (error) {
    await transaction.rollback(); // Rollback nếu gặp lỗi
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order."); // Ném lỗi để xử lý
  }
};
