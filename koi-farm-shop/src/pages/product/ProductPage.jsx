import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navigation from "../../components/navigation/Navigation";
import KoiFeed from "../../components/product/koiFeed/KoiFeed";
import PondAccessories from "../../components/product/pondAccessories/PondAccessories";
import PondFilter from "../../components/product/pondFilter/PondFilter";

const ProductPage = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/product-koi-feed" element={<KoiFeed />} />
        <Route path="/product-pond-filter-system" element={<PondFilter />} />
        <Route path="/product-pond-accessories" element={<PondAccessories />} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default ProductPage;
