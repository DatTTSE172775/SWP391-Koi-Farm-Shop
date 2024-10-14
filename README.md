# SWP391-Koi-Farm-Shop
Project SWP391 - Topic 1: Koi-Farm-Shop

// Users Routes
router.route('/users')
    .post(createUserController);

router.route('/users/:userId')
    .get(getUserByIdController);

// Customers Routes
router.route('/customers')
    .post(createCustomerController);

router.route('/customers/:customerId')
    .get(getCustomerByIdController);

// KoiFish Routes
router.route('/koifish')
    .post(createKoiFishController);

router.route('/koifish/:koiId')
    .get(getKoiFishByIdController);
