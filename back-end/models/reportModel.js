const sql = require('mssql');
const { connectDB } = require('../config/db'); // Your connection configuration

// Create a new report
const createReport = async (consignmentID, careDetails, careStartDate, careEndDate) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('ConsignmentID', sql.Int, consignmentID)
            .input('CareDetails', sql.Text, careDetails)
            .input('CareStartDate', sql.DateTime, careStartDate)
            .input('CareEndDate', sql.DateTime, careEndDate)
            .query(`
                INSERT INTO KoiReport (ConsignmentID, CareDetails, CareStartDate, CareEndDate)
                VALUES (@ConsignmentID, @CareDetails, @CareStartDate, @CareEndDate)
            `);

        return result;
    } catch (err) {
        console.error('Error creating report:', err);
        throw err;
    }
};

// Get all reports
const getAllReports = async () => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM KoiReport');
        return result.recordset;
    } catch (err) {
        console.error('Error fetching reports:', err);
        throw err;
    }
};

// Get report by ID
const getReportById = async (reportID) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('ReportID', sql.Int, reportID)
            .query('SELECT * FROM KoiReport WHERE ReportID = @ReportID');
        return result.recordset[0];
    } catch (err) {
        console.error('Error fetching report:', err);
        throw err;
    }
};

// Update a report
const updateReport = async (reportID, careDetails, careEndDate) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('ReportID', sql.Int, reportID)
            .input('CareDetails', sql.Text, careDetails)
            .input('CareEndDate', sql.DateTime, careEndDate)
            .query(`
                UPDATE KoiReport
                SET CareDetails = @CareDetails, CareEndDate = @CareEndDate
                WHERE ReportID = @ReportID
            `);
        return result;
    } catch (err) {
        console.error('Error updating report:', err);
        throw err;
    }
};

// Delete a report
const deleteReport = async (reportID) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('ReportID', sql.Int, reportID)
            .query('DELETE FROM KoiReport WHERE ReportID = @ReportID');
        return result;
    } catch (err) {
        console.error('Error deleting report:', err);
        throw err;
    }
};

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport
};
