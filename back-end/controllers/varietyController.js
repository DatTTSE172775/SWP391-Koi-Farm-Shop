const varietyModel = require('../models/varietyModel');

exports.createVariety = async (req, res) => {
    try {
        const varietyData = req.body;
        const result = await varietyModel.createVariety(varietyData);
        res.status(201).json({
            message: 'Variety created successfully!',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Variety',
            error: error.message
        });
    }
};

exports.getAllVarieties = async (req, res) => {
    try {
        const result = await varietyModel.getAllVarieties();
        res.status(200).json({
            message: 'Varieties retrieved successfully!',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching Varieties',
            error: error.message
        });
    }
};
