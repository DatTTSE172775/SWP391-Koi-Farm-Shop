const { sql } = require('../config/db');

// Lấy thông tin người dùng theo ID
exports.getUserById = async (userID) => {
  try {
    const result = await sql.query`SELECT * FROM Users WHERE UserID = ${userID}`;
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error fetching user by ID');
  }
};

// Thêm người dùng mới
exports.createUser = async (username, passwordHash, role = 'Guest') => {
  try {
    await sql.query`INSERT INTO Users (Username, PasswordHash, Role, SubscriptionStatus)
                    VALUES (${username}, ${passwordHash}, ${role}, 'Active')`;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

// Xác thực người dùng bằng tên đăng nhập
exports.getUserByUsername = async (username) => {
  try {
    const result = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
    return result.recordset[0];
  } catch (error) {
    throw new Error('Error fetching user by username');
  }
};
