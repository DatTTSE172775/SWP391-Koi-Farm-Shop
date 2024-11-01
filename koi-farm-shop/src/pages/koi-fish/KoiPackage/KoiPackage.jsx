import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../../api/axiosInstance"; // Đường dẫn đến axiosInstance của bạn
import { Card, Button, Typography, Spin } from "antd";
import KoiPackageHeader from "../../koi-fish/KoiPackageHeader/KoiPackageHeader"; // Nhập KoiPackageHeader
import { CartContext } from "../../../components/order/cart-context/CartContext";
import "./KoiPackage.scss"; // Giữ nguyên phần styling

const { Text } = Typography;

const KoiPackage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handleAddToCart } = useContext(CartContext);

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

  const onAddToCart = (pkg) => {
    const koiPackage = {
      id: pkg.PackageID,
      name: pkg.PackageName,
      price: pkg.Price,
      image: pkg.ImageLink,
      size: pkg.PackageSize,
      availability: pkg.Availability,
      type: 'package'
    };
    handleAddToCart(koiPackage);
  };

  return (
    <div className="koi-package">
      <KoiPackageHeader /> {/* Chèn header ở đây */}

      <div className="koi-package__list">
        {packages.length > 0 ? (
          packages.map((pkg) => {
            const imageUrl = pkg.ImageLink && pkg.ImageLink.startsWith('http') 
              ? pkg.ImageLink 
              : `${process.env.REACT_APP_BASE_URL}${pkg.ImageLink}`;

            return (
              <Card
                key={pkg.PackageID}
                hoverable
                className="koi-package-card"
                cover={
                  <img
                    alt={pkg.PackageName}
                    src={imageUrl}
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
                <Button type="primary" block onClick={() => onAddToCart(pkg)}>
                  Thêm vào giỏ hàng
                </Button>
              </Card>
            );
          })
        ) : (
          <p>Không có gói Koi nào.</p>
        )}
      </div>
    </div>
  );
};

export default KoiPackage;
