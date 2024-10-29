const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

/**
 * @swagger
 * /api/payment/create_payment:
 *   post:
 *     summary: Tạo URL thanh toán VNPay
 *     description: API tạo URL thanh toán cho khách hàng qua VNPay
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *     responses:
 *       200:
 *         description: Trả về URL để người dùng thanh toán
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paymentUrl:
 *                   type: string
 *                   description: URL thanh toán VNPay
 *       400:
 *         description: Lỗi khi tạo thanh toán
 */
router.post('/create_payment', paymentController.createPayment);

/**
 * @swagger
 * /api/payment/verify:
 *   get:
 *     summary: Xác minh kết quả thanh toán từ VNPay
 *     description: API để kiểm tra và xác minh trạng thái thanh toán từ VNPay
 *     parameters:
 *       - in: query
 *         name: vnp_Amount
 *         schema:
 *           type: string
 *         description: Số tiền thanh toán
 *       - in: query
 *         name: vnp_TxnRef
 *         schema:
 *           type: string
 *         description: Mã giao dịch của VNPay
 *       - in: query
 *         name: vnp_ResponseCode
 *         schema:
 *           type: string
 *         description: Mã phản hồi từ VNPay
 *     responses:
 *       200:
 *         description: Trạng thái thanh toán
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Trạng thái thanh toán
 *       400:
 *         description: Lỗi xác minh thanh toán
 */
router.get('/verify', paymentController.verifyPayment);

module.exports = router;
