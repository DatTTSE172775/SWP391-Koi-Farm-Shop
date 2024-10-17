const express = require('express');
const router = express.Router();
const koiController = require('../controllers/koiController');

// Định nghĩa route GET cho danh sách cá Koi
router.get('/', koiController.getKois);

// Định nghĩa route POST để thêm cá Koi mới
router.post('/add', koiController.addKoi);

module.exports = router;
