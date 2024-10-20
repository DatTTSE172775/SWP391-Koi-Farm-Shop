const koiModel = require("../models/koiModel");

// Controller function to create a new KoiFish entry
exports.createKoiFish = async (req, res) => {
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
      availability,
    } = req.body;

    // Call the createKoiFish function from the model
    const result = await koiModel.createKoiFish(
      name,
      varietyId,
      origin,
      breederId,
      gender,
      born,
      size,
      price,
      availability
    );

    res.status(201).json({
      message: "Koi Fish created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating Koi Fish",
      error: error.message,
    });
  }
};

// Controller function to get all KoiFish entries
exports.getAllKoiFish = async (req, res) => {
  try {
    // Call the getAllKoiFish function from the model
    const result = await koiModel.getAllKoiFish();

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
