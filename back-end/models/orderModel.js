const { sql, connectDB } = require("../config/db");

const validStatuses = ['Pending', 'Processing', 'Delivering', 'Delivered', 'Cancelled'];
const validPaymentMethods = ['Credit Card', 'Bank Transfer', 'Cash on Delivery'];


// Hàm tính tổng số tiền (totalAmount) của đơn hàng dựa trên KoiID hoặc PackageID
// exports.calculateTotalAmount = async (orderItems) => {
//   let totalAmount = 0; // Khởi tạo biến tổng tiền với giá trị ban đầu là 0

//   const pool = await connectDB();

//   // Duyệt qua từng mục hàng trong orderItems
//   for (const item of orderItems) {
//     let unitPrice = 0; // Biến để lưu giá đơn vị (unitPrice) của từng sản phẩm

//     // Kiểm tra nếu sản phẩm là KoiFish
//     if (item.KoiID) {
//       // Lấy giá của KoiFish từ bảng KoiFish dựa trên KoiID
//       const koiResult = await pool.request()
//         .input('KoiID', sql.Int, item.KoiID)
//         .query('SELECT Price FROM KoiFish WHERE KoiID = @KoiID');

//       // Nếu không tìm thấy KoiFish với ID đã cung cấp, ném lỗi
//       if (koiResult.recordset.length === 0) {
//         console.error(`KoiFish with ID ${item.KoiID} not found.`);
//         throw new Error(`KoiFish with ID ${item.KoiID} not found.`);
//       }

//       // Lưu giá đơn vị của KoiFish vào unitPrice
//       unitPrice = koiResult.recordset[0].Price;
//     } 
//     // Kiểm tra nếu sản phẩm là Package
//     else if (item.PackageID) {
//       // Lấy giá của Package từ bảng KoiPackage dựa trên PackageID
//       const packageResult = await pool.request()
//         .input('PackageID', sql.Int, item.PackageID)
//         .query('SELECT Price FROM KoiPackage WHERE PackageID = @PackageID');

//       // Nếu không tìm thấy Package với ID đã cung cấp, ném lỗi
//       if (packageResult.recordset.length === 0) {
//         console.error(`KoiPackage with ID ${item.PackageID} not found.`);
//         throw new Error(`KoiPackage with ID ${item.PackageID} not found.`);
//       }

//       // Lưu giá đơn vị của Package vào unitPrice
//       unitPrice = packageResult.recordset[0].Price;
//     } else {
//       // Nếu không có cả Koi và Package
//       console.error(`Invalid item: Missing both KoiID and PackageID: `, item);
//       throw new Error(`Invalid item: Missing both KoiID and PackageID.`);
//     }

//     // Xác định số lượng của sản phẩm: KoiFish luôn có số lượng là 1
//     const quantity = item.KoiID ? 1 : item.quantity || 1;

//     // Tính tổng giá trị cho sản phẩm hiện tại (đơn giá * số lượng)
//     const itemTotal = unitPrice * quantity;

//     // Kiểm tra dữ liệu đầu ra: Tổng giá trị sản phẩm không được âm
//     if (itemTotal < 0) {
//       console.error(`Calculated item total is negative for item: ${JSON.stringify(item)}`);
//       throw new Error(`Item total cannot be negative.`);
//     }

//     // Cộng giá trị sản phẩm hiện tại vào tổng tiền
//     totalAmount += itemTotal;
//   }
  
//   // Kiểm tra tổng tiền: Không được phép âm
//   if (totalAmount < 0) {
//     console.error(`Calculated totalAmount is negative: ${totalAmount}`);
//     throw new Error(`Total amount cannot be negative.`);
//   }

//   // Trả về tổng số tiền của toàn bộ đơn hàng
//   console.log(`Total amount calculated: ${totalAmount}`);
//   return totalAmount;
// };

