const express = require('express');
const router = express.Router();
const paymentMomoController = require('../controllers/momoController');

// Định nghĩa route POST cho tạo bill thanh toán
router.post('/paymentgateway', paymentMomoController.paymentMomo)
