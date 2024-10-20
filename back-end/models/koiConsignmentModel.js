const sql = require('mssql');

const createKoiConsignment = async (consignmentData) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('CustomerID', sql.Int, consignmentData.customerId)
            .input('KoiID', sql.Int, consignmentData.koiId)
            .input('ConsignmentType', sql.VarChar(50), consignmentData.consignmentType)
            .input('ConsignmentMode', sql.VarChar(50), consignmentData.consignmentMode)
            .input('Status', sql.VarChar(50), consignmentData.status || 'Pending')
            .input('PriceAgreed', sql.Decimal(10, 2), consignmentData.priceAgreed)
            .input('ApprovedStatus', sql.VarChar(50), consignmentData.approvedStatus || 'Rejected')
            .input('Notes', sql.VarChar(sql.MAX), consignmentData.notes)
            .input('KoiType', sql.NVarChar(100), consignmentData.koiType)
            .input('KoiColor', sql.NVarChar(100), consignmentData.koiColor)
            .input('KoiAge', sql.NVarChar(50), consignmentData.koiAge)
            .input('KoiSize', sql.NVarChar(50), consignmentData.koiSize)
            .input('ImagePath', sql.NVarChar(255), consignmentData.imagePath)
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
