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
      
      <div className="guide">
        <h2>Phụ kiện hồ cá</h2>
        <p>Biến ao của bạn thành một ốc đảo tươi tốt, xinh đẹp với nhiều loại phụ kiện ao của 
          chúng tôi. Được thiết kế để cải thiện cả tính thẩm mỹ và chức năng tổng thể của ao,
           các phụ kiện của chúng tôi giúp tạo ra môi trường hoàn hảo cho cá, cây trồng và các 
           đặc điểm nước của bạn.</p>
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
