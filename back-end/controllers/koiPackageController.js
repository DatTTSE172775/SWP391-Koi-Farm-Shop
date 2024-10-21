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

// Controller function to get a Koi Package by ID
exports.getKoiPackageById = async (req, res) => {
    try {
        const packageId = req.params.packageId;

        // Call the getKoiPackageById function from the model
        const result = await koiPackageModel.getKoiPackageById(packageId);

        if (!result) {
            return res.status(404).json({
                message: "Koi Package not found",
            });
        }

        res.status(200).json({
            message: "Koi Package retrieved successfully!",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching Koi Package",
            error: error.message,
        });
    }
};