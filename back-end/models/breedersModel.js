const sql = require('mssql');

const createBreeder = async (breederData) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('Name', sql.VarChar(255), breederData.name)
            .input('Address', sql.VarChar(sql.MAX), breederData.address)
            .input('ContactInfo', sql.VarChar(255), breederData.contactInfo)
            .query(`
                INSERT INTO Breeders (Name, Address, ContactInfo)
                VALUES (@Name, @Address, @ContactInfo);
            `);
        return result;
    } catch (err) {
        console.error('Error creating Breeder:', err);
        throw err;
    }
};

const getAllBreeders = async () => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Breeders');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching Breeders:', err);
        throw err;
    }
};

const getBreederById = async (breederId) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().input('BreederID', sql.Int, breederId).query('SELECT * FROM Breeders WHERE BreederID = @BreederID');
        return result.recordset[0];
    } catch (err) {
        console.error('Error fetching Breeder by ID:', err);
        throw err;
    }
};

module.exports = {
    createBreeder,
    getAllBreeders,
    getBreederById,
};
