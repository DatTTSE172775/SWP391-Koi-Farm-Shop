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
