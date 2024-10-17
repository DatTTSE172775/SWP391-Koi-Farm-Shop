import React from "react";
import "./PondFilter.scss";

import filter1 from "../../../assets/pondFilter/filter.webp";
import filter2 from "../../../assets/pondFilter/filterPIll.webp";
import filter3 from "../../../assets/pondFilter/pondFilter.webp";
import filter4 from "../../../assets/pondFilter/pondFilterROAqua.webp";

const PondFilterSampleList = [
  {
    id: 1,
    name: "Máy lọc nước thác",
    image: filter1,
    origin: "America",
    brand: "somewhere",
    price: "1.000.000 VND",
  },
  {
    id: 2,
    name: "Viên làm sạch hồ",
    image: filter2,
    origin: "Vietnam",
    brand: "somewhere",
    price: "1.000 VND",
  },
  {
    id: 3,
    name: "Máy hút nước",
    image: filter3,
    origin: "Vietnam",
    brand: "somewhere",
    price: "35.000 VND",
  },
  {
    id: 4,
    name: "Máy bơm",
    image: filter4,
    origin: "China",
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
        <p>
          Maintaining the health and beauty of your koi pond is crucial for the
          well-being of your fish. Our advanced Koi pond filtration systems are
          specifically designed to ensure your pond water remains crystal clear
          and safe for your koi. With a multi-stage filtration process, our
          systems effectively remove debris, fish waste, and toxic chemicals
          like ammonia, while also encouraging beneficial bacteria growth that
          helps maintain a balanced ecosystem.
        </p>
      </div>

      <div className="pond-filter-grid">
        {PondFilterSampleList.map((filter) => (
          <div key={filter.id} className="filter-card">
            <div className="filter-image-container">
              <img
                src={filter.image}
                alt={filter.name}
                className="filter-image"
              />
              <button className="view-detail-button">View detail</button>
            </div>
            <div className="filter-info">
              <h3>{filter.name}</h3>
              <p>
                <strong>Origin:</strong> {filter.origin}
              </p>
              <p>
                <strong>Brand:</strong> {filter.brand}
              </p>
              <p className="filter-price">
                <strong>Price:</strong> {filter.price}
              </p>
              <button className="buy-button">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PondFilter;
