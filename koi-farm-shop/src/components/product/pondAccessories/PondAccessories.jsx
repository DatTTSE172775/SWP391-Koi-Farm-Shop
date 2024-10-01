import React from "react";
import "./PondAccessories.scss";

import koiImg1 from "../../../assets/koi-list/koiImg1.jpg";
import koiImg2 from "../../../assets/koi-list/koiImg2.jpg";
import koiImg3 from "../../../assets/koi-list/koiImg3.jpg";

const PondAccessoriesSampleList = [
  {
    id: 1,
    name: "Máy bơm",
    image: koiImg1,
    origin: "China",
    brand: "somewhere",
    price: "2.000.000 VND",
  },
  {
    id: 2,
    name: "Chổi lọc hồ",
    image: koiImg2,
    origin: "Vietnam",
    brand: "somewhere",
    price: "2.000.000 VND",
  },
  {
    id: 3,
    name: "bom",
    image: koiImg3,
    origin: "America",
    brand: "somewhere",
    price: "2.000.000 VND",
  },
];

const PondAccessories = () => {
  return (
    <div className="pond-accessories-container">
      <h1 className="pond-accessories-title">Pond Accessories</h1>
      
      <div className="guide">
        <h2>Guide to Pond Accessories</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pond accessories are essential for maintaining a healthy and beautiful koi pond environment. From filtration systems to decorative elements, these products help create the perfect habitat for your koi fish.</p>
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
