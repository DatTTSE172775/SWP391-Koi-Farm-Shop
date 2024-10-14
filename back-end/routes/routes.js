const express = require('express');
const router = express.Router();

// Import Controllers
const userSignUp = require('../controllers/userSignUp');
const userSignIn = require('../controllers/userSignIn');
const { getAllKoiFish, getKoiFishById } = require('../controllers/koiController');
const { getAllOrders, getOrderById } = require('../controllers/orderController');
const { getAllCustomers, getCustomerById } = require('../controllers/customerController');
const {
    createReportController,
    getAllReportsController,
    getReportByIdController,
    updateReportController,
    deleteReportController
} = require('../controllers/reportController');

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Địa chỉ email dùng làm tên đăng nhập
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Mật khẩu người dùng
 *                 example: "yourPassword"
 *               fullname:
 *                 type: string
 *                 description: Họ tên đầy đủ của người dùng
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 description: Số điện thoại của người dùng
 *                 example: "123456789"
 *     responses:
 *       201:
 *         description: Người dùng đăng ký thành công
 *       400:
 *         description: Lỗi về thông tin nhập vào (Tên đăng nhập hoặc số điện thoại đã tồn tại)
 *       500:
 *         description: Lỗi hệ thống
 */
router.post('/signup', userSignUp);


/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post('/signin', userSignIn);

/**
 * @swagger
 * /api/koifish:
 *   get:
 *     summary: Lấy danh sách tất cả cá Koi
 *     tags: [Koi Fish]
 *     responses:
 *       200:
 *         description: Danh sách tất cả cá Koi
 */
router.get('/koifish', getAllKoiFish);

/**
 * @swagger
 * /api/koifish/{koiId}:
 *   get:
 *     summary: Lấy chi tiết cá Koi theo ID
 *     tags: [Koi Fish]
 *     parameters:
 *       - in: path
 *         name: koiId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của cá Koi
 *     responses:
 *       200:
 *         description: Chi tiết cá Koi
 */
router.get('/koifish/:koiId', getKoiFishById);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lấy tất cả đơn hàng
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Danh sách tất cả đơn hàng
 */
router.get('/orders', getAllOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Lấy chi tiết đơn hàng theo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của đơn hàng
 *     responses:
 *       200:
 *         description: Chi tiết đơn hàng
 */
router.get('/orders/:orderId', getOrderById);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Lấy tất cả khách hàng
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Danh sách tất cả khách hàng
 */
router.get('/customers', getAllCustomers);

/**
 * @swagger
 * /api/customers/{customerId}:
 *   get:
 *     summary: Lấy chi tiết khách hàng theo ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của khách hàng
 *     responses:
 *       200:
 *         description: Chi tiết khách hàng
 */
router.get('/customers/:customerId', getCustomerById);

module.exports = router;
