import React from "react";
import "./HeroSection.scss";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <img src="banner-koi-fish.png" alt="Koi Farm" className="hero-image" />
      <div className="hero-content">
        <h1>Welcome to Koi Farm Shop</h1>
        <p>Your one-stop shop for all things Koi</p>
        <button className="cta-button">Shop Now</button>
      </div>
    </div>
  );
};

export default HeroSection;
