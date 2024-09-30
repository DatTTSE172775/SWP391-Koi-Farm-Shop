import React from "react";
import "./KoiFeed.scss";

import koiImg1 from "../../../assets/koi-list/koiImg1.jpg";
import koiImg2 from "../../../assets/koi-list/koiImg2.jpg";
import koiImg3 from "../../../assets/koi-list/koiImg3.jpg";
import koiImg4 from "../../../assets/koi-list/koiImg4.jpg";
import koiImg5 from "../../../assets/koi-list/koiImg5.jpg";
import koiImg6 from "../../../assets/koi-list/koiImg6.jpg";
import koiImg7 from "../../../assets/koi-list/koiImg7.jpg";
import koiImg8 from "../../../assets/koi-list/koiImg8.jpg";

const koiFoodSampleList = [
  {
    id: 1,
    name: "Kohaku Koi",
    image: koiImg1,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Cám thương hiệu đâu đó",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 2,
    name: "Showa Koi",
    image: koiImg2,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Cám thương hiệu đâu đó",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 3,
    name: "Showa Koi",
    image: koiImg3,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Cám thương hiệu đâu đó",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 4,
    name: "Showa Koi",
    image: koiImg4,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Cám thương hiệu đâu đó",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 5,
    name: "Kohaku Koi",
    image: koiImg5,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Cám thương hiệu đâu đó",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 6,
    name: "Showa Koi",
    image: koiImg6,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Cám thương hiệu đâu đó",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 7,
    name: "Showa Koi",
    image: koiImg7,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Cám thương hiệu đâu đó",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
  {
    id: 8,
    name: "Showa Koi",
    image: koiImg8,
    seller: "Đỏ & Trắng",
    origin: "Japan",
    brand: "Cám thương hiệu đâu đó",
    Weight: "3kg",
    price: "2.000.000 VND",
  },
];


const KoiFeed = () => {
  return (
    <div className="koi-feed-container">
      <h1 className="koi-feed-title">Koi Feed Products</h1>
      
      <div className="guide">
        <h2>Guide to Koi Feeding</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In expedita temporibus labore non rem recusandae ipsam, dignissimos perferendis debitis repellendus voluptatibus, voluptas facere illo totam laboriosam suscipit vel quasi officiis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus voluptas laudantium recusandae fuga saepe, rem quod aliquam possimus nostrum, mollitia tempora omnis consequuntur vero officia quis nam sint provident dolor.</p>
      </div>

      <div className="koi-feed-grid">
        {koiFoodSampleList.map((koi) => (
          <div key={koi.id} className="koi-card">
            <div className="koi-image-container">
              <img src={koi.image} alt={koi.name} className="koi-image" />
              <button className="view-detail-button">View detail</button>
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
