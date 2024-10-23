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
        console.log("API Response:", response.data);

        const packageData = response.data.data || [];
        console.log("Processed package data:", packageData);
        setPackages(packageData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchKoiPackages();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="koi-package">
      <KoiPackageHeader />
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
                title={<strong>{pkg.PackageName}</strong>}
                description={
                  <>
                    <Text type="secondary">Kích thước: {pkg.PackageSize} cm</Text>
                  </>
                }
              />
              <div className="koi-package-card__details">
                <div>
                  <strong>Kích thước: {pkg.PackageSize} cm</strong>
                </div>
                <div>
                  <strong>Tình trạng: {pkg.Availability}</strong>
                </div>
                <div>
                  <strong>Giá: {pkg.Price.toLocaleString()} VND</strong>
                </div>
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
