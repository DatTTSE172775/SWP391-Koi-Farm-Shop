const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware auth

// Import Controllers
const userSignUp = require("../controllers/userSignUp");
const userSignIn = require("../controllers/userSignIn");
const logoutUser = require("../controllers/userLogout");
const changePassword = require("../controllers/changePassword");
const forgotPassword = require("../controllers/forgotPassword");
const { updateOrderStatus } = require('../controllers/orderController');
const orderController = require('../controllers/orderController');



const koiConsignmentController = require("../controllers/koiConsignmentController");
const {
  createPayment,
  verifyPayment
} = require('../controllers/paymentController');

const {
  createKoiFish,
  getAllKoiFish,
  getKoiFishById,
  updateKoiFishAvailability,
  deleteKoiFish,
  updateKoiFish,
} = require("../controllers/koiController");

const {
  getAllOrders,
  getOrderById,
  createOrder,
  getAllStaffOrdersByUserId,
  assignOrderToStaff,
  deleteOrder,
  updateOrderToPending,
  updateOrderToProcessing,
  updateOrderToDelivering,
  updateOrderToDelivered,
  updateOrderToCancelled,
  getOrderByCustomerId,
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
  getKoiPackageById,
  updateKoiPackage,
} = require("../controllers/koiPackageController");

