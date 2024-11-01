import { Button, Card, Typography, notification } from "antd";
import { memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../order/cart-context/CartContext";
import "./KoiCard.scss";

const { Text } = Typography;

const KoiCard = ({ koifish, isAuthenticated }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { cartItems, handleAddToCart } = useContext(CartContext);

  const handleImageError = () => {
    console.error(`Failed to load image for ${koifish.Name}`);
    setImageError(true);
  };

  // Prioritize external links, fall back to local uploads
  const imageUrl = koifish.ImagesLink && koifish.ImagesLink.startsWith('http') 
    ? koifish.ImagesLink 
    : `${process.env.REACT_APP_BASE_URL}${koifish.ImagesLink}`;

  console.log('Image URL:', imageUrl);

  const handleViewDetail = () => {
    if (koifish.KoiID) {
      navigate(`/koiDetail/${koifish.KoiID}`);
    } else {
      console.error("Koi fish ID is undefined", koifish);
    }
  };

  const onAddToCart = () => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      notification.warning({
        message: "Vui Lòng Đăng Nhập",
        description: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.",
        placement: "bottomRight",
      });
      navigate("/login"); // Redirect to login page
      return;
    }

    // Check if the koi fish is already in the cart
    const isAlreadyInCart = cartItems.some((item) => item.id === koifish.KoiID);

    if (isAlreadyInCart) {
      // Show a warning notification if the koi fish is already added
      notification.warning({
        message: "Cá Koi Đã Có Trong Giỏ Hàng",
        description: `${koifish.Name} đã được thêm vào giỏ hàng trước đó.`,
        placement: "bottomRight",
      });
    } else {
      // Add the koi fish to the cart if not already added
      const koi = {
        id: koifish.KoiID,
        name: koifish.Name,
        price: koifish.Price,
        image: koifish.ImagesLink,
        size: koifish.Size,
        weight: koifish.Weight,
        type: 'koi'
      };
      handleAddToCart(koi); // Call handleAddToCart properly
    }
  };

  return (
    <Card
      hoverable
      cover={
        !imageUrl || imageError ? (
          <div className="image-placeholder">Image not available</div>
        ) : (
          <div className="image-container">
            <img
              alt={koifish.Name}
              src={imageUrl}
              onError={handleImageError}
            />
            <Button className="view-detail-btn" onClick={handleViewDetail}>
              View Detail
            </Button>
          </div>
        )
      }
      className="koi-card"
    >
      <Card.Meta
        title={koifish.Name}
        description={<Text type="secondary">Origin: {koifish.Origin}</Text>}
      />
      <div className="koi-details">
        <Text>Variety: {koifish.VarietyID}</Text>
        <Text>Size: {koifish.Size} cm</Text>
        <Text strong>Price: {koifish.Price.toLocaleString()} VND</Text>
        <Text>Health Status: {koifish.HealthStatus}</Text>
      </div>
      <Button type="primary" onClick={onAddToCart} block>
        Thêm vào giỏ hàng
      </Button>
    </Card>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.koifish.KoiID === nextProps.koifish.KoiID &&
    prevProps.koifish.Name === nextProps.koifish.Name &&
    prevProps.koifish.ImagesLink === nextProps.koifish.ImagesLink &&
    prevProps.koifish.Size === nextProps.koifish.Size &&
    prevProps.koifish.Price === nextProps.koifish.Price &&
    prevProps.isAuthenticated === nextProps.isAuthenticated
  );
};

export default memo(KoiCard, areEqual);
