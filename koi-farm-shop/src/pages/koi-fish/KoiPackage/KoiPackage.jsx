import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance"; // Đường dẫn đến axiosInstance của bạn
import { Card, Button, Typography, Spin } from "antd";
import KoiPackageHeader from "../../koi-fish/KoiPackageHeader/KoiPackageHeader"; // Nhập KoiPackageHeader
import "./KoiPackage.scss"; // Giữ nguyên phần styling

const { Text } = Typography;

const KoiPackage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API để lấy danh sách tất cả các Koi Packages
  useEffect(() => {
    const fetchKoiPackages = async () => {
      try {
        const response = await axiosInstance.get("koipackages");
        setPackages(response.data.data); // Chắc chắn rằng dữ liệu trả về đúng định dạng
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchKoiPackages();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="koi-package">
      <KoiPackageHeader /> {/* Chèn header ở đây */}

      <div className="koi-package__list">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <Card
              key={pkg.PackageID}
              hoverable
              className="koi-package-card"
              cover={
                <img
                  alt={pkg.PackageName}
                  src={pkg.ImageLink || "https://via.placeholder.com/150"}
                />
              }
            >
              <Card.Meta
                title={pkg.PackageName}
                description={<Text type="secondary">Kích thước: {pkg.PackageSize} cm</Text>}
              />
              <div className="koi-package-card__details">
                <Text strong>Tình trạng: {pkg.Availability}</Text>
                <Text strong>Giá: {pkg.Price.toLocaleString()} VND</Text>
              </div>
              <Button type="primary" block>
                Thêm vào giỏ hàng
              </Button>
            </Card>
          ))
        ) : (
          <p>Không có gói Koi nào.</p>
        )}
      </div>
    </div>
  );
};

export default KoiPackage;
