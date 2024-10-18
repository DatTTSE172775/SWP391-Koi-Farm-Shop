const sql = require('mssql');

const createKoiPackage = async (packageData) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('KoiID', sql.Int, packageData.koiId)
            .input('PackageName', sql.VarChar(255), packageData.packageName)
            .input('ImageLink', sql.VarChar(255), packageData.imageLink)
            .input('Price', sql.Decimal(10, 2), packageData.price)
            .input('PackageSize', sql.Int, packageData.packageSize)
            .input('Availability', sql.VarChar(50), packageData.availability)
            .query(`
                INSERT INTO KoiPackage (KoiID, PackageName, ImageLink, Price, PackageSize, Availability)
                VALUES (@KoiID, @PackageName, @ImageLink, @Price, @PackageSize, @Availability);
            `);
        return result;
    } catch (err) {
        console.error('Error creating Koi Package:', err);
        throw err;
    }
};

const getAllKoiPackages = async () => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM KoiPackage');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching Koi Packages:', err);
        throw err;
    }
};

module.exports = {
    createKoiPackage,
    getAllKoiPackages,
};
