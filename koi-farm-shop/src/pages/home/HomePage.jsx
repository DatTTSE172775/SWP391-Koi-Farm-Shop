import React from "react";
import Footer from "../../components/footer/Footer";
import HeroBanner from "../../components/home/heroBanner/HeroBanner";
import Navigation from "../../components/navigation/Navigation";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <div className="homepage-container">
        <HeroBanner />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
