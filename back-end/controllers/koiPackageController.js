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

exports.deleteKoiPackage = async (req, res) => {
  try {
    const { packageId } = req.params;

    const success = await koiPackageModel.deleteKoiPackage(packageId);
    if (!success) {
      return res.status(404).json({ message: "Không tìm thấy Koi Package." });
    }

    res.json({ message: "Xóa Koi Package thành công." });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi xóa Koi Package",
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
