import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/about/About";
import ForgetPassword from "./components/auth/forget-password/ForgetPassWord";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import HomePage from "./pages/home/HomePage";
import BlogDetails from "./components/blog/blogdetails/BlogDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<BlogDetails />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
