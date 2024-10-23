const { createKoiConsignment: createKoiConsignmentModel } = require('../models/koiConsignmentModel');
const { getAllKoiConsignments: getAllKoiConsignmentsModel } = require('../models/koiConsignmentModel');

exports.createKoiConsignment = async (req, res) => {
    try {
        // The req object now has the user information thanks to authMiddleware
        const result = await createKoiConsignmentModel(req);
        res.status(201).json({ message: 'Koi Consignment created successfully', result });
    } catch (error) {
        console.error('Error in createKoiConsignment controller:', error);
        res.status(500).json({ message: 'Error creating Koi Consignment', error: error.message });
    }
};

exports.getAllKoiConsignments = async (req, res) => {
    try {
        const result = await getAllKoiConsignmentsModel();
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
