const sql = require("mssql");

// Function to create a new KoiFish entry
const createKoiFish = async (
  name,
  varietyId,
  origin,
  breederId,
  gender,
  born,
  size,
  price,
  availability = "Available"
) => {
  try {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input("Name", sql.VarChar(255), name)
      .input("VarietyID", sql.Int, varietyId)
      .input("Origin", sql.VarChar(50), origin)
      .input("BreederID", sql.Int, breederId)
      .input("Gender", sql.VarChar(50), gender)
      .input("Born", sql.Int, born)
      .input("Size", sql.Float, size)
      .input("Price", sql.Decimal(10, 2), price)
      .input("Availability", sql.VarChar(50), availability).query(`
                INSERT INTO KoiFish (Name, VarietyID, Origin, BreederID, Gender, Born, Size, Price, Availability)
                VALUES (@Name, @VarietyID, @Origin, @BreederID, @Gender, @Born, @Size, @Price, @Availability);
            `);
    return result;
  } catch (err) {
    console.error("Error creating KoiFish:", err);
    throw err;
  }
};

// Function to get all koi fish
const getAllKoiFish = async () => {
  try {
    const pool = await sql.connect();
    const result = await pool.request().query("SELECT * FROM KoiFish");
    return result.recordset;
  } catch (err) {
    console.error("Error fetching KoiFish:", err);
    throw err;
  }
};

// Function to get a koi fish by ID
const getKoiFishById = async (koiId) => {
  try {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input("KoiID", sql.Int, koiId)
      .query("SELECT * FROM KoiFish WHERE KoiID = @KoiID");
    return result.recordset[0];
  } catch (err) {
    console.error("Error fetching KoiFish:", err);
    throw err;
  }
};

module.exports = { createKoiFish, getAllKoiFish, getKoiFishById };
