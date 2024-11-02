import "antd/dist/reset.css";
import React, { lazy, Suspense, useEffect } from "react";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { initializeAuth } from "./store/actions/authActions";

import Loading from "./components/loading/Loading";
import CartProvider from "./components/order/cart-context/CartContext";
// main layout
import ChangePassword from "./pages/account/change-password/ChangePassword";
// import AddKoi from "./pages/admin/addProduct/AddKoi";
// import AddPackage from "./pages/admin/addProduct/AddPackage";
// import DeleteKoi from "./pages/admin/deleteProduct/deleteKoi";
// import DeleteKoiPackage from "./pages/admin/deleteProduct/deleteKoiPackage";
// import OrderDetails from "./pages/admin/order-details/OrderDetails";
// import OrdersManagement from "./pages/admin/orderManagement/OrdersManagement";
// import UpdateKoi from "./pages/admin/updateProduct/updateKoi";
// import WelcomeAdmin from "./pages/admin/welcome/WelcomeAdmin";
import MainLayout from "./pages/MainLayout";
import NotFound from "./pages/notfound/NotFound";
import staffRoutes from "./routes/StaffRoutes";
// import PendingConsignments from "./pages/staff/consignment-manage/processing/ProcessingConsignment";
// import InCareConsignments from "./pages/staff/consignment-manage/completed/CompletedConsignment";
// import ManagerConsignmentPage from "./pages/admin/consign/AdminConsignment";
import adminRoutes from "./routes/AdminRoutes";


// auth page
const ForgetPassword = lazy(() =>
    import("./components/auth/forget-password/ForgetPassWord")
);
const Login = lazy(() => import("./components/auth/login/Login"));
const Register = lazy(() => import("./components/auth/register/Register"));
const AuthPage = lazy(() => import("./pages/auth/AuthPage"));

//home - about - consignment - contact - blog - guide
const About = lazy(() => import("./pages/about/About"));
const Consignment = lazy(() => import("./pages/consignment/Consignment"));
const ConsignmentForm = lazy(() =>
    import("./pages/consignment/ConsignmentForm")

);
const ConsignmentDetail = lazy(() => import("./pages/admin/consignment-details/consignmentDetails"));

const Blog = lazy(() => import("./pages/blog/Blog"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const Guide = lazy(() => import("./pages/guide/guide"));

// koi page
const KoiPackage = lazy(() => import("./pages/koi-fish/KoiPackage/KoiPackage"));
const KoiDetail = lazy(() =>
    import("./components/koiFish/koiDetail/KoiDetail")
);
const KoiListPage = lazy(() =>
    import("./pages/koi-fish/koiList/Koi-List-Page")
);
const KoiBreeders = lazy(() =>
    import("./pages/koi-fish/koi-breeders/KoiBreeders")
);
const HighQualityKoi = lazy(() =>
    import("./components/koiFish/high-quality-koi/HighQualityKoi")
);
const KoiCollection = lazy(() =>
    import("./components/koiFish/koi-collection/KoiCollection")
);
// product page
const KoiFeed = lazy(() => import("./components/product/koiFeed/KoiFeed"));
const PondAccessories = lazy(() =>
    import("./components/product/pondAccessories/PondAccessories")
);
const PondFilter = lazy(() =>
    import("./components/product/pondFilter/PondFilter")
);
const ProductPage = lazy(() => import("./pages/product/ProductPage"));

// order page
const Checkout = lazy(() => import("./components/order/checkout/Checkout"));
const OrderSuccess = lazy(() =>
    import("./pages/order/orderSuccess/OrderSuccess")
);
const PaymentResult = lazy(() =>
    import("./components/order/payment/PaymentResult")
);
const Cart = lazy(() => import("./pages/order/cart/CartPage"));

// customer page
const WelcomeAccount = lazy(() =>
    import("./pages/account/welcome/WelcomeAccount")
);



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
    return (
        <CartProvider>
            <Router>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {/* Routes with MainLayout */}
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Navigate to="/home" replace />} />
                            <Route path="home" element={<HomePage />} />
                            <Route path="about" element={<About />} />
                            <Route path="guide" element={<Guide />} />
                            <Route path="change-password" element={<ChangePassword />} />

                            {/* Koi Routes */}
                            <Route path="koi-list" element={<KoiListPage />} />
                            <Route path="koiDetail/:id" element={<KoiDetail />} />
                            <Route path="koi-breeders" element={<KoiBreeders />} />
                            <Route path="koi-package" element={<KoiPackage />} />
                            <Route path="koi-high-quality" element={<HighQualityKoi />} />
                            <Route path="koi-collection" element={<KoiCollection />} />

                            {/* Product Routes */}
                            <Route path="product" element={<ProductPage />}>
                                <Route index element={<Navigate to="koi-feed" replace />} />
                                <Route path="koi-feed" element={<KoiFeed />} />
                                <Route path="pond-filter-system" element={<PondFilter />} />
                                <Route path="pond-accessories" element={<PondAccessories />} />
                            </Route>

                            <Route path="blog" element={<Blog />} />
                            <Route path="consign" element={<Consignment />} />
                            <Route path="consign-form" element={<ConsignmentForm />} />
                            <Route path="contact" element={<Contact />} />

                            {/* Order Routes */}
                            <Route path="cart" element={<Cart />} />
                            <Route path="checkout" element={<Checkout />} />
                            <Route path="payment-result" element={<PaymentResult />} />
                            <Route path="order-success" element={<OrderSuccess />} />
                        </Route>

                        {/* Auth Routes without MainLayout */}
                        <Route path="/" element={<AuthPage />}>
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="forget-password" element={<ForgetPassword />} />
                        </Route>

                        {/* Admin Routes */}
                        {adminRoutes}


                        {/* Staff Routes */}
                        {staffRoutes}

                        {/* <Route path="/staff/consignments/pending" element={<PendingConsignments />} />
            <Route path="/staff/consignments/in-care" element={<InCareConsignments />} /> */}

                        {/* Customer Routes */}
                        <Route path="/account" element={<WelcomeAccount />} />

                        {/* Fallback Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </Router>
        </CartProvider>
    );
}

export default App;