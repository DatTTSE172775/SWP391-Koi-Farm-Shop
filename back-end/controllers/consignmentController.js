const Consignment = require("../models/consignmentModel");

// Get all consignments
const getAllConsignments = async (req, res) => {
  try {
    const consignments = await Consignment.getAllConsignments();
    res.send(consignments);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error." });
  }
};

// Get consignment by ID
const getConsignmentById = async (req, res) => {
  // Ép kiểu consignmentID từ route parameter thành số nguyên
  const id = parseInt(req.params.id, 10);
  console.log("Received request for consignment ID:", id); // Kiểm tra giá trị ID nhận từ request

  try {
    const consignment = await Consignment.getConsignmentById(id);
    if (!consignment) {
      return res.status(404).send({ message: "Consignment not found." });
    }
    res.json(consignment);
  } catch (err) {
    console.error('Error fetching consignment by ID:', err);
    res.status(500).json({ message: "Error fetching consignment by ID", error: err.message });
  }
};

// Create a new consignment
const createConsignment = async (req, res) => {
  try {
    const { customerID, koiID, consignmentType, consignmentMode, priceAgreed, notes, koiType, koiColor, koiAge, koiSize } = req.body;

    if (!customerID || !koiID || !consignmentType || !priceAgreed) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
    }

    const imagePath = req.file ? req.file.path : null;

    await Consignment.createConsignment(customerID, koiID, consignmentType, consignmentMode || 'Online', priceAgreed, notes, koiType, koiColor, koiAge, koiSize, imagePath);
    
    res.status(201).send({ 
      message: "Consignment created successfully.", 
      consignmentID: newConsignmentID 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error.", error: err.message });
  }
};

// Update consignment status
const updateConsignmentStatus = async (req, res) => {
  // Lấy ID từ URL và ép kiểu số nguyên
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;

  try { 
    await Consignment.updateConsignmentStatus(id, status); //Gọi Model
    res.send({ message: "Consignment status updated successfully." });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ message: "Error updating consignment status", error: err.message });
  }
};

module.exports = { getAllConsignments, getConsignmentById, createConsignment, updateConsignmentStatus };
