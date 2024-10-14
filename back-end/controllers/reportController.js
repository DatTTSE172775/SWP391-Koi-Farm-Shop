const { createReport, getAllReports, getReportById, updateReport, deleteReport } = require('../models/reportModel');

// Create a new report
const createReportController = async (req, res) => {
    const { consignmentID, careDetails, careStartDate, careEndDate } = req.body;
    try {
        await createReport(consignmentID, careDetails, careStartDate, careEndDate);
        res.status(201).json({ message: 'Report created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating report' });
    }
};

// Get all reports
const getAllReportsController = async (req, res) => {
    try {
        const reports = await getAllReports();
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reports' });
    }
};

// Get a single report by ID
const getReportByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const report = await getReportById(id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching report' });
    }
};

// Update a report
const updateReportController = async (req, res) => {
    const { id } = req.params;
    const { careDetails, careEndDate } = req.body;
    try {
        await updateReport(id, careDetails, careEndDate);
        res.status(200).json({ message: 'Report updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating report' });
    }
};

// Delete a report
const deleteReportController = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteReport(id);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting report' });
    }
};

module.exports = {
    createReportController,
    getAllReportsController,
    getReportByIdController,
    updateReportController,
    deleteReportController
};