const {
  createKoiConsignment,
  getAllKoiConsignments,
  getConsignmentsById,
  // updateConsignmentStatus,
  updateConsignmentToApproved,
  assignConsignmentToStaff,
  getAllStaffConsignmentsByUserId,
  getPendingConsignmentsByUserId,
  getApprovedConsignmentsByUserId
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

const { 
  getDashboardRevenue,
  getOrderStatusStatistics,
  getDailyRevenueThisMonth,
  getPendingConsignments,
  getActiveConsignment,
  getReturningCustomers,
  getDailyOrderCount,
  getPendingOrdersInfo,
  getPendingConsignmentsInfo,
 } = require("../controllers/dashboardController");

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

/**
 * @swagger
 * /api/consignments/user/{userId}:
 *   get:
 *     summary: Get all consignments assigned to Staff
 *     tags: [Consignments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID of the staff member
 *     responses:
 *       200:
 *         description: List of consignments assigned to the staff member
 */
router.get("/consignments/user/:userId", getAllStaffConsignmentsByUserId);

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

router.put("/updateKoi/:koiId", updateKoiFish);

// Order routes
/**
 * @swagger
 * /api/orders/all:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get("/orders/all", getAllOrders);

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
 *               shippingAddress:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [Credit Card, Bank Transfer, Cash on Delivery]
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     KoiID:
 *                       type: integer
 *                       nullable: true
 *                     PackageID:
 *                       type: integer
 *                       nullable: true
 *                     quantity:
 *                       type: integer
 *                       example: 1
 *               trackingNumber:
 *                 type: string
 *                 description: Tracking number provided by the frontend or during order creation
 *               discount:
 *                 type: number
 *                 format: float
 *                 example: 0.0
 *                 description: Optional discount for the order
 *               shippingCost:
 *                 type: number
 *                 format: float
 *                 example: 0.0
 *                 description: Optional shipping cost
 *               promotionID:
 *                 type: integer
 *                 nullable: true
 *                 example: null
 *                 description: Optional promotion ID for the order
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post("/orders", createOrder);

/**
 * @swagger
 * /api/orders/customer/{customerId}:
 *   get:
 *     summary: Get orders by customer ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer ID to retrieve orders for
 *     responses:
 *       200:
 *         description: List of orders for the given customer ID
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
 *       404:
 *         description: No orders found for this customer ID
 *       500:
 *         description: Internal server error
 */
router.get("/customer/:customerId", getOrderByCustomerId);

/**
 * @swagger
 * /api/orders/{orderId}/pending:
 *   patch:
 *     summary: Update order status to Pending
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
 *         description: Order status updated to Pending
 */
router.patch("/orders/:orderId/pending", updateOrderToPending);

/**
 * @swagger
 * /api/orders/{orderId}/processing:
 *   patch:
 *     summary: Update order status to Processing
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
 *         description: Order status updated to Processing
 */
router.patch("/orders/:orderId/processing", updateOrderToProcessing);

/**
 * @swagger
 * /api/orders/{orderId}/delivering:
 *   patch:
 *     summary: Update order status to Delivering
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
 *         description: Order status updated to Delivering
 */
router.patch("/orders/:orderId/delivering", updateOrderToDelivering);

/**
 * @swagger
 * /api/orders/{orderId}/delivered:
 *   patch:
 *     summary: Update order status to Delivered
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
 *         description: Order status updated to Delivered
 */
router.patch("/orders/:orderId/delivered", updateOrderToDelivered);

/**
 * @swagger
 * /api/orders/{orderId}/cancelled:
 *   patch:
 *     summary: Update order status to Cancelled
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
 *         description: Order status updated to Cancelled
 */
router.patch("/orders/:orderId/cancelled", updateOrderToCancelled);

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

router.put("/updateKoiPackage/:packageId", updateKoiPackage);

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

/**
 * @swagger
 * /api/koiconsignment/{id}:
 *   get:
 *     summary: Get Koi Consignment by ID
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Koi Consignment ID
 *     responses:
 *       200:
 *         description: Koi Consignment details
 */
router.get("/koiconsignment/:id", getConsignmentsById);

/**
 * @swagger
 * /api/koiconsignment/{consignmentId}/{status}:
 *   patch:
 *     summary: Update Koi Consignment status
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: consignmentId
 *         schema:
 *           type: integer
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Koi Consignment status updated successfully
 */


// router.patch("/koiconsignment/:consignmentId/:status", updateConsignmentStatus);

router.patch("/koiconsignment/:consignmentId/approved", updateConsignmentToApproved);
      
router.get("/koiconsignment/pending/:userId", getPendingConsignmentsByUserId);

router.get("/koiconsignment/approved/:userId", getApprovedConsignmentsByUserId);

/**
 * @swagger
 * /api/koiconsignment/{consignmentId}/assign:
 *   patch:
 *     summary: Assign consignment to staff
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: consignmentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Consignment ID
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
 *         description: Consignment assigned to staff successfully
 *       404:
 *         description: Consignment not found
 *       500:
 *         description: Failed to assign consignment to staff
 */
router.patch("/koiconsignment/:consignmentId/assign", assignConsignmentToStaff);

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

router.get("/koipackage/:packageId", getKoiPackageById);

/**
 * @swagger
 * /api/payment/create-payment:
 *   post:
 *     summary: Tạo URL thanh toán VNPay
 *     tags: [Payment]
 *     description: API tạo URL thanh toán cho khách hàng qua VNPay
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: number
 *               amount:
 *                 type: number
 *               bankCode:
 *                 type: string
 *               language:
 *                 type: string
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
router.post('/payment/create', createPayment);
router.get('/payment/verify', verifyPayment);

// Dashboard routes
/**
 * @swagger
 * /api/dashboard/revenue:
 *   get:
 *     summary: Get today's, this month's, and this year's revenue
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Revenue data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 revenueToday:
 *                   type: number
 *                   example: 1000000
 *                 revenueThisMonth:
 *                   type: number
 *                   example: 80000000
 *                 revenueThisYear:
 *                   type: number
 *                   example: 500000000
 *       500:
 *         description: Error fetching dashboard revenue
 */
router.get("/dashboard/revenue", getDashboardRevenue);

/**
 * @swagger
 * /api/dashboard/orders/status:
 *   get:
 *     summary: Get order count by status
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Order status counts fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pending:
 *                   type: integer
 *                   example: 10
 *                 shipping:
 *                   type: integer
 *                   example: 5
 *                 completed:
 *                   type: integer
 *                   example: 30
 *                 cancelled:
 *                   type: integer
 *                   example: 2
 *       500:
 *         description: Error fetching order status counts
 */
router.get("/orders/status", getOrderStatusStatistics);

/**
 * @swagger
 * /api/dashboard/revenue/daily:
 *   get:
 *     summary: Get daily revenue data for the current month
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Daily revenue data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 labels:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["2024-10-01", "2024-10-02", "2024-10-03"]
 *                 data:
 *                   type: array
 *                   items:
 *                     type: number
 *                   example: [2000000, 3000000, 2500000]
 *       500:
 *         description: Error fetching daily revenue data
 */
router.get("/revenue/daily", getDailyRevenueThisMonth);

/**
 * @swagger
 * /api/dashboard/consignments/pending/count:
 *   get:
 *     summary: Get the count of new consignment requests
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Number of new consignment requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newConsignments:
 *                   type: integer
 *                   example: 3
 *       500:
 *         description: Server error
 */
router.get('/consignments/pending/count', getPendingConsignments);

/**
 * @swagger
 * /api/dashboard/consignments/active:
 *   get:
 *     summary: Get the count of active consignments by type
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Number of active consignments categorized by type (Care or Sale)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activeConsignments:
 *                   type: integer
 *                   example: 12
 *                 forCare:
 *                   type: integer
 *                   example: 7
 *                 forSale:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Server error
 */
router.get('/consignments/active', getActiveConsignment);

/**
 * @swagger
 * /api/dashboard/customers/returning:
 *   get:
 *     summary: Get the number of returning customers
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Number of returning customers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 returningCustomers:
 *                   type: integer
 *                   example: 25
 *       500:
 *         description: Server error
 */
router.get('/customers/returning', getReturningCustomers);

/**
 * @swagger
 * /api/dashboard/orders/daily:
 *   get:
 *     summary: Get daily order counts for the current month
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Daily order counts fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 labels:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of dates in the current month
 *                   example: ["2024-10-01", "2024-10-02", "2024-10-03"]
 *                 data:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: Number of orders for each date
 *                   example: [5, 7, 4]
 *       500:
 *         description: Server error
 */
router.get('/orders/daily', getDailyOrderCount);


/**
 * @swagger
 * /api/dashboard/orders/pending:
 *   get:
 *     summary: Get full details of pending orders
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Full details of pending orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   OrderID:
 *                     type: integer
 *                     example: 1
 *                   CustomerID:
 *                     type: integer
 *                     example: 7
 *                   FullName:
 *                     type: string
 *                     example: "Nguyễn Thị Tuyết Hương"
 *                   Email:
 *                     type: string
 *                     example: "nguyenthituyethuong10.1@gmail.com"
 *                   OrderDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-15T10:30:00Z"
 *                   TotalAmount:
 *                     type: number
 *                     format: float
 *                     example: 1000000.0
 *                   KoiNames:
 *                     type: string
 *                     example: "Sakura Beauty, Golden Dragon"
 *       500:
 *         description: Server error
 */
router.get('/orders/pending', getPendingOrdersInfo);

/**
 * @swagger
 * /api/dashboard/consignments/pending:
 *   get:
 *     summary: Get the list of pending consignment requests
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: List of pending consignment requests fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   consignmentId:
 *                     type: string
 *                     example: "CON001"
 *                   customerName:
 *                     type: string
 *                     example: "Nguyễn Văn A"
 *                   koiType:
 *                     type: string
 *                     example: "Kohaku"
 *                   status:
 *                     type: string
 *                     example: "Chờ xử lý"
 *                   fullName:
 *                     type: string
 *                     example: "Nguyễn Văn A"
 *                   email:
 *                     type: string
 *                     example: "example@example.com"
 *                   phoneNumber:
 *                     type: string
 *                     example: "0123456789"
 *                   address:
 *                     type: string
 *                     example: "123 Lê Lợi, Quận 1, TP.HCM"
 *       500:
 *         description: Server error
 */
router.get('/consignments/pending', getPendingConsignmentsInfo);

module.exports = router;
