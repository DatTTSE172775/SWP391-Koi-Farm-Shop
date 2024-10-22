const varietyModel = require('../models/varietyModel');

exports.createVariety = async (req, res) => {
    try {
        const varietyData = req.body;
        console.log('Received variety data:', varietyData);  // Log received data

        // Validate required fields
        if (!varietyData.varietyName || !varietyData.description || !varietyData.origin) {
            return res.status(400).json({
                message: 'Missing required fields',
                receivedData: varietyData
            });
        }

        const result = await varietyModel.createVariety(varietyData);
        console.log('Database operation result:', result);  // Log database result

        if (result && result.VarietyID) {
            res.status(201).json({
                message: 'Variety created successfully!',
                VarietyID: result.VarietyID
            });
        } else {
            throw new Error('Failed to create Variety');
        }
    } catch (error) {
        console.error('Error in createVariety:', error);
        res.status(500).json({
            message: 'Error creating Variety',
            error: error.message
        });
    }
};

exports.getAllVarieties = async (req, res) => {
    try {
        const result = await varietyModel.getAllVarieties();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in getAllVarieties:', error);
        res.status(500).json({
            message: 'Error fetching Varieties',
            error: error.message
        });
    }
};

exports.addKoiPackageVariety = async (req, res) => {
    try {
        const { PackageID, VarietyID } = req.body;
        console.log('Received KoiPackageVariety data:', { PackageID, VarietyID });

        if (!PackageID || !VarietyID) {
            return res.status(400).json({
                message: 'Missing required fields',
                receivedData: { PackageID, VarietyID }
            });
        }

        const result = await varietyModel.addKoiPackageVariety(PackageID, VarietyID);
        console.log('Database operation result:', result);

        if (result && result.PackageID && result.VarietyID) {
            res.status(201).json({
                message: 'Koi Package Variety added successfully!',
                PackageID: result.PackageID,
                VarietyID: result.VarietyID
            });
        } else {
            throw new Error('Failed to add Koi Package Variety');
        }
    } catch (error) {
        console.error('Error in addKoiPackageVariety:', error);
        res.status(500).json({
            message: 'Error adding Koi Package Variety',
            error: error.message
        });
    }
};
