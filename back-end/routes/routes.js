const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware auth

// Import Controllers
const userSignUp = require("../controllers/userSignUp");
const userSignIn = require("../controllers/userSignIn");
const logoutUser = require("../controllers/userLogout");
const changePassword = require("../controllers/changePassword");
const forgotPassword = require("../controllers/forgotPassword");

const koiConsignmentController = require("../controllers/koiConsignmentController");

const {
  createKoiFish,
  getAllKoiFish,
  getKoiFishById,
  updateKoiFishAvailability,
  deleteKoiFish,
} = require("../controllers/koiController");
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getAllStaffOrdersByUserId,
  assignOrderToStaff,
  deleteOrder,
} = require("../controllers/orderController");
const {
  getAllCustomers,
  getCustomerById,
  getCustomerByUserName,
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
  deleteKoiPackage,
} = require("../controllers/koiPackageController");
const {
  createKoiConsignment,
  getAllKoiConsignments,
} = require("../controllers/koiConsignmentController");
const {
  createBreeder,
  getAllBreeders,
  getBreederById,
} = require("../controllers/breedersController");
const {
  createVariety,
  getAllVarieties,
  addKoiPackageVariety,
} = require("../controllers/varietyController");
const { getAllStaff } = require("../controllers/userController");
const { getAllStaff } = require("../controllers/userController");

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

// Staff routes
/**
 * @swagger
 * /api/staff:
 *   get:
 *     summary: Get all staff members
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: A list of all staff members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   role:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
router.get("/staff", getAllStaff);
router.get("/staff", getAllStaff);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get all orders assigned to Staff
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID of the staff member
 *     responses:
 *       200:
 *         description: List of orders assigned to the staff member
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: integer
 *                   customerID:
 *                     type: integer
 *                   totalAmount:
 *                     type: number
 *                   shippingAddress:
 *                     type: string
 *                   paymentMethod:
 *                     type: string
 *                   status:
 *                     type: string
 *                   userId:
 *                     type: integer
 *       404:
 *         description: No orders found for the given user ID
 *       500:
 *         description: Internal server error
 */
router.get("/orders/user/:userId", getAllStaffOrdersByUserId);
router.get("/orders/user/:userId", getAllStaffOrdersByUserId);

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
router.post("/addKoiFish", createKoiFish);

/**
 * @swagger
 * /api/koifish/{koiId}/availability:
 *   patch:
 *     summary: Update Koi Fish availability
 *     tags: [Koi Fish]
 *     parameters:
 *       - in: path
 *         name: koiId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Koi Fish ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability:
 *                 type: string
 *                 enum: [Available, Sold Out]
 *     responses:
 *       200:
 *         description: Koi Fish availability updated successfully
 *       400:
 *         description: Invalid availability status
 *       404:
 *         description: Koi Fish not found
 *       500:
 *         description: Server error
 */
router.patch("/koifish/:koiId/availability", updateKoiFishAvailability);

/**
 * @swagger
 * /api/deleteKoi/{koiId}:
 *   delete:
 *     summary: Delete a Koi Fish
 *     tags: [Koi Fish]
 *     parameters:
 *       - in: path
 *         name: koiId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Koi Fish ID
 *     responses:
 *       200:
 *         description: Koi Fish deleted successfully
 *       404:
 *         description: Koi Fish not found
 *       500:
 *         description: Server error
 */
router.delete("/deleteKoi/:koiId", deleteKoiFish);

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
router.get("/orders", getAllOrders);

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
router.get("/orders/:orderId", getOrderById);

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
router.post("/orders", createOrder);

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
router.patch("/orders/:orderId", updateOrderStatus);

/**
 * @swagger
 * /api/orders/{orderId}/assign:
 *   patch:
 *     summary: Assign order to staff
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Order assigned to staff successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to assign order to staff
 */
router.patch("/:orderId/assign", assignOrderToStaff);
router.patch("/:orderId/assign", assignOrderToStaff);

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
router.delete("/orders/:orderId", deleteOrder);

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
router.get("/customers", getAllCustomers);

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
router.get("/customers/:customerId", getCustomerById);

// Get customer by username
/**
 * @swagger
 * /api/customers/username/{userName}:
 *   get:
 *     summary: Get customer details by username
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *         description: Customer username
 *     responses:
 *       200:
 *         description: Customer details
 */
router.get("/customers/username/:userName", getCustomerByUserName);

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
router.post("/koipackage", createKoiPackage);

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
router.get("/koipackages", getAllKoiPackages);

/**
 * @swagger
 * /api/deleteKoiPackage/{packageId}:
 *   delete:
 *     summary: Delete a Koi Package
 *     tags: [Koi Package]
 *     parameters:
 *       - in: path
 *         name: packageId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Koi Package ID
 *     responses:
 *       200:
 *         description: Koi Package deleted successfully
 */
router.delete("/deleteKoiPackage/:packageId", deleteKoiPackage);

// Koi Consignment routes
/**
 * @swagger
 * /api/koiconsignment:
 *   post:
 *     summary: Create a new Koi Consignment
 *     tags: [Koi Consignment]
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
router.post(
  "/createConsignment",
  authMiddleware,
  koiConsignmentController.createKoiConsignment
);
router.post(
  "/createConsignment",
  authMiddleware,
  koiConsignmentController.createKoiConsignment
);
/**
 * @swagger
 * /api/koiconsignments:
 *   get:
 *     summary: Get all Koi Consignments
 *     tags: [Koi Consignment]
 *     responses:
 *       200:
 *         description: List of all Koi Consignments
 */
router.get("/koiconsignments", getAllKoiConsignments);

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
router.post("/breeders", createBreeder);

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
router.get("/breeders", getAllBreeders);

/**
 * @swagger
 * /api/breeders/{breederId}:
 *   get:
 *     summary: Get Breeder by ID
 *     tags: [Breeders]
 *     parameters:
 *       - in: path
 *         name: breederId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Breeder ID
 *     responses:
 *       200:
 *         description: Breeder details
 */
router.get("/breeders/:breederId", getBreederById);

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
router.post("/varieties", createVariety);

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
router.get("/varieties", getAllVarieties);

router.post("/addKoiPackageVariety", addKoiPackageVariety);

module.exports = router;
