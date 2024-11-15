import React from "react";
import "./KoiFeed.scss";

import food1 from "../../../assets/koiFood/food-aquamasterColorEnhancer.jpg";
import food2 from "../../../assets/koiFood/food-aquamasterGrowth.jpg";
import food3 from "../../../assets/koiFood/food-aquamasterHiGrowth.jpg";
import food4 from "../../../assets/koiFood/food-aquamasterStaple.jpg";
import food5 from "../../../assets/koiFood/food-hikariColorEnhancer.jpg";
import food6 from "../../../assets/koiFood/food-JPDShogun.jpg";
import food7 from "../../../assets/koiFood/food-sakuraHighGrowth.jpg";
import food8 from "../../../assets/koiFood/food-sakuraHighGrowth&Color.jpg";

const koiFoodSampleList = [
  {
    id: 1,
    name: "Aquamaster Color Enhancer",
    image: food1,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Aqua Master",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 2,
    name: "Aquamaster Growth",
    image: food2,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Aqua Master",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 3,
    name: "Aquamaster Hi-Growth",
    image: food3,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Aqua Master",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 4,
    name: "Aquamaster Staple",
    image: food4,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Aqua Master",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 5,
    name: "Hikari Color Enhancer",
    image: food5,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Hikari",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 6,
    name: "JPD Shogun",
    image: food6,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Shogun JPD",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 7,
    name: "Sakura High Growth",
    image: food7,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Sakura",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 8,
    name: "Sakura High Growth & Color",
    image: food8,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Sakura",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
];

const KoiFeedHeader = () => (
  <div className="koi-feed-header">
    <h1>Thức Ăn Cho Cá Koi</h1>
    <p>Cung cấp cho cá Koi của bạn những dưỡng chất cần thiết để phát triển tốt với thức ăn được điều chế đặc biệt của chúng tôi. Được thiết kế để tăng cường sức khỏe tối ưu, màu sắc rực rỡ và sự phát triển mạnh mẽ.</p>
  </div>
);

const KoiFeed = () => {
  return (
    <div className="koi-feed-container">
      <KoiFeedHeader/>
      <div className="koi-feed-grid">
        {koiFoodSampleList.map((koi) => (
          <div key={koi.id} className="koi-card">
            <div className="koi-image-container">
              <img src={koi.image} alt={koi.name} className="koi-image" />
            </div>
            <div className="koi-info">
              <h3>{koi.name}</h3>
              <p><strong>Seller:</strong> {koi.seller}</p>
              <p><strong>Origin:</strong> {koi.origin}</p>
              <p><strong>Brand:</strong> {koi.brand}</p>
              <p><strong>Weight:</strong> {koi.Weight}</p>
              <p className="koi-price"><strong>Price:</strong> {koi.price}</p>
              <button className="buy-button">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KoiFeed;
