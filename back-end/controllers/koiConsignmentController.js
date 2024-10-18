const koiConsignmentModel = require('../models/koiConsignmentModel');

exports.createKoiConsignment = async (req, res) => {
    try {
        const consignmentData = req.body;
        const result = await koiConsignmentModel.createKoiConsignment(consignmentData);
        res.status(201).json({
            message: 'Koi Consignment created successfully!',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Koi Consignment',
            error: error.message
        });
    }
};

exports.getAllKoiConsignments = async (req, res) => {
    try {
        const result = await koiConsignmentModel.getAllKoiConsignments();
        res.status(200).json({
            message: 'Koi Consignments retrieved successfully!',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching Koi Consignments',
            error: error.message
        });
    }
};
