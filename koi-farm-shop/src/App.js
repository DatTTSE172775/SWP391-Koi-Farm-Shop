import "antd/dist/reset.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ForgetPassword from "./components/auth/forget-password/ForgetPassWord";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import AboutPage from "./pages/about/AboutPage";
import Consignment from "./pages/consignment/Consignment";
import ConsignmentForm from "./pages/consignment/ConsignmentForm";
import Contact from "./pages/contact/Contact";
import HomePage from "./pages/home/HomePage";
import KoiListPage from "./pages/koi-fish/koiList/Koi-List-Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/consign" element={<Consignment />} />
        <Route path="/consign-form" element={<ConsignmentForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/koi-list" element={<KoiListPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
