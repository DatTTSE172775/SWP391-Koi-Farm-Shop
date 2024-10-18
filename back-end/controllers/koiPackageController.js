const koiPackageModel = require('../models/koiPackageModel');

exports.createKoiPackage = async (req, res) => {
    try {
        const packageData = req.body;
        const result = await koiPackageModel.createKoiPackage(packageData);
        res.status(201).json({
            message: 'Koi Package created successfully!',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating Koi Package',
            error: error.message
        });
    }
};

exports.getAllKoiPackages = async (req, res) => {
    try {
        const result = await koiPackageModel.getAllKoiPackages();
        res.status(200).json({
            message: 'Koi Packages retrieved successfully!',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching Koi Packages',
            error: error.message
        });
    }
};
