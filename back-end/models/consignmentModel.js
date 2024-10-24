const { sql } = require('../config/db');

// Tạo yêu cầu ký gửi mới
exports.createConsignment = async (customerID, koiID, consignmentType, consignmentMode, priceAgreed, notes, koiType, koiColor, koiAge, koiSize, imagePath) => {
  try {
    const result = await sql.query`
      INSERT INTO KoiConsignment (
        CustomerID, KoiID, ConsignmentType, ConsignmentMode, 
        PriceAgreed, Notes, KoiType, KoiColor, KoiAge, KoiSize, 
        ImagePath, Status, ApprovedStatus
      )
      VALUES (
        ${customerID}, ${koiID}, ${consignmentType}, 'Online', 
        ${priceAgreed}, ${notes}, ${koiType}, ${koiColor}, ${koiAge}, ${koiSize}, 
        ${imagePath}, 'Pending', 'Rejected'
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
    const pool = await sql.connect();
    await pool.request()
      .input('ID', sql.Int, id)
      .input('Status', sql.VarChar(50), status)
      .query('UPDATE Consignments SET Status = @Status WHERE ID = @ID');
  } catch (error) {
    console.error('Error updating consignment status:', err);
    throw err;
  }
};


// Get all consignments
exports.getAllConsignments = async () => {
  try {
    const result = await sql.query`SELECT * FROM KoiConsignment`;
    return result.recordset;
  } catch (error) {
    throw new Error('Error fetching all consignments');
  }
};

// Get consignment by ID
exports.getConsignmentsById = async (id) => {
  try {
    const pool = await sql.connect(); // Kết nối SQL Server
    const result = await pool.request()
      .input('ID', sql.Int, id)
      .query('SELECT * FROM KoiConsignment WHERE ConsignmentID = @ID'); // Query SQL

    if (result.recordset.length === 0) {
      return null; // Không tìm thấy consignment
    }
    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching consignment by ID:", error);
    throw error;
  }
};