// Tạo đơn hàng mới
exports.createOrder = async (
  customerID,
  totalAmount,
  shippingAddress,
  paymentMethod,
  orderItems,
  discount,
  shippingCost,
  promotionID = null,
  trackingNumber,
) => {
  const pool = await connectDB();
  const transaction = new sql.Transaction(pool);

  try {
    console.log("Starting order creation..."); // Ghi log bắt đầu

    // Bắt đầu giao dịch
    await transaction.begin();

    // Tạo đơn hàng mới và lấy OrderID
    const orderResult = await transaction
      .request()
      .input('CustomerID', sql.Int, customerID)
      .input('TotalAmount', sql.Decimal(10, 2), totalAmount)
      .input('ShippingAddress', sql.NVarChar(sql.MAX), shippingAddress)
      .input('PaymentMethod', sql.VarChar(50), paymentMethod)
      .input('OrderDate', sql.DateTime, new Date()) // Lấy thời gian hiện tại cho OrderDate
      .input('TrackingNumber', sql.VarChar(255), trackingNumber)
      .input('Discount', sql.Decimal(10, 2), discount)
      .input('ShippingCost', sql.Decimal(10, 2), shippingCost)
      .input('PromotionID', sql.Int, promotionID)
      .query(`
        INSERT INTO Orders (
          CustomerID, TotalAmount, ShippingAddress, PaymentMethod, OrderDate, 
          OrderStatus, TrackingNumber, Discount, ShippingCost, PromotionID
        )
        OUTPUT INSERTED.OrderID
        VALUES (
          @CustomerID, @TotalAmount, @ShippingAddress, @PaymentMethod, @OrderDate,
          'Pending', @TrackingNumber, @Discount, @ShippingCost, @PromotionID
        )
      `);

    const orderId = orderResult.recordset[0].OrderID;
    

    // Insert into OrderDetails table
    // for (const item of orderItems) {
    //   const koiID = item.KoiID || null;  // Nếu không có KoiID thì là null
    //   const packageID = item.PackageID || null;  // Nếu không có PackageID thì là null

    //   // Xác định productType dựa trên KoiID và PackageID
    //   let productType = koiID && packageID ? "All" : koiID ? "Single Fish" : "Package";

    //   // console.log(`Processing item: ${JSON.stringify(item)}, Tracking Number: ${JSON.stringify(trackingNumber)}`); // Ghi log mục hàng

    //   // Kiểm tra tồn kho cho Koi hoặc Package
    //   await checkProductAvailability(koiID, packageID, item.quantity);

    //   // let unitPrice = 0;
    //   // if (koiID) {
    //   //   // Lấy giá từ bảng KoiFish nếu có KoiID
    //   //   const koiResult = await pool.request()
    //   //     .input('koiID', sql.Int, koiID)
    //   //     .query('SELECT Price FROM KoiFish WHERE KoiID = @koiID');

    //   //   if (koiResult.recordset.length === 0) {
    //   //     throw new Error(`KoiFish with ID ${koiID} not found.`);
    //   //   }
    //   //   unitPrice = koiResult.recordset[0].Price;
    //   // } else if (packageID) {
    //   //   // Lấy giá từ bảng KoiPackage nếu có PackageID
    //   //   const packageResult = await pool.request()
    //   //     .input('packageID', sql.Int, packageID)
    //   //     .query('SELECT Price FROM KoiPackage WHERE PackageID = @packageID');

    //   //   if (packageResult.recordset.length === 0) {
    //   //     throw new Error(`KoiPackage with ID ${packageID} not found.`);
    //   //   }
    //   //   unitPrice = packageResult.recordset[0].Price;
    //   // }

    //   const quantity = koiID ? 1 : item.quantity || 1; // Nếu là sản phẩm đơn lẻ (Koi Fish), quantity mặc định là 1
    //   // const totalPrice = unitPrice * quantity;  // Tính tổng giá

    //   // console.log(`Adding item to OrderDetails: ${JSON.stringify({
    //   //   orderId, koiID, packageID, quantity, unitPrice, totalPrice, productType
    //   // })}`); // Ghi log mục hàng chi tiết

    //   // Thêm sản phẩm vào bảng OrderDetails
    //   await transaction.request()
    //     .input('OrderID', sql.Int, orderId)
    //     .input('KoiID', sql.Int, koiID)
    //     .input('PackageID', sql.Int, packageID)
    //     .input('Quantity', sql.Int, quantity)
    //     .input('UnitPrice', sql.Decimal(10, 2), unitPrice)
    //     .input('ProductType', sql.VarChar(50), productType)
    //     .query(`
    //       INSERT INTO OrderDetails (OrderID, KoiID, PackageID, Quantity, UnitPrice, ProductType )
    //       VALUES (@OrderID, @KoiID, @PackageID, @Quantity, @UnitPrice, @ProductType)
    //     `);
    // }

    await transaction.commit(); //lưu giao dịch và kết thúc chuỗi

    console.log("Order committed successfully."); // Ghi log hoàn tất đơn hàng
    return { orderId, message: "Order created successfully." };
  } catch (error) {
    await transaction.rollback(); // Hủy giao dịch nếu có lỗi
    console.error("Error creating order:", error); // Ghi log lỗi chi tiết
    throw new Error("Error creating order.");
  }
};

