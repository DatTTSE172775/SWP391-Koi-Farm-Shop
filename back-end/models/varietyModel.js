const sql = require("mssql");

const createVariety = async (varietyData) => {
  try {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input("VarietyName", sql.VarChar(255), varietyData.varietyName)
      .input("Description", sql.VarChar(sql.MAX), varietyData.description)
      .input("Origin", sql.VarChar(50), varietyData.origin).query(`
                INSERT INTO Varieties (VarietyName, Description, Origin)
                OUTPUT INSERTED.VarietyID
                VALUES (@VarietyName, @Description, @Origin);
            `);
    return result.recordset[0];
  } catch (err) {
    console.error("Error creating Variety:", err);
    throw err;
  }
};

const getAllVarieties = async () => {
  try {
    const pool = await sql.connect();
    const result = await pool.request().query("SELECT * FROM Varieties");
    return result.recordset;
  } catch (err) {
    console.error("Error fetching Varieties:", err);
    throw err;
  }
};

const addKoiPackageVariety = async (PackageID, VarietyID) => {
  try {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input("PackageID", sql.Int, PackageID)
      .input("VarietyID", sql.Int, VarietyID).query(`
                INSERT INTO KoiPackageVarieties (PackageID, VarietyID)
                OUTPUT INSERTED.PackageID, INSERTED.VarietyID
                VALUES (@PackageID, @VarietyID);
            `);
    return result.recordset[0];
  } catch (err) {
    console.error("Error adding Koi Package Variety:", err);
    throw err;
  }
};

module.exports = {
  createVariety,
  getAllVarieties,
  addKoiPackageVariety,
};
