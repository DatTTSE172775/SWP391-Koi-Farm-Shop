import "antd/dist/reset.css";
import React, { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Loading from "./components/loading/Loading";
import CartProvider from "./components/order/cart-context/CartContext";
// main layout
import MainLayout from "./pages/MainLayout";
import NotFound from "./pages/notfound/NotFound";

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
const Blog = lazy(() => import("./pages/blog/Blog"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const Guide = lazy(() => import("./pages/guide/guide"));

// koi page
const KoiDetail = lazy(() =>
  import("./components/koiFish/koiDetail/KoiDetail")
);
const KoiListPage = lazy(() =>
  import("./pages/koi-fish/koiList/Koi-List-Page")
);
const KoiBreeders = lazy(() =>
  import("./pages/koi-fish/koi-breeders/KoiBreeders")
);
const KoiPackage = lazy(() => import("./pages/koi-fish/KoiPackage/KoiPackage"));

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
const Cart = lazy(() => import("./pages/order/cart/CartPage"));

// staff page
const WelcomeStaff = lazy(() => import("./pages/staff/layout/WelcomeStaff"));
const StaffOrderManage = lazy(() =>
  import("./pages/staff/order-manage/StaffOrderManage")
);

//admin page
const WelcomeAdmin = lazy(() => import("./pages/admin/welcome/WelcomeAdmin"));
const OrderDetails = lazy(() =>
  import("./pages/admin/order-details/OrderDetails")
);
const OrdersManagement = lazy(() =>
  import("./pages/admin/orderManagement/OrdersManagement")
);
const ManagerConsignmentPage = lazy(() =>
  import("./pages/admin/consign/AdminConsignment")
);

function App() {
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

              {/* Koi Routes */}
              <Route path="koi-list" element={<KoiListPage />} />
              <Route path="koi-details/:id" element={<KoiDetail />} />
              <Route path="koi-breeders" element={<KoiBreeders />} />
              <Route path="koi-package" element={<KoiPackage />} />

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
              <Route path="order-success" element={<OrderSuccess />} />
            </Route>

            {/* Auth Routes without MainLayout */}
            <Route path="/" element={<AuthPage />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<WelcomeAdmin />} />
            <Route path="/admin/manage-orders" element={<OrdersManagement />} />
            <Route
              path="/admin/manage-orders/:orderId"
              element={<OrderDetails />}
            />
            <Route
              path="/admin/manage-consign"
              element={<ManagerConsignmentPage />}
            />

            {/* Staff Routes */}
            <Route path="/staff" element={<WelcomeStaff />} />
            <Route path="/staff/orders" element={<StaffOrderManage />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;
