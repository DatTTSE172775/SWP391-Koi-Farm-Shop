const consignmentModel = require("../models/koiConsignmentModel");

exports.createKoiConsignment = async (req, res) => {
    try {
        // The req object now has the user information thanks to authMiddleware
        const result = await consignmentModel.createKoiConsignment(req);
        res.status(201).json({ message: 'Koi Consignment created successfully', result });
    } catch (error) {
        console.error('Error in createKoiConsignment controller:', error);
        res.status(500).json({ message: 'Error creating Koi Consignment', error: error.message });
    }
};

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
    const consignmentId = parseInt(req.params.id, 10);
    const { userId } = req.body;

    console.log("Assigning consignment:", { consignmentId, userId });

    if (!consignmentId || !userId) {
        return res.status(400).send({ message: "Consignment ID and User ID are required." });
    }

    try {
        const result = await consignmentModel.assignConsignmentToStaff(consignmentId, userId);
        if (result && result.error) {
            return res.status(400).send({ message: result.error });
        }
        if (!result) {
            return res.status(404).send({ message: "Consignment not found." });
        }
        res.status(200).json({ message: "Consignment assigned to staff.", consignment: result });
    } catch (err) {
        console.error(err);
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
