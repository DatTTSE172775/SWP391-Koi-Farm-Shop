const consignmentModel = require("../models/koiConsignmentModel");
const multer = require('multer');
const path = require('path');


// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/')) // Path is now relative to the back-end directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
    }
});

const upload = multer({ storage: storage });

exports.createKoiConsignment = [
    upload.single('imageFile'), // 'imageFile' should match the name in the form data
    async (req, res) => {
        try {
            // The req object now has the user information thanks to authMiddleware
            // and the file information thanks to multer
            const result = await consignmentModel.createKoiConsignment(req);
            res.status(201).json({ message: 'Koi Consignment created successfully', result });
        } catch (error) {
            console.error('Error in createKoiConsignment controller:', error);
            res.status(500).json({ message: error.message || 'Error creating Koi Consignment' });
        }
    }
];

exports.getAllKoiConsignments = async (req, res) => {
    try {
        const result = await consignmentModel.getAllKoiConsignments();
        res.status(200).json({
            message: 'Koi Consignments retrieved successfully!',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching Koi Consignments',
            error: error.message
        });
    }
};

exports.getConsignmentsById = async (req, res) => {
    try {   
        const { id } = req.params;
        const result = await consignmentModel.getConsignmentsById(id);
        res.status(200).json({ message: 'Koi Consignment retrieved successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Koi Consignment', error: error.message });
    }
};

exports.updateConsignmentStatus = async (req, res) => {
    try {
        const { consignmentId, status } = req.params;
        
        console.log('Received consignmentId:', consignmentId);
        console.log('Received status:', status);
        console.log('Received request:', req.params);
        
        if (status === 'assign') {
            return res.status(400).json({ success: false, message: 'Invalid status. Use the /assign endpoint for assigning consignments.' });
        }
        
        const result = await consignmentModel.updateConsignmentStatus(consignmentId, status);
        if (result.success) {
            res.status(200).json({ success: true, message: 'Koi Consignment status updated successfully', data: result.data });
        } else {
            res.status(400).json({ success: false, message: 'Failed to update Koi Consignment status' });
        }
    } catch (error) {
        console.error('Error updating Koi Consignment status:', error);
        res.status(500).json({ success: false, message: 'Error updating Koi Consignment status', error: error.message });
    }
};

exports.assignConsignmentToStaff = async (req, res) => {
    const consignmentId = parseInt(req.params.consignmentId, 10);
    const { userId } = req.body;

    console.log("Consignment ID:", consignmentId);
    console.log("User ID:", userId);

    if (!consignmentId) {
        return res.status(400).send({ message: "Consignment ID is required." });
    }

    try {
        // Check if the user is a staff member
        const isStaff = await consignmentModel.isUserStaff(userId);
        if (!isStaff) {
            return res.status(400).send({ message: "User is not a Staff member." });
        }

        // Check if the consignment exists
        const consignment = await consignmentModel.getConsignmentsById(consignmentId);
        if (!consignment) {
            return res.status(404).send({ message: "Consignment not found." });
        }

        // Assign the consignment to staff
        const assignedConsignment = await consignmentModel.assignConsignmentToStaff(consignmentId, userId);
        if (!assignedConsignment) {
            return res.status(400).send({ message: "Failed to assign consignment to staff." });
        }

        res.status(200).send({ message: "Consignment assigned to staff successfully.", consignment: assignedConsignment });
    } catch (err) {
        console.error("Error assigning consignment to staff:", err);
        res.status(500).send({ message: "Failed to assign consignment to staff." });
    }
};

exports.getAllStaffConsignmentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await consignmentModel.getAllStaffConsignmentsByUserId(userId);
        res.status(200).json({ message: 'Koi Consignments retrieved successfully!', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Koi Consignments', error: error.message });
    }
};

exports.getPendingConsignmentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await consignmentModel.getPendingConsignmentsByUserId(userId);
        res.status(200).json({ message: 'Pending Koi Consignments retrieved successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Pending Koi Consignments', error: error.message });
    }
};

exports.getApprovedConsignmentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await consignmentModel.getApprovedConsignmentsByUserId(userId);
        res.status(200).json({ message: 'Approved Koi Consignments retrieved successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Approved Koi Consignments', error: error.message });
    }
};
        
exports.updateConsignmentToApproved = async (req, res) => {
    const { consignmentId } = req.params;
  
    try {
      const updatedConsignment = await consignmentModel.updateConsignmentStatus(consignmentId, "Approved");
      if (!updatedConsignment) {
        return res.status(404).send({ message: "Consignment not found." });
      }
      res.send({
        message: "Consignment status updated to Approved.",
        consignment: updatedConsignment,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Failed to update consignment to Approved." });
    }
  };

