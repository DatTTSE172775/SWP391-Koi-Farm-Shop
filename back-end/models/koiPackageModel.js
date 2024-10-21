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

// Function to get a Koi Package by ID
const getKoiPackageById = async (packageId) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('PackageID', sql.Int, packageId)
            .query('SELECT * FROM KoiPackage WHERE PackageID = @PackageID');
        if (result.recordset.length === 0) {
            return null; // Package not found
        }
        return result.recordset[0];
    } catch (err) {
        console.error('Error fetching Koi Package by ID:', err);
        throw err;
    }
};

// Function to update the availability of a Koi Package
const updateKoiPackageAvailability = async (packageId, availability) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('PackageID', sql.Int, packageId)
            .input('Availability', sql.VarChar(50), availability)
            .query(`
                UPDATE KoiPackage
                SET Availability = @Availability
                WHERE PackageID = @PackageID
            `);
        return result.rowsAffected[0] > 0; // Return true if the update was successful
    } catch (err) {
        console.error('Error updating Koi Package availability:', err);
        throw err;
    }
};

// Function to delete a Koi Package
const deleteKoiPackage = async (packageId) => {
    try {
        const pool = await sql.connect();
        
        // Delete related records in KoiPackageVarieties
        await pool.request()
            .input('PackageID', sql.Int, packageId)
            .query(`
                DELETE FROM KoiPackageVarieties
                WHERE PackageID = @PackageID
            `);

        // Delete related records in KoiPackageBreeders
        await pool.request()
            .input('PackageID', sql.Int, packageId)
            .query(`
                DELETE FROM KoiPackageBreeders
                WHERE PackageID = @PackageID
            `);

        // Delete Koi Package
        const result = await pool.request()
            .input('PackageID', sql.Int, packageId)
            .query(`
                DELETE FROM KoiPackage
                WHERE PackageID = @PackageID
            `);

        return result.rowsAffected[0] > 0; // Return true if the delete was successful
    } catch (err) {
        console.error('Error deleting Koi Package:', err);
        throw err;
    }
};


module.exports = {
    createKoiPackage,
    getAllKoiPackages,
    getKoiPackageById,
    updateKoiPackageAvailability,
    deleteKoiPackage,
};
