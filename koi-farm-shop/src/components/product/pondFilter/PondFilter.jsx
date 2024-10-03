import React from "react";
import "./PondFilter.scss";
import koiImg1 from "../../../assets/koi-list/koiImg1.jpg";
import koiImg2 from "../../../assets/koi-list/koiImg2.jpg";
import koiImg3 from "../../../assets/koi-list/koiImg3.jpg";
import koiImg4 from "../../../assets/koi-list/koiImg4.jpg";
import koiImg5 from "../../../assets/koi-list/koiImg5.jpg";
const PondFilterSampleList = [
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
  {
    id: 4,
    name: "cá ?",
    image: koiImg4,
    origin: "India",
    brand: "somewhere",
    price: "2.000.000 VND",
  },
  {
    id: 5,
    name: "máy lọc",
    image: koiImg5,
    origin: "Japan",
    brand: "somewhere",
    price: "2.000.000 VND",
  },
];


const PondFilter = () => {
  return (
    <div className="pond-filter-container">
      <h1 className="pond-filter-title">Pond Accessories</h1>
      
      <div className="guide">
        <h2>Guide to Pond filter</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pond accessories are essential for maintaining a healthy and beautiful koi pond environment. From filtration systems to decorative elements, these products help create the perfect habitat for your koi fish.</p>
      </div>

      <div className="pond-filter-grid">
        {PondFilterSampleList.map((filter) => (
          <div key={filter.id} className="filter-card">
            <div className="filter-image-container">
              <img src={filter.image} alt={filter.name} className="filter-image" />
              <button className="view-detail-button">View detail</button>
            </div>
            <div className="filter-info">
              <h3>{filter.name}</h3>
              <p><strong>Origin:</strong> {filter.origin}</p>
              <p><strong>Brand:</strong> {filter.brand}</p>
              <p className="filter-price"><strong>Price:</strong> {filter.price}</p>
              <button className="buy-button">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PondFilter;