// Thêm chi tiết đơn hàng vào OrderDetails
exports.addOrderDetail = async ({ orderId, koiID, packageID, quantity, productType, unitPrice }) => {
  const pool = await connectDB();
  try {
    await pool.request()
      .input("OrderID", sql.Int, orderId)
      .input("KoiID", sql.Int, koiID)
      .input("PackageID", sql.Int, packageID)
      .input("Quantity", sql.Int, quantity)
      .input("UnitPrice", sql.Decimal(10, 2), unitPrice)
      .input("ProductType", sql.VarChar(50), productType)
      .query(`
        INSERT INTO OrderDetails (OrderID, KoiID, PackageID, Quantity, UnitPrice, ProductType)
        VALUES (@OrderID, @KoiID, @PackageID, @Quantity, @UnitPrice, @ProductType)
      `);
  } catch (error) {
    console.error("Error adding order detail:", error);
    throw new Error("Error adding order detail.");
  }
};

// Kiểm tra tồn kho cho Koi Fish hoặc Koi Package 
exports.checkProductAvailability = async (koiID, packageID, quantity) => {
  const pool = await connectDB();

  try {

    if (!koiID && !packageID) {
      // Nếu cả KoiID và PackageID đều thiếu, trả về lỗi
      return { status: 400, message: "Bắt buộc phải cung cấp ít nhất KoiID hoặc PackageID." };
    }
    
    if (koiID) {
      // Kiểm tra xem Koi với KoiID có còn tồn tại không (vì mỗi cá chỉ có 1)
      const koiResult = await pool.request()
        .input('koiID', sql.Int, koiID)
        .query('SELECT Availability FROM KoiFish WHERE KoiID = @koiID');

      if (koiResult.recordset[0].Count === 0) {
        return  { status: 404, message: `Koi Fish với ID ${koiID} không tồn tại.` };
      }

      if (koiResult.recordset[0].Availability === 'Sold Out') {
        return { status: 400, message: `Koi Fish với ID ${koiID} đã được bán hết.` };
      }
    } else if (packageID) {
      // Kiểm tra số lượng tồn kho cho Package
      const packageResult = await pool.request()
        .input('packageID', sql.Int, packageID)
        .query('SELECT Quantity, Availability FROM KoiPackage WHERE PackageID = @packageID');

        if (packageResult.recordset.length === 0) {
          // Nếu gói hàng không tồn tại, trả về lỗi 404
          return  { status: 404, message: `Package với ID ${packageID} không tồn tại.` };
        }

        if (packageResult.recordset[0].Availability === 'Sold Out') {
          return { status: 400, message: `Gói hàng với ID ${packageID} đã được bán hết.` };
        }
    
        if (packageResult.recordset[0].Quantity < quantity) {
          // Nếu số lượng tồn kho không đủ, trả về lỗi 400
          return  { status: 400, message: `Không đủ số lượng tồn kho cho Package với ID ${packageID}.` };
        }
    }
    
    return { status: 200, message: "Sản phẩm hợp lệ." };
  } catch (error) {
    console.error("Lỗi kiểm tra tồn kho:", error);
    return { status: 500, message: "Lỗi khi kiểm tra tồn kho." };
  }
};

