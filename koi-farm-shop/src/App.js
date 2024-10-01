import "antd/dist/reset.css";
import React, { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// main layout
import MainLayout from "./pages/MainLayout";

// auth page
const ForgetPassword = lazy(() =>
  import("./components/auth/forget-password/ForgetPassWord")
);
const Login = lazy(() => import("./components/auth/login/Login"));
const Register = lazy(() => import("./components/auth/register/Register"));
const AuthPage = lazy(() => import("./pages/auth/AuthPage"));

//home - about - consignment - contact - blog
const About = lazy(() => import("./pages/about/About"));
const Consignment = lazy(() => import("./pages/consignment/Consignment"));
const ConsignmentForm = lazy(() =>
  import("./pages/consignment/ConsignmentForm")
);
const Blog = lazy(() => import("./pages/blog/Blog"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const HomePage = lazy(() => import("./pages/home/HomePage"));

// koi page
const KoiDetail = lazy(() =>
  import("./components/koiFish/koiDetail/KoiDetail")
);
const KoiListPage = lazy(() =>
  import("./pages/koi-fish/koiList/Koi-List-Page")
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

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loding...</div>}>
        <Routes>
          {/* Routes with MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="koi-list" element={<KoiListPage />} />
            <Route path="koi-details/:id" element={<KoiDetail />} />

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
          </Route>

          {/* Auth Routes without MainLayout */}
          <Route path="/" element={<AuthPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forget-password" element={<ForgetPassword />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
