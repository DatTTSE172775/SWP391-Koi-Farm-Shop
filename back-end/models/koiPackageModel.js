const sql = require("mssql");

const createKoiPackage = async (packageData) => {
  try {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input("KoiID", sql.Int, packageData.KoiID)
      .input("PackageName", sql.NVarChar(255), packageData.PackageName)
      .input("ImageLink", sql.NVarChar(255), packageData.ImageLink)
      .input("Price", sql.Decimal(10, 2), packageData.Price)
      .input("PackageSize", sql.Int, packageData.PackageSize)
      .input("Availability", sql.NVarChar(50), packageData.Availability).query(`
                INSERT INTO KoiPackage (KoiID, PackageName, ImageLink, Price, PackageSize, Availability)
                OUTPUT INSERTED.PackageID
                VALUES (@KoiID, @PackageName, @ImageLink, @Price, @PackageSize, @Availability);
            `);
    return result.recordset[0];
  } catch (err) {
    console.error("Error creating Koi Package:", err);
    throw err;
  }
};

// Function to delete a Koi Package
const getAllKoiPackages = async () => {
  try {
    const pool = await sql.connect();
    const result = await pool.request().query("SELECT * FROM KoiPackage");
    return result.recordset;
  } catch (err) {
    console.error("Error fetching Koi Packages:", err);
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


const getKoiPackageById = async (packageId) => {
  try {
    const pool = await sql.connect();
    const result = await pool.request()
    .input("PackageID", sql.Int, packageId)
    .query("SELECT * FROM KoiPackage WHERE PackageID = @PackageID");
    return result.recordset[0];
  } catch (err) {
    console.error("Error fetching Koi Package:", err);
    throw err;
  }
};

module.exports = {
  createKoiPackage,
  getAllKoiPackages,
  deleteKoiPackage,
  getKoiPackageById,
  updateKoiPackageAvailability,
};
