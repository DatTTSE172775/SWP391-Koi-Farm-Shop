const { sql } = require('../config/db');
const { getUserById } = require('./userModel'); // Import related functions if needed

// Create a new customer
const createCustomer = async (userId, fullName, email, phoneNumber = null, address = null) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('UserID', sql.Int, userId)
            .input('FullName', sql.VarChar(255), fullName)
            .input('Email', sql.VarChar(255), email)
            .input('PhoneNumber', sql.VarChar(20), phoneNumber)
            .input('Address', sql.VarChar(sql.MAX), address)
            .query(`
                INSERT INTO Customers (UserID, FullName, Email, PhoneNumber, Address)
                VALUES (@UserID, @FullName, @Email, @PhoneNumber, @Address);
            `);
        return result;
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

// Get customer by ID
const getCustomerById = async (customerId) => {
    try {
        const result = await sql.query`SELECT * FROM Customers WHERE CustomerID = ${customerId}`;
        if (result.recordset.length === 0) {
            return null;
        }
        return result.recordset[0];
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

const getCustomerByName = async (fullName) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('FullName', sql.VarChar(255), fullName)
            .query`SELECT * FROM Customers WHERE FullName LIKE '%' + @FullName + '%'`;
        return result.recordset;
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

const getAllCustomers = async () => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Customers');
        return result.recordset;
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

const getCustomerByUserName = async (userName) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Username', sql.VarChar(255), userName)
            .query(`
                SELECT c.*, u.Username
                FROM Customers c
                JOIN Users u ON c.UserID = u.UserID
                WHERE u.Username = @Username
            `);
        
        if (result.recordset.length === 0) {
            return null;
        }
        return result.recordset[0];
    } catch (err) {
        console.error('SQL error', err);
        throw err;
    }
};

module.exports = { createCustomer, getCustomerById, getAllCustomers, getCustomerByName, getCustomerByUserName };
