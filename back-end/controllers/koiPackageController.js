const koiPackageModel = require('../models/koiPackageModel');

// Get all koi packages
const getAllKoiPackages = async (req, res) => {
    try {
        const koiPackages = await koiPackageModel.getAllKoiPackages();
        res.status(200).json(koiPackages);
    } catch (error) {
        console.error('Error in getAllKoiPackages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a koi package by ID
const getKoiPackageById = async (req, res) => {
    try {
        const packageId = parseInt(req.params.id);
        const koiPackage = await koiPackageModel.getKoiPackageById(packageId);
        
        if (koiPackage) {
            res.status(200).json(koiPackage);
        } else {
            res.status(404).json({ message: 'Koi package not found' });
        }
    } catch (error) {
        console.error('Error in getKoiPackageById:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllKoiPackages,
    getKoiPackageById
};
