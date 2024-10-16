const express = require('express');
const router = express.Router();
const momoController = require('../payment/momoController');

/**
 * @swagger
 * /api/payment/momo:
 *   post:
 *     summary: Create MoMo payment
 *     description: Create a payment using MoMo and receive a payment URL.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 description: The amount to be paid
 *                 example: "50000"
 *     responses:
 *       200:
 *         description: Returns the payment URL for MoMo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payUrl:
 *                   type: string
 *                   description: The URL where the payment can be made
 *                   example: "https://test-payment.momo.vn/pay/ABC123"
 *       500:
 *         description: Internal server error
 */
router.post('/momo', momoController.createPayment);

module.exports = router;
