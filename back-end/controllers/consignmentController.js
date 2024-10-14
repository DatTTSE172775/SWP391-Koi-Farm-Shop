const Consignment = require('../models/consignmentModel');

// Get all consignments
const getAllConsignments = async (req, res) => {
    try {
        const consignments = await Consignment.findAll();
        res.json(consignments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get consignment by ID
const getConsignmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const consignment = await Consignment.findByPk(id);
        if (!consignment) {
            return res.status(404).json({ message: 'Consignment not found.' });
        }
        res.json(consignment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { getAllConsignments, getConsignmentById };
