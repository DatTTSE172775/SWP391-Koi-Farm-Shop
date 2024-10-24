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

const deleteKoiPackage = async (packageId) => {
  try {
    const pool = await sql.connect();

    // Xóa các bản ghi liên quan trong bảng KoiPackageVarieties
    await pool.request().input("PackageID", sql.Int, packageId).query(`
            DELETE FROM KoiPackageVarieties
            WHERE PackageID IN (SELECT PackageID FROM KoiPackage WHERE PackageID = @PackageID)
        `);

    // Xóa các bản ghi liên quan trong bảng KoiPackageBreeders
    await pool.request().input("PackageID", sql.Int, packageId).query(`
                DELETE FROM KoiPackageBreeders
                WHERE PackageID IN (SELECT PackageID FROM KoiPackage WHERE PackageID = @PackageID)
            `);

    // Xóa KoiFish
    const result = await pool.request().input("PackageID", sql.Int, packageId)
      .query(`
                DELETE FROM KoiPackage
                WHERE PackageID = @PackageID
            `);

    return result.rowsAffected[0] > 0; // Trả về true nếu xóa thành công
  } catch (err) {
    console.error("Lỗi xóa KoiPackage:", err);
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
};
