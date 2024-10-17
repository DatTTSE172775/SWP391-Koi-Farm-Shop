const KoiFish = require('../models/koiModel');

// Get all Koi Fish
const getAllKoiFish = async (req, res) => {
    try {
        const koiFish = await KoiFish.getAllKoiFish();
        res.json(koiFish);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get Koi Fish by ID
const getKoiFishById = async (req, res) => {
    const { koiId } = req.params;

    try {
        const koiFish = await KoiFish.getKoiFishById(koiId);
        if (!koiFish) {
            return res.status(404).json({ message: 'Koi Fish not found.' });
        }
        res.json(koiFish);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { getAllKoiFish, getKoiFishById };
