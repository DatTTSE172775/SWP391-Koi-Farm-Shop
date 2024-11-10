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
      <h1 className="pond-filter-title">Thiết Bị Lọc Hồ Cá</h1>

      <div className="guide">
        <h2>Hướng Dẫn Về Thiết Bị Lọc Hồ</h2>
        <p>
          Duy trì sức khỏe và vẻ đẹp của hồ cá Koi là yếu tố quan trọng đối với sự phát triển của cá. Hệ thống lọc hồ cá Koi tiên tiến của chúng tôi được thiết kế đặc biệt để đảm bảo nước hồ luôn trong suốt và an toàn cho cá Koi của bạn. Với quy trình lọc đa tầng, hệ thống của chúng tôi loại bỏ hiệu quả các mảnh vụn, chất thải từ cá và các hóa chất độc hại như amoniac, đồng thời thúc đẩy sự phát triển của vi khuẩn có lợi giúp duy trì hệ sinh thái cân bằng.
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
