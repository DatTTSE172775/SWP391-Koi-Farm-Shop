const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware auth

// Import Controllers
const userSignUp = require("../controllers/userSignUp");
const userSignIn = require("../controllers/userSignIn");
const logoutUser = require("../controllers/userLogout");
const changePassword = require("../controllers/changePassword");
const forgotPassword = require("../controllers/forgotPassword");

const {
  createKoiFish,
  getAllKoiFish,
  getKoiFishById,
} = require("../controllers/koiController");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const {
  getAllCustomers,
  getCustomerById,
} = require("../controllers/customerController");
const {
  createReportController,
  getAllReportsController,
  getReportByIdController,
  updateReportController,
  deleteReportController,
} = require("../controllers/reportController");
const {
  createKoiPackage,
  getAllKoiPackages,
} = require("../controllers/koiPackageController");
const {
  createKoiConsignment,
  getAllKoiConsignments,
} = require("../controllers/koiConsignmentController");
const {
  createBreeder,
  getAllBreeders,
} = require("../controllers/breedersController");
const {
  createVariety,
  getAllVarieties,
} = require("../controllers/varietyController");

// User routes
/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
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
 *               fullname:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 */
router.post("/signup", userSignUp);

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: User login
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
 *         description: Successful login
 */
router.post("/signin", userSignIn);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: User logout
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful logout
 */
router.post("/logout", authMiddleware, logoutUser);

/**
 * @swagger
 * /api/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.post("/change-password", authMiddleware, changePassword);

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       200:
 *         description: New password sent to email
 */
router.post("/forgot-password", forgotPassword);

// Koi Fish routes
/**
 * @swagger
 * /api/koifish:
 *   get:
 *     summary: Get all Koi Fish
 *     tags: [Koi Fish]
 *     responses:
 *       200:
 *         description: List of all Koi Fish
 */
router.get("/koifish", getAllKoiFish);

/**
 * @swagger
 * /api/koifish/{koiId}:
 *   get:
 *     summary: Get Koi Fish details by ID
 *     tags: [Koi Fish]
 *     parameters:
 *       - in: path
 *         name: koiId
 *         schema:
 *           type: string
 *         required: true
 *         description: Koi Fish ID
 *     responses:
 *       200:
 *         description: Koi Fish details
 */
router.get("/koifish/:koiId", getKoiFishById);

/**
 * @swagger
 * /api/koifish:
 *   post:
 *     summary: Create a new Koi Fish
 *     tags: [Koi Fish]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               varietyId:
 *                 type: integer
 *               origin:
 *                 type: string
 *               breederId:
 *                 type: integer
 *               gender:
 *                 type: string
 *               born:
 *                 type: integer
 *               size:
 *                 type: number
 *               price:
 *                 type: number
 *               availability:
 *                 type: string
 *                 enum: [Available, Sold Out]
 *     responses:
 *       201:
 *         description: Koi Fish created successfully
 */
router.post("/koifish", authMiddleware, createKoiFish);

// Order routes
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get("/orders", authMiddleware, getAllOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 */
router.get("/orders/:orderId", authMiddleware, getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerID:
 *                 type: integer
 *               totalAmount:
 *                 type: number
 *               shippingAddress:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/orders", authMiddleware, createOrder);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Shipped, Delivered, Cancelled]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.patch("/orders/:orderId", authMiddleware, updateOrderStatus);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */
router.delete("/orders/:orderId", authMiddleware, deleteOrder);

// Customer routes
/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers
 */
router.get("/customers", authMiddleware, getAllCustomers);

/**
 * @swagger
 * /api/customers/{customerId}:
 *   get:
 *     summary: Get customer details by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer details
 */
router.get("/customers/:customerId", authMiddleware, getCustomerById);

// Report routes
/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Create a new report
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Report created successfully
 */
router.post("/reports", authMiddleware, createReportController);

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get all reports
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: A list of reports
 */
router.get("/reports", authMiddleware, getAllReportsController);

/**
 * @swagger
 * /api/reports/{reportId}:
 *   get:
 *     summary: Get report by ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: Report ID
 *     responses:
 *       200:
 *         description: Report details
 */
router.get("/reports/:reportId", authMiddleware, getReportByIdController);

/**
 * @swagger
 * /api/reports/{reportId}:
 *   patch:
 *     summary: Update report by ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: Report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Report updated successfully
 */
router.patch("/reports/:reportId", authMiddleware, updateReportController);

/**
 * @swagger
 * /api/reports/{reportId}:
 *   delete:
 *     summary: Delete report by ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: Report ID
 *     responses:
 *       200:
 *         description: Report deleted successfully
 */
router.delete("/reports/:reportId", authMiddleware, deleteReportController);

// Koi Package routes
/**
 * @swagger
 * /api/koipackage:
 *   post:
 *     summary: Create a new Koi Package
 *     tags: [Koi Package]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Koi Package created successfully
 */
router.post("/koipackage", authMiddleware, createKoiPackage);

/**
 * @swagger
 * /api/koipackages:
 *   get:
 *     summary: Get all Koi Packages
 *     tags: [Koi Package]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all Koi Packages
 */
router.get("/koipackages", authMiddleware, getAllKoiPackages);

// Koi Consignment routes
/**
 * @swagger
 * /api/koiconsignment:
 *   post:
 *     summary: Create a new Koi Consignment
 *     tags: [Koi Consignment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Koi Consignment created successfully
 */
router.post("/koiconsignment", authMiddleware, createKoiConsignment);

/**
 * @swagger
 * /api/koiconsignments:
 *   get:
 *     summary: Get all Koi Consignments
 *     tags: [Koi Consignment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all Koi Consignments
 */
router.get("/koiconsignments", authMiddleware, getAllKoiConsignments);

// Breeders routes
/**
 * @swagger
 * /api/breeders:
 *   post:
 *     summary: Create a new Breeder
 *     tags: [Breeders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Breeder created successfully
 */
router.post("/breeders", authMiddleware, createBreeder);

/**
 * @swagger
 * /api/breeders:
 *   get:
 *     summary: Get all Breeders
 *     tags: [Breeders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all Breeders
 */
router.get("/breeders", authMiddleware, getAllBreeders);

// Varieties routes
/**
 * @swagger
 * /api/varieties:
 *   post:
 *     summary: Create a new Variety
 *     tags: [Varieties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Variety created successfully
 */
router.post("/varieties", authMiddleware, createVariety);

/**
 * @swagger
 * /api/varieties:
 *   get:
 *     summary: Get all Varieties
 *     tags: [Varieties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all Varieties
 */
router.get("/varieties", authMiddleware, getAllVarieties);

module.exports = router;
