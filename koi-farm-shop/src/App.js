import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/about/About";
import Blog from "./components/blog/Blog";
import Footer from "./components/footer/Footer";
import KoiDetails from "./components/koiDetails/KoiDetails";
import KoiList from "./components/koiList/KoiList";
import Navbar from "./components/navbar/Navbar";
import ProductDetails from "./components/productDetails/ProductDetails";
import ProductList from "./components/productList/ProductList";
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
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
