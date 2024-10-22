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
    const breeders = await breedersModel.getAllBreeders(); // Gọi model để lấy tất cả breeders
    res.status(200).json({
      message: "Breeders retrieved successfully!",
      data: breeders, // Trả về danh sách breeders
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." }); // Trả về lỗi server nếu có vấn đề
  }
};
