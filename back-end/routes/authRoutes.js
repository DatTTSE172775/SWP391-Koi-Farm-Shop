const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Định nghĩa route POST cho đăng ký người dùng
router.post('/register', authController.register);

// Định nghĩa route POST cho đăng nhập người dùng
router.post('/login', authController.login);

module.exports = router;