// Lấy tất cả đơn hàng của khách hàng
exports.getOrdersByCustomerId = async (customerID) => {
  try {
    const result =
      await sql.query`
        SELECT 
          o.OrderID,
          o.CustomerID,
          u.UserID,
          u.Username,
          u.Role,
          o.OrderDate,
          o.TotalAmount,
          o.ShippingAddress,
          o.OrderStatus,
          o.PaymentMethod,
          o.PaymentStatus,
          o.TrackingNumber,
          o.Discount,
          o.ShippingCost,
          o.PromotionID,
          
          c.FullName,
          c.Email,
          c.PhoneNumber,
          c.Address,
          c.LoyaltyPoints,
      
          -- Thông tin từ OrderDetails
          od.OrderDetailID,
          od.ProductID,
          od.KoiID,
          od.PackageID,
          od.Quantity,
          od.UnitPrice,
          od.TotalPrice,
          od.ProductType,
          od.CertificateStatus,
      
          -- Thông tin chi tiết về KoiFish
          kf.KoiID AS KoiID_Details,
          kf.Name AS KoiName,
          kf.VarietyID,
          kf.Origin,
          kf.Gender,
          kf.Born,
          kf.Size,
          kf.Weight,
          kf.Personality,
          kf.FeedingAmountPerDay,
          kf.HealthStatus,
          kf.ScreeningRate,
          kf.Price AS KoiPrice,
          kf.CertificateLink AS KoiCertificateLink,
          kf.ImagesLink AS KoiImagesLink,
          kf.AddedDate,
          kf.Availability AS KoiAvailability,
      
          -- Thông tin chi tiết về KoiPackage
          kp.PackageID AS PackageID_Details,
          kp.PackageName,
          kp.ImageLink AS PackageImageLink,
          kp.Price AS PackagePrice,
          kp.PackageSize,
          kp.CreatedDate AS PackageCreatedDate,
          kp.Availability AS PackageAvailability,
          kp.Quantity AS PackageQuantity,
      
          -- Thông tin chi tiết về KoiConsignment (nếu có)
          kc.ConsignmentID,
          kc.ConsignmentType,
          kc.ConsignmentMode,
          kc.StartDate,
          kc.EndDate,
          kc.Status AS ConsignmentStatus,
          kc.PriceAgreed,
          kc.PickupDate,
          kc.ApprovedStatus,
          kc.InspectionResult,
          kc.Notes,
          kc.KoiType,
          kc.KoiColor,
          kc.KoiAge,
          kc.KoiSize,
          kc.ImagePath
      
        FROM 
            Orders o
        LEFT JOIN 
            OrderDetails od ON o.OrderID = od.OrderID
        LEFT JOIN 
            KoiFish kf ON od.KoiID = kf.KoiID
        LEFT JOIN 
            KoiPackage kp ON od.PackageID = kp.PackageID
        LEFT JOIN 
            KoiConsignment kc ON kc.CustomerID = o.CustomerID AND kc.KoiID = kf.KoiID
        LEFT JOIN 
            Customers c ON o.CustomerID = c.CustomerID
        LEFT JOIN 
            Users u ON o.UserID = u.UserID
        
        WHERE 
            o.CustomerID = ${customerID}
        
        ORDER BY 
            o.OrderID;
    `;
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
      await sql.query`
        SELECT
          o.OrderID,
          o.CustomerID,
          u.UserID,
          u.Username,
          u.Role,
          o.OrderDate,
          o.TotalAmount,
          o.ShippingAddress,
          o.OrderStatus,
          o.PaymentMethod,
          o.PaymentStatus,
          o.TrackingNumber,
          o.Discount,
          o.ShippingCost,
          o.PromotionID,
          
          c.FullName,
          c.Email,
          c.PhoneNumber,
          c.Address,
          c.LoyaltyPoints,

          -- Thông tin từ OrderDetails
          STRING_AGG(CAST(od.ProductID AS VARCHAR), ', ') AS ProductIDs,
          STRING_AGG(CAST(od.KoiID AS VARCHAR), ', ') AS KoiIDs,
          STRING_AGG(CAST(od.PackageID AS VARCHAR), ', ') AS PackageIDs,
          STRING_AGG(od.ProductType, ', ') AS ProductTypes,
          STRING_AGG(od.CertificateStatus, ', ') AS CertificateStatuses,
          SUM(od.Quantity) AS TotalQuantity,
          SUM(od.TotalPrice) AS TotalOrderDetailPrice, -- Tổng giá từ OrderDetails

          -- Thông tin từ KoiFish
          STRING_AGG(kf.Name, ', ') AS KoiNames,
          STRING_AGG(CAST(kf.VarietyID AS VARCHAR), ', ') AS VarietyIDs,
          STRING_AGG(kf.Origin, ', ') AS Origins,
          STRING_AGG(kf.Gender, ', ') AS Genders,
          STRING_AGG(CAST(kf.Size AS VARCHAR), ', ') AS KoiSizes,
          STRING_AGG(CAST(kf.Weight AS VARCHAR), ', ') AS KoiWeights,
          STRING_AGG(kf.HealthStatus, ', ') AS KoiHealthStatuses,
          STRING_AGG(CAST(kf.Price AS VARCHAR), ', ') AS KoiPrices,

          -- Thông tin từ KoiPackage
          STRING_AGG(kp.PackageName, ', ') AS PackageNames,
          STRING_AGG(CAST(kp.PackageSize AS VARCHAR), ', ') AS PackageSizes,
          STRING_AGG(CAST(kp.Price AS VARCHAR), ', ') AS PackagePrices,
          STRING_AGG(CAST(kp.Quantity AS VARCHAR), ', ') AS PackageQuantities,
          STRING_AGG(kp.Availability, ', ') AS PackageAvailabilities,

          -- Thông tin chi tiết về KoiConsignment
          STRING_AGG(CAST(kc.ConsignmentID AS VARCHAR), ', ') AS ConsignmentIDList,
          STRING_AGG(CAST(kc.CustomerID AS VARCHAR), ', ') AS ConsignmentCustomerIDs,
          STRING_AGG(CAST(kc.KoiID AS VARCHAR), ', ') AS ConsignmentKoiIDs,
          STRING_AGG(kc.ConsignmentType, ', ') AS ConsignmentTypes,
          STRING_AGG(kc.ConsignmentMode, ', ') AS ConsignmentModes,
          STRING_AGG(CAST(kc.PriceAgreed AS VARCHAR), ', ') AS ConsignmentPriceAgreeds,
          STRING_AGG(kc.Status, ', ') AS ConsignmentStatuses,
          STRING_AGG(kc.ApprovedStatus, ', ') AS ConsignmentApprovedStatuses,
          STRING_AGG(kc.Notes, ', ') AS ConsignmentNotes
      FROM 
          Orders o
      LEFT JOIN 
          OrderDetails od ON o.OrderID = od.OrderID
      LEFT JOIN 
          KoiFish kf ON od.KoiID = kf.KoiID
      LEFT JOIN 
          KoiPackage kp ON od.PackageID = kp.PackageID
      LEFT JOIN 
          KoiConsignment kc ON kc.CustomerID = o.CustomerID AND kc.KoiID = kf.KoiID
      LEFT JOIN 
          Customers c ON o.CustomerID = c.CustomerID
      LEFT JOIN 
          Users u ON o.UserID = u.UserID -- Thay đổi vị trí join để lấy chính xác UserID từ Orders

      GROUP BY  
          o.OrderID, 
          o.CustomerID, 
          u.UserID, 
          u.Username, 
          u.Role, 
          o.OrderDate, 
          o.TotalAmount, 
          o.ShippingAddress, 
          o.OrderStatus, 
          o.PaymentMethod, 
          o.PaymentStatus, 
          o.TrackingNumber, 
          o.Discount, 
          o.ShippingCost, 
          o.PromotionID, 
          c.FullName, 
          c.Email, 
          c.PhoneNumber, 
          c.Address, 
          c.LoyaltyPoints

      ORDER BY 
          o.OrderID;
      `;
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
      await sql.query`
      SELECT 
        o.OrderID,
        o.CustomerID,
        u.UserID,
        u.Username,
        u.Role,
        o.OrderDate,
        o.TotalAmount,
        o.ShippingAddress,
        o.OrderStatus,
        o.PaymentMethod,
        o.PaymentStatus,
        o.TrackingNumber,
        o.Discount,
        o.ShippingCost,
        o.PromotionID,
        
        c.FullName,
        c.Email,
        c.PhoneNumber,
        c.Address,
        c.LoyaltyPoints,

        -- Thông tin từ OrderDetails
        od.OrderDetailID,
        od.ProductID,
        od.KoiID,
        od.PackageID,
        od.Quantity,
        od.UnitPrice,
        od.TotalPrice,
        od.ProductType,
        od.CertificateStatus,

        -- Thông tin chi tiết về KoiFish
        kf.KoiID AS KoiID_Details,
        kf.Name AS KoiName,
        kf.VarietyID,
        kf.Origin,
        kf.Gender,
        kf.Born,
        kf.Size,
        kf.Weight,
        kf.Personality,
        kf.FeedingAmountPerDay,
        kf.HealthStatus,
        kf.ScreeningRate,
        kf.Price AS KoiPrice,
        kf.CertificateLink AS KoiCertificateLink,
        kf.ImagesLink AS KoiImagesLink,
        kf.AddedDate,
        kf.Availability AS KoiAvailability,

        -- Thông tin chi tiết về KoiPackage
        kp.PackageID AS PackageID_Details,
        kp.PackageName,
        kp.ImageLink AS PackageImageLink,
        kp.Price AS PackagePrice,
        kp.PackageSize,
        kp.CreatedDate AS PackageCreatedDate,
        kp.Availability AS PackageAvailability,
        kp.Quantity AS PackageQuantity,

        -- Thông tin chi tiết về KoiConsignment (nếu có)
        kc.ConsignmentID,
        kc.ConsignmentType,
        kc.ConsignmentMode,
        kc.StartDate,
        kc.EndDate,
        kc.Status AS ConsignmentStatus,
        kc.PriceAgreed,
        kc.PickupDate,
        kc.ApprovedStatus,
        kc.InspectionResult,
        kc.Notes,
        kc.KoiType,
        kc.KoiColor,
        kc.KoiAge,
        kc.KoiSize,
        kc.ImagePath

      FROM 
          Orders o
      LEFT JOIN 
          OrderDetails od ON o.OrderID = od.OrderID
      LEFT JOIN 
          KoiFish kf ON od.KoiID = kf.KoiID
      LEFT JOIN 
          KoiPackage kp ON od.PackageID = kp.PackageID
      LEFT JOIN 
          KoiConsignment kc ON kc.CustomerID = o.CustomerID AND kc.KoiID = kf.KoiID
      LEFT JOIN 
          Customers c ON o.CustomerID = c.CustomerID
      LEFT JOIN 
          Users u ON o.UserID = u.UserID

      WHERE 
          o.OrderID = ${orderId}

      ORDER BY 
          o.OrderID; 
      `;
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

// Hàm lấy tất cả đơn hàng của Staff từ database
exports.getAllStaffOrdersByUserIdData = async (userId) => {
  try {
    const pool = await connectDB();

    const result = await pool.request()
      .input("userId", sql.Int, userId) // Đặt giá trị userId vào truy vấn
      .query(`
        SELECT o.* 
        FROM Orders o
        JOIN Users u ON o.userId = u.userId
        WHERE u.userId = @userId AND u.Role = 'Staff'
        `);

    if (result.recordset.length === 0) {
      return null; // Không tìm thấy đơn hàng nào
    }

    return result.recordset; // Trả về danh sách đơn hàng của Staff
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw new Error("Error fetching orders by user ID");
  }
};