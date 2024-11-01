import React from "react";
import "./PondAccessories.scss";

import accessorie1 from "../../../assets/pondAccessories/fishCage.png";
import accessorie2 from "../../../assets/pondAccessories/fishFeeder.png";
import accessorie3 from "../../../assets/pondAccessories/fishRacket.png";


const PondAccessoriesSampleList = [
  {
    id: 1,
    name: "Lồng ngăn cách cá",
    image: accessorie1,
    origin: "Vietnam",
    brand: "somewhere",
    price: "50.000 VND",
  },
  {
    id: 2,
    name: "Máy cho cá ăn tự động",
    image: accessorie2,
    origin: "Japan",
    brand: "somewhere",
    price: "2.000.000 VND",
  },
  {
    id: 3,
    name: "Lưới vớt cá",
    image: accessorie3,
    origin: "Vietnam",
    brand: "somewhere",
    price: "20.000 VND",
  },
];

const PondAccessories = () => {
  return (
    <div className="pond-accessories-container">
      <h1 className="pond-accessories-title">Pond Accessories</h1>
      
      <div className="guide">
        <h2>Guide to Pond Accessories</h2>
        <p>Transform your pond into a thriving, beautiful oasis with our wide selection of pond accessories. Designed to improve both the aesthetic appeal and overall functionality of your pond, our accessories help create the perfect environment for your fish, plants, and water features.</p>
      </div>

      <div className="pond-accessories-grid">
        {PondAccessoriesSampleList.map((accessory) => (
          <div key={accessory.id} className="accessory-card">
            <div className="accessory-image-container">
              <img src={accessory.image} alt={accessory.name} className="accessory-image" />
              <button className="view-detail-button">View detail</button>
            </div>
            <div className="accessory-info">
              <h3>{accessory.name}</h3>
              <p><strong>Origin:</strong> {accessory.origin}</p>
              <p><strong>Brand:</strong> {accessory.brand}</p>
              <p className="accessory-price"><strong>Price:</strong> {accessory.price}</p>
              <button className="buy-button">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PondAccessories;
