const Consignment = require("../models/consignmentModel");

// Get all consignments
const getAllConsignments = async (req, res) => {
  try {
    const consignments = await Consignment.findAll();
    res.json(consignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Get consignment by ID
const getConsignmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const consignment = await Consignment.findByPk(id);
    if (!consignment) {
      return res.status(404).json({ message: "Consignment not found." });
    }
    res.json(consignment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Create a new consignment
const createConsignment = async (req, res) => {
  try {
    const { customerID, koiID, consignmentType, consignmentMode, priceAgreed, notes, koiType, koiColor, koiAge, koiSize } = req.body;
    const imagePath = req.file ? req.file.path : null;

    await Consignment.createConsignment(customerID, koiID, consignmentType, consignmentMode, priceAgreed, notes, koiType, koiColor, koiAge, koiSize, imagePath);
    
    res.status(201).json({ message: "Consignment created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Update consignment status
const updateConsignmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Consignment.updateConsignmentStatus(id, status);
    res.json({ message: "Consignment status updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { getAllConsignments, getConsignmentById, createConsignment, updateConsignmentStatus };
