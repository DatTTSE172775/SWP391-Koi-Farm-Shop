const sql = require("mssql");

// Hàm tạo Breeder mới
const createBreeder = async (breederData) => {
  try {
    const pool = await sql.connect(); // Kết nối tới SQL Server
    const result = await pool
      .request()
      .input("Name", sql.VarChar(255), breederData.name)
      .input("Address", sql.VarChar(sql.MAX), breederData.address)
      .input("ContactInfo", sql.VarChar(255), breederData.contactInfo).query(`
                INSERT INTO Breeders (Name, Address, ContactInfo)
                VALUES (@Name, @Address, @ContactInfo);
            `);
    return result.recordset; // Trả về kết quả sau khi tạo
  } catch (err) {
    console.error("Error creating Breeder:", err);
    throw err; // Ném lỗi để controller xử lý
  }
};

// Hàm lấy tất cả các Breeders
const getAllBreeders = async () => {
  try {
    const pool = await sql.connect(); // Kết nối tới SQL Server
    const result = await pool.request().query("SELECT * FROM Breeders");
    return result.recordset; // Trả về danh sách breeders
  } catch (err) {
    console.error("Error fetching Breeders:", err);
    throw err; // Ném lỗi để controller xử lý
  }
};

module.exports = {
  createBreeder,
  getAllBreeders,
};
