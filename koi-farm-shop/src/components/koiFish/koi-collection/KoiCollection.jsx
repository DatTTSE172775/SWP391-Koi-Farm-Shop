import React from 'react';
import './KoiCollection.scss';

const KoiCollection = () => {
  const koiPackages = [
    {
      title: "Gói Koi cao cấp",
      size: "30-40 cm",
      price: "5,000,000 VND",
      system: "Hệ thống lọc tiên tiến",
      discount: "10% OFF",
      rating: 5
    },
    {
      title: "Gói Koi tiêu chuẩn",
      size: "20-30 cm",
      price: "3,000,000 VND",
      system: "Hệ thống lọc cơ bản",
      discount: "5% OFF",
      rating: 4.5
    },
    {
      title: "Gói Koi khởi đầu",
      size: "15-20 cm",
      price: "2,000,000 VND",
      system: "Hệ thống lọc thiết yếu",
      discount: "",
      rating: 4
    },
    {
      title: "Gói Koi đặc biệt",
      size: "25-35 cm",
      price: "4,000,000 VND",
      system: "Hệ thống lọc cao cấp",
      discount: "15% OFF",
      rating: 4.7
    },
    {
      title: "Gói Koi gia đình",
      size: "20-25 cm",
      price: "2,500,000 VND",
      system: "Hệ thống lọc cơ bản",
      discount: "10% OFF",
      rating: 4.8
    },
    {
      title: "Gói Koi phong cách",
      size: "20-30 cm",
      price: "3,500,000 VND",
      system: "Hệ thống lọc thiết yếu",
      discount: "20% OFF",
      rating: 4.6
    }
  ];

  return (
    <div className="koi-collection">
      <h2 className="koi-collection-title">Lô cá Koi độc quyền</h2>
      <p className="koi-collection-description">
        Chọn từ các gói Koi được chúng tôi lựa chọn thủ công, mỗi gói được thiết kế để cung cấp dịch vụ chăm sóc và chất lượng tốt nhất cho hồ cá của bạn.
      </p>
      <div className="koi-packages">
        {koiPackages.map((koi, index) => (
          <div className="koi-package-card" key={index}>
            <div className="koi-package-image">
              {/* Replace with actual images */}
              <img src={`path/to/koi${index + 1}.jpg`} alt={koi.title} />
              {koi.discount && <span className="koi-package-discount">{koi.discount}</span>}
            </div>
            <div className="koi-package-info">
              <h3>{koi.title}</h3>
              <p>Kích thước: {koi.size}</p>
              <p>Hệ thống lọc: {koi.system}</p>
              <p>Giá: {koi.price}</p>
              <div className="koi-package-rating">
                {Array(Math.round(koi.rating)).fill('⭐').join(' ')}
              </div>
              <button className="koi-package-button">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KoiCollection;
