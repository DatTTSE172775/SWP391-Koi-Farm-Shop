import React, { memo, useContext, useState } from "react";
import { Button, Card, Typography, notification, Rate, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../order/cart-context/CartContext"; // Đảm bảo đường dẫn chính xác
import "./HighQualityKoi.scss";

const { Text, Title } = Typography;

const KoiCard = ({ koifish = {}, isAuthenticated }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { cartItems, handleAddToCart } = useContext(CartContext);

  // Kiểm tra dữ liệu tránh lỗi undefined
  
  const {
    Name = "No Name",
    ImagesLink = "",
    KoiID,
    Origin = "Unknown",
    VarietyID = "N/A",
    Size = 0,
    Weight = 0,
    Price = 0,
    HealthStatus = "Unknown",
    Premium = false,
    Rating = 0,
  } = koifish;
   
  const handleImageError = () => {
    console.error(`Không thể tải ảnh cho ${Name}`);
    setImageError(true);
  };

  const handleViewDetail = () => {
    if (KoiID) {
      navigate(`/koiDetail/${KoiID}`);
    } else {
      console.error("Koi fish ID không hợp lệ", koifish);
    }
  };

  const onAddToCart = () => {
    if (!isAuthenticated) {
      notification.warning({
        message: "Vui Lòng Đăng Nhập",
        description: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.",
        placement: "bottomRight",
      });
      navigate("/login");
      return;
    }

    const isAlreadyInCart = cartItems.some((item) => item.id === KoiID);

    if (isAlreadyInCart) {
      notification.warning({
        message: "Cá Koi Đã Có Trong Giỏ Hàng",
        description: `${Name} đã được thêm vào giỏ hàng trước đó.`,
        placement: "bottomRight",
      });
    } else {
      const koi = {
        id: KoiID,
        name: Name,
        price: Price,
        image: ImagesLink,
        origin: Origin,
        size: Size,
        weight: Weight,
      };
      handleAddToCart(koi);
    }
  };

  return (
    <Card
      hoverable
      cover={
        !ImagesLink || imageError ? (
          <div className="image-placeholder">Hình ảnh không có sẵn</div>
        ) : (
          <div className="image-container">
            <img alt={Name} src={ImagesLink} onError={handleImageError} />
            <Button className="view-detail-btn" onClick={handleViewDetail}>
              Xem chi tiết
            </Button>
          </div>
        )
      }
      className={`koi-card ${Premium ? "premium-card" : ""}`} // Thêm class cho cá Koi Premium
    >
      {Premium && <Tag color="gold">Premium</Tag>} {/* Chỉ hiện thẻ Premium khi đúng */}
      <Card.Meta
        title={<Title level={4}>{Name}</Title>}
        description={<Text type="secondary">Xuất xứ: {Origin}</Text>}
      />
      <div className="koi-details">
        <Text>Giống: {VarietyID}</Text>
        <Text>Kích thước: {Size} cm</Text>
        <Text>Trọng lượng: {Weight} kg</Text>
        <Text strong>Giá: {Price.toLocaleString()} VND</Text>
        <Text>Tình trạng sức khỏe: {HealthStatus}</Text>
        <Rate disabled defaultValue={Rating} />
      </div>
      <Button type="primary" onClick={onAddToCart} block>
        Thêm vào giỏ hàng
      </Button>
    </Card>
  );
};

export default memo(KoiCard);
