const breedersModel = require("../models/breedersModel");

// Hàm tạo một breeder mới
exports.createBreeder = async (req, res) => {
  try {
    const breederData = req.body; // Dữ liệu từ request body
    const result = await breedersModel.createBreeder(breederData); // Gọi model để tạo breeder
    res.status(201).json({
      message: "Breeder created successfully!",
      data: result, // Trả về dữ liệu breeder vừa tạo
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating Breeder",
      error: error.message, // Trả về thông báo lỗi chi tiết
    });
  }
};

// Hàm lấy tất cả breeders
exports.getAllBreeders = async (req, res) => {
  try {
      const breeders = await breedersModel.getAllBreeders();
      res.status(200).json(breeders);
  } catch (error) {
      console.error(error);
      res.status(500).json({ 
          message: 'Error fetching Breeders',
          error: error.message
      });
  }
};

exports.getBreederById = async (req, res) => {
  try {
      const breederId = req.params.breederId;
      const result = await breedersModel.getBreederById(breederId);
      res.status(200).json({
          message: 'Breeder retrieved successfully!',
          data: result
      });
  } catch (error) {
      res.status(500).json({
          message: 'Error fetching Breeder by ID',
          error: error.message
      });
  }
};