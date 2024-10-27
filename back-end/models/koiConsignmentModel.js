const sql = require('mssql');
const path = require('path');

const createKoiConsignment = async (req) => {
    try {
        console.log('Request object:', req);
        console.log('User object:', req.user);

        const pool = await sql.connect();

        // Get the userId from the authenticated user's token
        const userId = req.user?.userId;  // Use optional chaining

        if (!userId) {
            throw new Error('User ID not found in the request. Make sure you are authenticated.');
        }

        // First, get the CustomerID based on the UserID
        const customerResult = await pool.request()
            .input('UserID', sql.Int, userId)
            .query(`
                SELECT CustomerID
                FROM Customers
                WHERE UserID = @UserID
            `);

        if (customerResult.recordset.length === 0) {
            throw new Error('Customer not found for the logged-in user');
        }

        const customerId = customerResult.recordset[0].CustomerID;

        // Handle image upload
        let imagePath = null;
        if (req.file) {
            imagePath = '/uploads/' + path.basename(req.file.path);
        }

        // Now proceed with the original insertion, using the fetched CustomerID
        const result = await pool.request()
            .input('CustomerID', sql.Int, customerId)
            .input('ConsignmentType', sql.VarChar(50), req.body.consignmentType)
            .input('ConsignmentMode', sql.VarChar(50), req.body.consignmentMode)
            .input('Status', sql.VarChar(50), req.body.status || 'Pending')
            .input('PriceAgreed', sql.Decimal(10, 2), req.body.priceAgreed)
            .input('ApprovedStatus', sql.VarChar(50), req.body.approvedStatus || 'Pending')
            .input('Notes', sql.VarChar(sql.MAX), req.body.notes)
            .input('KoiType', sql.NVarChar(100), req.body.koiType)
            .input('KoiColor', sql.NVarChar(100), req.body.koiColor)
            .input('KoiAge', sql.NVarChar(50), req.body.koiAge)
            .input('KoiSize', sql.NVarChar(50), req.body.koiSize)
            .input('ImagePath', sql.NVarChar(255), imagePath)
            .query(`
                INSERT INTO KoiConsignment (CustomerID, ConsignmentType, ConsignmentMode, Status, PriceAgreed, ApprovedStatus, Notes, KoiType, KoiColor, KoiAge, KoiSize, ImagePath)
                VALUES (@CustomerID, @ConsignmentType, @ConsignmentMode, @Status, @PriceAgreed, @ApprovedStatus, @Notes, @KoiType, @KoiColor, @KoiAge, @KoiSize, @ImagePath);
            `);
        return result;
    } catch (err) {
        console.error('Error creating Koi Consignment:', err);
        throw new Error(err.message || 'Error creating Koi Consignment');
    }
};

const getAllKoiConsignments = async () => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM KoiConsignment');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching Koi Consignments:', err);
        throw err;
    }
};

const getConsignmentsById = async (id) => {
  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('ConsignmentID', sql.Int, id)
      .query('SELECT * FROM KoiConsignment WHERE ConsignmentID = @ConsignmentID');

    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching consignment by ID:", error);
    throw error;
  }
};

const updateConsignmentStatus = async (consignmentID, status) => {
  try {
    // Check if the status is valid
    const validStatuses = ['Pending', 'Approved', 'Rejected']; // Update this based on your actual constraint
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const pool = await sql.connect();
    const result = await pool.request()
      .input('ID', sql.Int, consignmentID)
      .input('Status', sql.VarChar(50), status)
      .query('UPDATE KoiConsignment SET ApprovedStatus = @Status WHERE ConsignmentID = @ID');
    
    if (result.rowsAffected[0] > 0) {
      return { success: true, data: { consignmentID, status } };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error updating consignment status:', error);
    throw error;
  }
};

const isUserStaff = async (userId) => {
  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .query`
        SELECT Role FROM Users WHERE UserID = @userId
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

const assignConsignmentToStaff = async (consignmentId, userId) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('consignmentId', sql.Int, consignmentId)
            .input('userId', sql.Int, userId)
            .query(`
                UPDATE KoiConsignment
                SET UserID = @userId
                WHERE ConsignmentID = @consignmentId
            `);

        if (result.rowsAffected[0] === 0) {
            return null; // No consignment was updated
        }

        // Fetch the updated consignment
        const updatedConsignment = await getConsignmentsById(consignmentId);
        return updatedConsignment;
    } catch (error) {
        console.error("Error assigning consignment to staff:", error);
        throw new Error("Error assigning consignment to staff");
    }
  };

  const getAllStaffConsignmentsByUserId = async (userId) => {
    try {  
      const pool = await sql.connect();
  
      const result = await pool.request().input("userId", sql.Int, userId)
        .query(`
          SELECT kc.* 
          FROM KoiConsignment kc
          JOIN Users u ON kc.UserID = u.userId
          WHERE u.userId = @userId AND u.Role = 'Staff'
        `);
  
      if (result.recordset.length === 0) {
        return { message: "No consignments found for the given user ID" };
      }
  
      return result.recordset;
    } catch (error) {
      console.error("Error fetching consignments by user ID:", error);
      throw new Error("Error fetching consignments by user ID");
    }
  };

  const getPendingConsignmentsByUserId = async (userId) => {
    try {
      const pool = await sql.connect();
      const result = await pool.request().input("userId", sql.Int, userId)
        .query(`SELECT * FROM KoiConsignment WHERE UserID = @userId AND ApprovedStatus = 'Pending'`);
      return result.recordset;
    } catch (error) {
      console.error("Error fetching pending consignments by user ID:", error);
      throw new Error("Error fetching pending consignments by user ID");
    }
  }

  const getApprovedConsignmentsByUserId = async (userId) => {
    try {
      const pool = await sql.connect();
      const result = await pool.request().input("userId", sql.Int, userId)
        .query(`SELECT * FROM KoiConsignment WHERE UserID = @userId AND ApprovedStatus = 'Approved'`);
      return result.recordset;
    } catch (error) {
      console.error("Error fetching approved consignments by user ID:", error);
      throw new Error("Error fetching approved consignments by user ID");
    }
  }

module.exports = {
    createKoiConsignment,
    getAllKoiConsignments,
    getConsignmentsById,
    updateConsignmentStatus,
    assignConsignmentToStaff,
    getAllStaffConsignmentsByUserId,
    getPendingConsignmentsByUserId,
    getApprovedConsignmentsByUserId,
    isUserStaff
};
