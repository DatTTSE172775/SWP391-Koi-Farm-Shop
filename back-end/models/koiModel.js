const { sql } = require('../config/db');

// Lấy tất cả các cá Koi
exports.getAllKois = async () => {
  try {
    const result = await sql.query`SELECT * FROM KoiFish`;
    return result.recordset;
  } catch (error) {
    throw new Error('Error fetching koi fishes');
  }
};

// Lấy cá Koi theo ID
exports.getKoiById = async (koiID) => {
  try {
    const result = await sql.query`SELECT * FROM KoiFish WHERE KoiID = ${koiID}`;
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error fetching koi fish by ID');
  }
};

// Thêm cá Koi mới
exports.createKoi = async (name, varietyID, origin, gender, size, price) => {
  try {
    await sql.query`INSERT INTO KoiFish (Name, VarietyID, Origin, Gender, Size, Price, AddedDate)
                    VALUES (${name}, ${varietyID}, ${origin}, ${gender}, ${size}, ${price}, GETDATE())`;
  } catch (error) {
    throw new Error('Error creating koi fish');
  }
};
