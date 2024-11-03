const koiModel = require("../models/koiModel");
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Controller function to create a new KoiFish entry
const createKoiFish = [
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
const getAllKoiFish = async (req, res) => {
  try {
    const koiFish = await koiModel.getAllKoiFish();
    res.json(koiFish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Controller function to get a KoiFish entry by ID
const getKoiFishById = async (req, res) => {
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

// Controller to update availability status of KoiFish
const updateKoiFishAvailability = async (req, res) => {
  try {
    const { koiId } = req.params;
    const { availability } = req.body;

    const validAvailabilities = ['Available', 'Sold Out'];
    if (!validAvailabilities.includes(availability)) {
      return res.status(400).json({ message: "Invalid availability status." });
    }

    const success = await koiModel.updateKoiFishAvailability(koiId, availability);
    if (!success) {
      return res.status(404).json({ message: "Koi Fish not found." });
    }

    res.json({ message: "Koi Fish availability updated successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error updating Koi Fish availability",
      error: error.message,
    });
  }
};

// Controller to delete KoiFish
const deleteKoiFish = async (req, res) => {
  try {
    const { koiId } = req.params;

    const success = await koiModel.deleteKoiFish(koiId);
    if (!success) {
      return res.status(404).json({ message: "Koi Fish not found." });
    }

    res.json({ message: "Koi Fish deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting Koi Fish",
      error: error.message,
    });
  }
};

// Controller function to update a KoiFish entry
const updateKoiFish = async (req, res) => {
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

// Export all controller functions
module.exports = {
  createKoiFish,
  getAllKoiFish,
  getKoiFishById,
  updateKoiFishAvailability,
  deleteKoiFish,
  updateKoiFish,
};
