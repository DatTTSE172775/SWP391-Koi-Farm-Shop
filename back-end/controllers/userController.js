const User = require('../models/userModel'); // Import model User

// API Lấy danh sách nhân viên (Staff)
const getAllStaff = async (req, res) => {
    try {
      const staffList = await User.getAllStaff(); // Sử dụng phương thức trong model
      res.status(200).json(staffList);
    } catch (error) {
      console.error('Error fetching staff list:', error);
      res.status(500).json({ message: 'Error fetching staff list' });
    }
  };

module.exports = { getAllStaff };
