const { sql } = require('../config/db');

// Tạo báo cáo
exports.createReport = async (req, res) => {
  const { consignmentID, careDetails } = req.body;

  try {
    await sql.query`INSERT INTO KoiReport (ConsignmentID, CareDetails)
                    VALUES (${consignmentID}, ${careDetails})`;
    res.status(201).json({ message: 'Report created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create report' });
  }
};

// Lấy báo cáo
exports.getReport = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query`SELECT * FROM KoiReport WHERE ReportID = ${id}`;
    const report = result.recordset[0];
    if (!report) return res.status(404).json({ error: 'Report not found' });

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get report' });
  }
};
