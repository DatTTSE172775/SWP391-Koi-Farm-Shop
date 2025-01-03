const sql = require('mssql');

// Function to create a new user (Sign Up)
const createUser = async (username, passwordHash, role = 'Customer', subscriptionStatus = 'Active') => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Username', sql.VarChar(255), username)
            .input('PasswordHash', sql.VarChar(255), passwordHash)
            .input('Role', sql.VarChar(50), role)
            .input('SubscriptionStatus', sql.VarChar(50), subscriptionStatus)
            .query(`
                INSERT INTO Users (Username, PasswordHash, Role, SubscriptionStatus)
                VALUES (@Username, @PasswordHash, @Role, @SubscriptionStatus);
            `);
        return result;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

// Function to find user by email (for Sign In)
const findUserByUsername = async (username) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Username', sql.VarChar(255), username)
            .query('SELECT * FROM Users WHERE Username = @Username');

            console.log('Query Result:', result.recordset); // Log kết quả truy vấn

            if (result.recordset.length === 0) {
                return null; // User not found
            }
        return result.recordset[0];
    } catch (err) {
        console.error('Error finding user by username:', err); // Log lỗi truy vấn
        throw err;
    }
};

// Function to find user by ID
const findUserById = async (userId) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('UserID', sql.Int, userId)
            .query('SELECT * FROM Users WHERE UserID = @UserID');
        return result.recordset[0];
    } catch (err) {
        console.error('Error finding user by ID:', err);
        throw err;
    }
};

// Function to update user password
const updateUserPassword = async (userId, newPasswordHash) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('UserID', sql.Int, userId)
            .input('PasswordHash', sql.VarChar(255), newPasswordHash)
            .query('UPDATE Users SET PasswordHash = @PasswordHash WHERE UserID = @UserID');
        return result;
    } catch (err) {
        console.error('Error updating user password:', err);
        throw err;
    }
};

// Function to get all staff members
const getAllStaff = async () => {
    try {
        const pool = await sql.connect(); // Tái sử dụng đối tượng sql đã khai báo
        const result = await pool.request()
            .query(`SELECT * FROM Users WHERE Role = 'Staff'`);
        return result.recordset; // Trả về danh sách nhân viên
    } catch (err) {
        console.error('Error fetching staff list:', err);
        throw err;
    }
};

module.exports = {
    createUser,
    findUserByUsername,
    findUserById,       // Export findUserById for use in other modules
    updateUserPassword, // Export updateUserPassword for password update functionality
    getAllStaff
};
