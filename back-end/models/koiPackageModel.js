const sql = require('mssql');

// Function to get all koi packages
const getAllKoiPackages = async () => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM KoiPackage');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching KoiPackages:', err);
        throw err;
    }
};

// Function to get a koi package by ID
const getKoiPackageById = async (packageId) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('PackageID', sql.Int, packageId)
            .query('SELECT * FROM KoiPackage WHERE PackageID = @PackageID');
        return result.recordset[0];
    } catch (err) {
        console.error('Error fetching KoiPackage:', err);
        throw err;
    }
};

// Function to create a new koi package
const createKoiPackage = async (packageData) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('KoiID', sql.Int, packageData.KoiID)
            .input('PackageName', sql.VarChar(255), packageData.PackageName)
            .input('ImageLink', sql.VarChar(255), packageData.ImageLink)
            .input('Price', sql.Decimal(10, 2), packageData.Price)
            .input('PackageSize', sql.Int, packageData.PackageSize)
            .input('Availability', sql.VarChar(50), packageData.Availability)
            .query(`
                INSERT INTO KoiPackage (KoiID, PackageName, ImageLink, Price, PackageSize, Availability)
                VALUES (@KoiID, @PackageName, @ImageLink, @Price, @PackageSize, @Availability);
                SELECT SCOPE_IDENTITY() AS PackageID;
            `);
        return result.recordset[0];
    } catch (err) {
        console.error('Error creating KoiPackage:', err);
        throw err;
    }
};

// Function to update a koi package
const updateKoiPackage = async (packageId, packageData) => {
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('PackageID', sql.Int, packageId)
            .input('KoiID', sql.Int, packageData.KoiID)
            .input('PackageName', sql.VarChar(255), packageData.PackageName)
            .input('ImageLink', sql.VarChar(255), packageData.ImageLink)
            .input('Price', sql.Decimal(10, 2), packageData.Price)
            .input('PackageSize', sql.Int, packageData.PackageSize)
            .input('Availability', sql.VarChar(50), packageData.Availability)
            .query(`
                UPDATE KoiPackage
                SET KoiID = @KoiID, PackageName = @PackageName, ImageLink = @ImageLink,
                    Price = @Price, PackageSize = @PackageSize, Availability = @Availability
                WHERE PackageID = @PackageID
            `);
        return { PackageID: packageId, ...packageData };
    } catch (err) {
        console.error('Error updating KoiPackage:', err);
        throw err;
    }
};

// Function to delete a koi package
const deleteKoiPackage = async (packageId) => {
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('PackageID', sql.Int, packageId)
            .query('DELETE FROM KoiPackage WHERE PackageID = @PackageID');
        return { message: 'Koi package deleted successfully' };
    } catch (err) {
        console.error('Error deleting KoiPackage:', err);
        throw err;
    }
};

module.exports = {
    getAllKoiPackages,
    getKoiPackageById,
    createKoiPackage,
    updateKoiPackage,
    deleteKoiPackage
};