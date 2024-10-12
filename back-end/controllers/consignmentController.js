exports.createConsignment = async (req, res) => {
  try {
    const { koiID, customerID, priceAgreed } = req.body;
    // Logic tạo ký gửi mới
    res.status(201).json({ message: 'Consignment created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create consignment' });
  }
};

exports.updateConsignmentStatus = async (req, res) => {
  try {
    const consignmentId = req.params.id;
    const { status } = req.body;
    // Logic cập nhật trạng thái ký gửi
    res.status(200).json({ message: 'Consignment status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update consignment status' });
  }
};
