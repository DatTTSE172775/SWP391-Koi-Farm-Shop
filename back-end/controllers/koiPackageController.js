const koiPackageModel = require("../models/koiPackageModel");

exports.createKoiPackage = async (req, res) => {
  try {
    const packageData = req.body;
    console.log("Received package data:", packageData); // Log received data

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
    console.log("Database operation result:", result); // Log database result

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
};

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

exports.getKoiPackageById = async (req, res) => {
  try {
    const { packageId } = req.params;
    const result = await koiPackageModel.getKoiPackageById(packageId);
    res.status(200).json({ message: "Koi Package retrieved successfully!", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Koi Package", error: error.message });
  }
};

