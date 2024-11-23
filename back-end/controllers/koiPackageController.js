const koiPackageModel = require("../models/koiPackageModel");
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

exports.createKoiPackage = [
  upload.single('ImageFile'),
  async (req, res) => {
    try {
      const packageData = req.body;
      
      if (req.file) {
        packageData.ImageLink = `/uploads/${req.file.filename}`;
      }

      // Validate required fields
      if (
        !packageData.KoiID ||
        !packageData.PackageName ||
        !packageData.ImageLink ||
        packageData.Price === undefined ||
        packageData.PackageSize === undefined ||
        packageData.Availability === undefined
      ) {
        return res.status(400).json({
          message: "Missing required fields",
          receivedData: packageData,
        });
      }

      const result = await koiPackageModel.createKoiPackage(packageData);

      if (result && result.PackageID) {
        res.status(201).json({
          message: "Koi Package created successfully!",
          PackageID: result.PackageID,
        });
      } else {
        throw new Error("Failed to create Koi Package");
      }
    } catch (error) {
      console.error("Error in createKoiPackage:", error);
      res.status(500).json({
        message: "Error creating Koi Package",
        error: error.message,
      });
    }
  }
];

// Controller function to get all of a Koi Packages
exports.getAllKoiPackages = async (req, res) => {
  try {
    const result = await koiPackageModel.getAllKoiPackages();
    res.status(200).json({
      message: "Koi Packages retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Koi Packages",
      error: error.message,
    });
  }
};

// Controller function to update the availability of a Koi Package
exports.updateKoiPackageAvailability = async (req, res) => {
  try {
      const { packageId } = req.params;
      const { availability } = req.body;
      const validAvailabilities = ['Available', 'Sold Out'];
      if (!validAvailabilities.includes(availability)) {
          return res.status(400).json({ message: "Invalid availability status." });
      }
      const success = await koiPackageModel.updateKoiPackageAvailability(packageId, availability);
      if (!success) {
          return res.status(404).json({ message: "Koi Package not found." });
      }
      res.json({ message: "Koi Package availability updated successfully." });
  } catch (error) {
      res.status(500).json({
          message: "Error updating Koi Package availability",
          error: error.message,
      });
  }
};


// Controller function to delete a Koi Package
exports.deleteKoiPackage = async (req, res) => {
  try {
      const { packageId } = req.params;
      const success = await koiPackageModel.deleteKoiPackage(packageId);
      if (!success) {
          return res.status(404).json({ message: "Koi Package not found." });
      }
      res.json({ message: "Koi Package deleted successfully." });
  } catch (error) {
      res.status(500).json({
          message: "Error deleting Koi Package",
          error: error.message,
      });
  }
};

// Controller function to get a Koi Package by an Id
exports.getKoiPackageById = async (req, res) => {
  try {
    const { packageId } = req.params;
    const result = await koiPackageModel.getKoiPackageById(packageId);
    res.status(200).json({ message: "Koi Package retrieved successfully!", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Koi Package", error: error.message });
  }
};

exports.updateKoiPackage = async (req, res) => {
    try {
        const { packageId } = req.params;
        const updateData = req.body;

        const success = await koiPackageModel.updateKoiPackage(packageId, updateData);
        
        if (!success) {
            return res.status(404).json({ 
                message: "Koi Package not found or no changes made." 
            });
        }

        res.json({ 
            message: "Koi Package updated successfully.",
            data: updateData
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Koi Package",
            error: error.message
        });
    }
};
