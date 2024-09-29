import React from "react";
import Footer from "../../components/footer/Footer";
import AboutUs from "../../components/home/aboutUs/aboutUs";
import HeroBanner from "../../components/home/heroBanner/HeroBanner";
import Navigation from "../../components/navigation/Navigation";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <div className="homepage-container">
        <HeroBanner />
        <AboutUs />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
