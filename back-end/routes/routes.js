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
  createKoiFishFromConsignment,
  updateConsignmentKoiId
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
  deleteConsignmentById,
  updateConsignmentToApproved,
  updateConsignmentToRejected,
  updateConsignmentToPending,
  assignConsignmentToStaff,
  getAllStaffConsignmentsByUserId,
  getPendingConsignmentsByUserId,
  getApprovedConsignmentsByUserId,
  getRejectedConsignmentsByUserId,
  updateConsignmentToSold,
  updateConsignmentToSale,
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
 * /api/addKoiFish:
 *   post:
 *     summary: Create a new Koi Fish
 *     tags: [Koi Fish]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - varietyId
 *               - origin
 *               - breederId
 *               - gender
 *               - born
 *               - size
 *               - price
 *               - weight
 *               - personality
 *               - feedingAmountPerDay
 *               - healthStatus
 *               - screeningRate
 *               - imageFile
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the Koi fish
 *                 example: "Kohaku Champion"
 *               varietyId:
 *                 type: integer
 *                 description: ID of the Koi variety
 *                 example: 1
 *               origin:
 *                 type: string
 *                 description: Origin country of the Koi
 *                 example: "Japan"
 *               breederId:
 *                 type: integer
 *                 description: ID of the breeder
 *                 example: 1
 *               gender:
 *                 type: string
 *                 description: Gender of the Koi
 *                 enum: [Male, Female, Unknown]
 *                 example: "Male"
 *               born:
 *                 type: integer
 *                 description: Birth year of the Koi
 *                 example: 2022
 *               size:
 *                 type: number
 *                 format: float
 *                 description: Size of the Koi in centimeters
 *                 example: 45.5
 *               price:
 *                 type: number
 *                 format: decimal
 *                 description: Price of the Koi
 *                 example: 1999.99
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: Weight of the Koi in grams
 *                 example: 2500
 *               personality:
 *                 type: string
 *                 description: Personality traits of the Koi
 *                 example: "Friendly and active"
 *               feedingAmountPerDay:
 *                 type: number
 *                 format: float
 *                 description: Daily feeding amount in grams
 *                 example: 50
 *               healthStatus:
 *                 type: string
 *                 description: Health condition of the Koi
 *                 example: "Healthy"
 *               screeningRate:
 *                 type: number
 *                 format: float
 *                 description: Screening rate score
 *                 example: 9.5
 *               availability:
 *                 type: string
 *                 description: Availability status
 *                 enum: [Available, Sold Out]
 *                 default: Available
 *               imageFile:
 *                 type: string
 *                 format: binary
 *                 description: Image file of the Koi
 *               certificateLink:
 *                 type: string
 *                 format: binary
 *                 description: Certificate file for the Koi
 *     responses:
 *       201:
 *         description: Koi Fish created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Fish created successfully!
 *                 data:
 *                   type: object
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing required fields
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating Koi Fish
 *                 error:
 *                   type: string
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

/**
 * @swagger
 * /api/updateKoi/{koiId}:
 *   put:
 *     summary: Update a Koi Fish
 *     tags: [Koi Fish]
 *     parameters:
 *       - in: path
 *         name: koiId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Koi fish to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - Gender
 *               - Origin
 *               - Born
 *               - Size
 *               - Price
 *               - HealthStatus
 *               - Availability
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Name of the Koi fish
 *                 example: "Kohaku Champion"
 *               Gender:
 *                 type: string
 *                 description: Gender of the Koi fish
 *                 enum: [Male, Female, Unknown]
 *                 example: "Male"
 *               Origin:
 *                 type: string
 *                 description: Origin of the Koi fish
 *                 example: "Japan"
 *               Born:
 *                 type: integer
 *                 description: Birth year of the Koi fish
 *                 example: 2022
 *               Size:
 *                 type: number
 *                 format: float
 *                 description: Size of the Koi fish in centimeters
 *                 example: 45.5
 *               Price:
 *                 type: number
 *                 format: decimal
 *                 description: Price of the Koi fish
 *                 example: 1999.99
 *               HealthStatus:
 *                 type: string
 *                 description: Health status of the Koi fish
 *                 example: "Healthy"
 *               Availability:
 *                 type: string
 *                 description: Availability status of the Koi fish
 *                 enum: [Available, Sold Out]
 *                 example: "Available"
 *     responses:
 *       200:
 *         description: Koi Fish updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Fish updated successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     Name:
 *                       type: string
 *                     Gender:
 *                       type: string
 *                     Origin:
 *                       type: string
 *                     Born:
 *                       type: integer
 *                     Size:
 *                       type: number
 *                     Price:
 *                       type: number
 *                     HealthStatus:
 *                       type: string
 *                     Availability:
 *                       type: string
 *       404:
 *         description: Koi Fish not found or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Fish not found or no changes made.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating Koi Fish
 *                 error:
 *                   type: string
 */
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
 *               totalAmount:
 *                 type: number
 *                 format: float
 *                 example: 150000.0
 *                 description: Total amount for the order, calculated on the frontend
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
 *         description: Không đủ số lượng tồn kho
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Không đủ số lượng tồn kho cho Package với ID 2.
 *       404:
 *         description: Sản phẩm không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Fish với ID 1 không tồn tại.
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - KoiID
 *               - PackageName
 *               - Price
 *               - PackageSize
 *               - Availability
 *               - ImageFile
 *             properties:
 *               KoiID:
 *                 type: integer
 *                 description: ID of the Koi fish to include in the package
 *                 example: 1
 *               PackageName:
 *                 type: string
 *                 description: Name of the Koi Package
 *                 example: "Premium Koi Collection"
 *               Price:
 *                 type: number
 *                 format: decimal
 *                 description: Price of the package
 *                 example: 999.99
 *               PackageSize:
 *                 type: integer
 *                 description: Number of Koi fish in the package
 *                 example: 3
 *               Availability:
 *                 type: string
 *                 description: Availability status of the package
 *                 enum: [Available, Sold Out]
 *                 example: "Available"
 *               ImageFile:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the package
 *     responses:
 *       201:
 *         description: Koi Package created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Package created successfully!
 *                 PackageID:
 *                   type: integer
 *                   description: ID of the created package
 *                   example: 1
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing required fields
 *                 receivedData:
 *                   type: object
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating Koi Package
 *                 error:
 *                   type: string
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

