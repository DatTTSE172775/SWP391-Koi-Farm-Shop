const { sql } = require('../config/db');

// Tạo yêu cầu ký gửi mới
exports.createConsignment = async (customerID, consignmentType, consignmentMode, priceAgreed, notes, koiType, koiColor, koiAge, koiSize, imagePath) => {
  try {
    const result = await sql.query`
      INSERT INTO KoiConsignment (
        CustomerID, ConsignmentType, ConsignmentMode, 
        PriceAgreed, Notes, KoiType, KoiColor, KoiAge, KoiSize, 
        ImagePath, Status, ApprovedStatus
      )
      VALUES (
        ${customerID}, ${consignmentType}, 'Online', 
        ${priceAgreed}, ${notes}, ${koiType}, ${koiColor}, ${koiAge}, ${koiSize}, 
        ${imagePath}, 'Pending', 'Pending'
      );
      SELECT SCOPE_IDENTITY() AS ConsignmentID;
    `;
    
    return result.recordset[0].ConsignmentID;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error(`Error creating consignment: ${error.message}`);
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

// Get all consignments
exports.findAll = async () => {
  try {
    const result = await sql.query`SELECT * FROM KoiConsignment`;
    return result.recordset;
  } catch (error) {
    throw new Error('Error fetching all consignments');
  }
};

// Get consignment by ID
exports.findByPk = async (consignmentID) => {
  try {
    const result = await sql.query`SELECT * FROM KoiConsignment WHERE ConsignmentID = ${consignmentID}`;
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error fetching consignment by ID');
  }
};
