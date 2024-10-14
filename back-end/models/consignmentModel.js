const { sql } = require('../config/db');

// Tạo yêu cầu ký gửi mới
exports.createConsignment = async (customerID, koiID, consignmentType, consignmentMode, priceAgreed) => {
  try {
    await sql.query`INSERT INTO KoiConsignment (CustomerID, KoiID, ConsignmentType, ConsignmentMode, PriceAgreed, Status, StartDate)
                    VALUES (${customerID}, ${koiID}, ${consignmentType}, ${consignmentMode}, ${priceAgreed}, 'Pending', GETDATE())`;
  } catch (error) {
    throw new Error('Error creating consignment');
  }
};

// Cập nhật trạng thái ký gửi
exports.updateConsignmentStatus = async (consignmentID, status) => {
  try {
    await sql.query`UPDATE KoiConsignment SET Status = ${status} WHERE ConsignmentID = ${consignmentID}`;
  } catch (error) {
    throw new Error('Error updating consignment status');
  }
};

// Lấy thông tin ký gửi theo ID
exports.getConsignmentById = async (consignmentID) => {
  try {
    const result = await sql.query`SELECT * FROM KoiConsignment WHERE ConsignmentID = ${consignmentID}`;
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error fetching consignment by ID');
  }
};