/**
 * @swagger
 * /api/updateKoiPackage/{packageId}:
 *   put:
 *     summary: Update a Koi Package
 *     tags: [Koi Package]
 *     parameters:
 *       - in: path
 *         name: packageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Koi Package to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - PackageName
 *               - PackageSize
 *               - Price
 *               - Availability
 *             properties:
 *               PackageName:
 *                 type: string
 *                 description: Name of the Koi Package
 *                 example: "Premium Koi Collection"
 *               PackageSize:
 *                 type: integer
 *                 description: Size of the package (number of koi)
 *                 example: 3
 *               Price:
 *                 type: number
 *                 format: decimal
 *                 description: Price of the package
 *                 example: 999.99
 *               Availability:
 *                 type: string
 *                 description: Availability status of the package
 *                 enum: [Available, Sold Out]
 *                 example: "Available"
 *     responses:
 *       200:
 *         description: Koi Package updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Package updated successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     PackageName:
 *                       type: string
 *                     PackageSize:
 *                       type: integer
 *                     Price:
 *                       type: number
 *                     Availability:
 *                       type: string
 *       404:
 *         description: Koi Package not found or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Package not found or no changes made.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating Koi Package
 *                 error:
 *                   type: string
 */
router.put("/updateKoiPackage/:packageId", updateKoiPackage);

// Koi Consignment routes
/**
 * @swagger
 * /api/createConsignment:
 *   post:
 *     summary: Create a new koi consignment
 *     tags: [Consignments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - consignmentType
 *               - consignmentMode
 *               - priceAgreed
 *               - koiType
 *               - koiColor
 *               - koiAge
 *               - koiSize
 *             properties:
 *               consignmentType:
 *                 type: string
 *                 description: Type of the consignment
 *                 example: "Regular"
 *               consignmentMode:
 *                 type: string
 *                 description: Mode of the consignment
 *                 example: "Direct"
 *               priceAgreed:
 *                 type: number
 *                 format: decimal
 *                 description: Agreed price for the consignment
 *                 example: 1000.00
 *               notes:
 *                 type: string
 *                 description: Additional notes about the consignment
 *                 example: "Healthy koi fish in good condition"
 *               koiType:
 *                 type: string
 *                 description: Type/variety of the koi
 *                 example: "Kohaku"
 *               koiColor:
 *                 type: string
 *                 description: Color pattern of the koi
 *                 example: "Red and White"
 *               koiAge:
 *                 type: string
 *                 description: Age of the koi
 *                 example: "2 years"
 *               koiSize:
 *                 type: string
 *                 description: Size of the koi
 *                 example: "35cm"
 *               imageFile:
 *                 type: string
 *                 format: binary
 *                 description: Image of the koi fish
 *     responses:
 *       201:
 *         description: Consignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Koi Consignment created successfully"
 *                 result:
 *                   type: object
 *                   properties:
 *                     rowsAffected:
 *                       type: array
 *                       items:
 *                         type: number
 *                       example: [1]
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User ID not found in the request. Make sure you are authenticated."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating Koi Consignment"
 *                 error:
 *                   type: string
 *                   example: "Internal server error details"
 */
router.post("/createConsignment",authMiddleware,createKoiConsignment);

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

/**
 * @swagger
 * /api/koiconsignment/{consignmentId}:
 *   delete:
 *     summary: Delete a koi consignment by ID
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: consignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the consignment to delete
 *     responses:
 *       200:
 *         description: Consignment successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Consignment deleted successfully
 *                 data:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Consignment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Consignment not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting Koi Consignment
 *                 error:
 *                   type: string
 */
router.delete("/koiconsignment/:consignmentId", deleteConsignmentById);

