const sql = require('mssql');

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

        // Now proceed with the original insertion, using the fetched CustomerID
        const result = await pool.request()
            .input('CustomerID', sql.Int, customerId)
            .input('KoiID', sql.Int, req.body.koiId)
            .input('ConsignmentType', sql.VarChar(50), req.body.consignmentType)
            .input('ConsignmentMode', sql.VarChar(50), req.body.consignmentMode)
            .input('Status', sql.VarChar(50), req.body.status || 'Pending')
            .input('PriceAgreed', sql.Decimal(10, 2), req.body.priceAgreed)
            .input('ApprovedStatus', sql.VarChar(50), req.body.approvedStatus || 'Rejected')
            .input('Notes', sql.VarChar(sql.MAX), req.body.notes)
            .input('KoiType', sql.NVarChar(100), req.body.koiType)
            .input('KoiColor', sql.NVarChar(100), req.body.koiColor)
            .input('KoiAge', sql.NVarChar(50), req.body.koiAge)
            .input('KoiSize', sql.NVarChar(50), req.body.koiSize)
            .input('ImagePath', sql.NVarChar(255), req.body.imagePath)
            .query(`
                INSERT INTO KoiConsignment (CustomerID, KoiID, ConsignmentType, ConsignmentMode, Status, PriceAgreed, ApprovedStatus, Notes, KoiType, KoiColor, KoiAge, KoiSize, ImagePath)
                VALUES (@CustomerID, @KoiID, @ConsignmentType, @ConsignmentMode, @Status, @PriceAgreed, @ApprovedStatus, @Notes, @KoiType, @KoiColor, @KoiAge, @KoiSize, @ImagePath);
            `);
        return result;
    } catch (err) {
        console.error('Error creating Koi Consignment:', err);
        throw err;
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

module.exports = {
    createKoiConsignment,
    getAllKoiConsignments,
};
