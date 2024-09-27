import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/about/About";
import CustomerAccount from "./components/account/CustomerAccount";
import ForgetPassword from "./components/auth/ForgetPassWord";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Blog from "./components/blog/Blog";
import BlogDetails from "./components/blogdetails/BlogDetails";
import Cart from "./components/cart/Cart";
import Consignment from "./components/consignment/Consignment";
import ConsignmentForm from "./components/consignment/ConsignmentForm";
import Footer from "./components/footer/Footer";
import KoiDetails from "./components/koiDetails/KoiDetails";
import KoiList from "./components/koiList/KoiList";
import Navbar from "./components/navbar/Navbar";
import CheckOrder from "./components/order/CheckOrder";
import OrderSuccess from "./components/order/OrderSuccess";
import PaymentConfirm from "./components/payment/PaymentConfirm";
import ProductDetails from "./components/productDetails/ProductDetails";
import ProductList from "./components/productList/ProductList";
import SettingCustomer from "./components/settingAccount/SettingCustomer";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/koi-list" element={<KoiList />} />
        <Route path="/koi-details/:id" element={<KoiDetails />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/consignment" element={<Consignment />} />
        <Route path="/consignment-form" element={<ConsignmentForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-confirm" element={<PaymentConfirm />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/check-order" element={<CheckOrder />} />
        <Route path="/account" element={<CustomerAccount />} />
        <Route path="/settings" element={<SettingCustomer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