/**
 * @swagger
 * /api/koiconsignment/{consignmentId}/pending:
 *   patch:
 *     summary: Update consignment status to Pending
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: consignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the consignment
 *     responses:
 *       200:
 *         description: Consignment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Consignment status updated to Pending
 *                 consignment:
 *                   type: object
 *       404:
 *         description: Consignment not found
 *       500:
 *         description: Failed to update consignment status
 */
router.patch("/koiconsignment/:consignmentId/pending", updateConsignmentToPending);

/**
 * @swagger
 * /api/koiconsignment/{consignmentId}/approved:
 *   patch:
 *     summary: Update consignment status to Approved
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: consignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the consignment
 *     responses:
 *       200:
 *         description: Consignment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Consignment status updated to Approved
 *                 consignment:
 *                   type: object
 *       404:
 *         description: Consignment not found
 *       500:
 *         description: Failed to update consignment status
 */
router.patch("/koiconsignment/:consignmentId/approved", updateConsignmentToApproved);

/**
 * @swagger
 * /api/koiconsignment/{consignmentId}/rejected:
 *   patch:
 *     summary: Update consignment status to Rejected
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: consignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the consignment
 *     responses:
 *       200:
 *         description: Consignment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Consignment status updated to Rejected
 *                 consignment:
 *                   type: object
 *       404:
 *         description: Consignment not found
 *       500:
 *         description: Failed to update consignment status
 */
router.patch("/koiconsignment/:consignmentId/rejected", updateConsignmentToRejected);

/**
 * @swagger
 * /api/koiconsignment/pending/{userId}:
 *   get:
 *     summary: Get all pending consignments for a specific user
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of pending consignments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error fetching pending consignments
 */
router.get("/koiconsignment/pending/:userId", getPendingConsignmentsByUserId);

/**
 * @swagger
 * /api/koiconsignment/approved/{userId}:
 *   get:
 *     summary: Get all approved consignments for a specific user
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of approved consignments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error fetching approved consignments
 */
router.get("/koiconsignment/approved/:userId", getApprovedConsignmentsByUserId);

/**
 * @swagger
 * /api/koiconsignment/rejected/{userId}:
 *   get:
 *     summary: Get all rejected consignments for a specific user
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of rejected consignments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error fetching rejected consignments
 */
router.get("/koiconsignment/rejected/:userId", getRejectedConsignmentsByUserId);

/**
 * @swagger
 * /api/koiconsignment/{KoiID}/sold:
 *   patch:
 *     summary: Update consignment status to Sold
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: KoiID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Koi fish
 *     responses:
 *       200:
 *         description: Consignment status updated to Sold successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Consignment status updated to Sold
 *                 koiId:
 *                   type: integer
 *       404:
 *         description: Consignment not found
 *       500:
 *         description: Error updating consignment status
 */
router.patch("/koiconsignment/:KoiID/sold", updateConsignmentToSold);

/**
 * @swagger
 * /api/koiconsignment/{consignmentId}/sale:
 *   patch:
 *     summary: Update consignment status to Listed for Sale
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: consignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the consignment
 *     responses:
 *       200:
 *         description: Consignment status updated to Sale successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Consignment status updated to Sale
 *       500:
 *         description: Error updating consignment status
 */
router.patch("/koiconsignment/:consignmentId/sale", updateConsignmentToSale);

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

/**
 * @swagger
 * /api/from-consignment:
 *   post:
 *     summary: Create a new Koi Fish from consignment data
 *     tags: [Koi Fish]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - KoiType
 *               - KoiAge
 *               - KoiSize
 *               - PriceAgreed
 *             properties:
 *               KoiType:
 *                 type: integer
 *                 description: The variety ID of the Koi fish
 *               KoiAge:
 *                 type: integer
 *                 description: Age of the Koi fish in years
 *               KoiSize:
 *                 type: integer
 *                 description: Size of the Koi fish in centimeters
 *               PriceAgreed:
 *                 type: number
 *                 format: float
 *                 description: Agreed price for the Koi fish
 *               InspectionResult:
 *                 type: string
 *                 description: Result of the Koi fish inspection
 *               ImagePath:
 *                 type: string
 *                 description: Path to the Koi fish image
 *               imageFile:
 *                 type: string
 *                 format: binary
 *                 description: Image file of the Koi fish
 *     responses:
 *       201:
 *         description: Koi Fish created successfully from consignment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Koi Fish created successfully from consignment!
 *                 koiId:
 *                   type: integer
 *                   description: ID of the created Koi fish
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating Koi Fish from consignment
 *                 error:
 *                   type: string
 */
router.post('/from-consignment', createKoiFishFromConsignment);

/**
 * @swagger
 * /api/koiconsignment/{consignmentId}:
 *   patch:
 *     summary: Update KoiID in a consignment
 *     tags: [Koi Consignment]
 *     parameters:
 *       - in: path
 *         name: consignmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the consignment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - koiId
 *             properties:
 *               koiId:
 *                 type: integer
 *                 description: ID of the Koi fish to associate with the consignment
 *     responses:
 *       200:
 *         description: KoiID updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: KoiID updated in KoiConsignment successfully.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating KoiID in KoiConsignment
 */
router.patch('/koiconsignment/:consignmentId', updateConsignmentKoiId);

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
