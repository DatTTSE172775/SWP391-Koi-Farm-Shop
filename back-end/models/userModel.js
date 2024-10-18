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
        return result.recordset[0];
    } catch (err) {
        console.error('Error finding user by username:', err);
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

module.exports = {
    createUser,
    findUserByUsername,
    findUserById,       // Export findUserById for use in other modules
    updateUserPassword  // Export updateUserPassword for password update functionality
};
