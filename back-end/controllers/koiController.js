const koiModel = require("../models/koiModel");
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


// Controller function to create a new KoiFish entry
exports.createKoiFish = [
  upload.single('imageFile'), // Add multer middleware
  async (req, res) => {
    try {
      const {
        name,
        varietyId,
        origin,
        breederId,
        gender,
        born,
        size,
        price,
        weight,
        personality,
        feedingAmountPerDay,
        healthStatus,
        screeningRate,
        certificateLink,
        availability,
      } = req.body;

      // Get the image path from the uploaded file
      const imagesLink = req.file ? `/uploads/${req.file.filename}` : null;

      // Call the createKoiFish function from the model
      const result = await koiModel.createKoiFish(
        name,
        parseInt(varietyId),
        origin,
        parseInt(breederId),
        gender,
        parseInt(born),
        parseFloat(size),
        parseFloat(price),
        parseFloat(weight),
        personality,
        parseFloat(feedingAmountPerDay),
        healthStatus,
        parseFloat(screeningRate),
        certificateLink,
        imagesLink,
        availability
      );

      res.status(201).json({
        message: "Koi Fish created successfully!",
        data: result,
      });
    } catch (error) {
      console.error('Error in createKoiFish:', error);
      res.status(500).json({
        message: "Error creating Koi Fish",
        error: error.message,
      });
    }
  }
];

// Controller function to get all KoiFish entries
 exports.getAllKoiFish = async (req, res) => {
  try {
      const koiFish = await koiModel.getAllKoiFish();
      res.json(koiFish);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error.' });
  }
};

// Controller function to get a KoiFish entry by ID
exports.getKoiFishById = async (req, res) => {
  try {
    const koiId = req.params.koiId;

    // Call the getKoiFishById function from the model
    const result = await koiModel.getKoiFishById(koiId);

    if (!result) {
      return res.status(404).json({
        message: "Koi Fish not found",
      });
    }

    res.status(200).json({
      message: "Koi Fish retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Koi Fish",
      error: error.message,
    });
  }
};

// controller để cập nhật trạng thái sẵn có của KoiFish
exports.updateKoiFishAvailability = async (req, res) => {
  try {
    const { koiId } = req.params;
    const { availability } = req.body;

    const validAvailabilities = ['Available', 'Sold Out'];
    if (!validAvailabilities.includes(availability)) {
      return res.status(400).json({ message: "Trạng thái sẵn có không hợp lệ." });
    }

    const success = await koiModel.updateKoiFishAvailability(koiId, availability);
    if (!success) {
      return res.status(404).json({ message: "Không tìm thấy Koi Fish." });
    }

    res.json({ message: "Cập nhật trạng thái sẵn có của Koi Fish thành công." });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi cập nhật trạng thái sẵn có của Koi Fish",
      error: error.message,
    });
  }
};

// controller để xóa KoiFish
exports.deleteKoiFish = async (req, res) => {
  try {
    const { koiId } = req.params;

    const success = await koiModel.deleteKoiFish(koiId);
    if (!success) {
      return res.status(404).json({ message: "Không tìm thấy Koi Fish." });
    }

    res.json({ message: "Xóa Koi Fish thành công." });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi xóa Koi Fish",
      error: error.message,
    });
  }
};

// Controller function to update a KoiFish entry
exports.updateKoiFish = async (req, res) => {
    try {
        const { koiId } = req.params;
        const updateData = req.body;

        const success = await koiModel.updateKoiFish(koiId, updateData);
        
        if (!success) {
            return res.status(404).json({ 
                message: "Koi Fish not found or no changes made." 
            });
        }

        res.json({ 
            message: "Koi Fish updated successfully.",
            data: updateData
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Koi Fish",
            error: error.message
        });
    }
};

// Controller function to create KoiFish from consignment data
exports.createKoiFishFromConsignment = [
  upload.single('imageFile'),
  async (req, res) => {
    try {
      const consignmentData = {
        KoiType: req.body.KoiType,
        KoiAge: parseInt(req.body.KoiAge),
        KoiSize: parseInt(req.body.KoiSize),
        PriceAgreed: parseFloat(req.body.PriceAgreed),
        InspectionResult: req.body.InspectionResult,
        ImagePath: req.body.ImagePath
      };

      // Create KoiFish entry from consignment data
      const koiId = await koiModel.createKoiFishFromConsignment(consignmentData);

      res.status(201).json({
        message: "Koi Fish created successfully from consignment!",
        koiId: koiId
      });
    } catch (error) {
      console.error('Error in createKoiFishFromConsignment:', error);
      res.status(500).json({
        message: "Error creating Koi Fish from consignment",
        error: error.message
      });
    }
  }
];

exports.updateConsignmentKoiId = async (req, res) => {
  const { consignmentId } = req.params;
  const { koiId } = req.body;
  await koiModel.updateConsignmentKoiId(consignmentId, koiId);
  res.json({ message: "KoiID updated in KoiConsignment successfully." });
};
