import React from "react";
import Footer from "../../components/footer/Footer";
import AboutUs from "../../components/home/aboutUs/aboutUs";
import FeatureProduct from "../../components/home/featureProduct/FeatureProduct";
import HeroBanner from "../../components/home/heroBanner/HeroBanner";
import Promotions from "../../components/home/promotions/Promotions";
import Testimonials from "../../components/home/testimonials/Testimonials";
import Navigation from "../../components/navigation/Navigation";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <div className="homepage-container">
        <HeroBanner />
        <AboutUs />
        <FeatureProduct />
        <Promotions />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
