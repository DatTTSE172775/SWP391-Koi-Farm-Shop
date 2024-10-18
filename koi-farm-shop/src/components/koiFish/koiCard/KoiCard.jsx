import { Button, Card, Typography } from "antd";
import { memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../order/cart-context/CartContext";
import "./KoiCard.scss";

const { Text } = Typography;

const KoiCard = ({ koifish, isAuthenticated }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { handleAddToCart } = useContext(CartContext);

  const handleImageError = () => {
    console.error(`Failed to load image for ${koifish.Name}`);
    setImageError(true);
  };

  const imageUrl = koifish.ImagesLink || "";

  const handleViewDetail = () => {
    if (koifish.KoiID) {
      navigate(`/koiDetail/${koifish.KoiID}`);
    } else {
      console.error("Koi fish ID is undefined", koifish);
    }
  };

  const onAddToCart = () => {
    const koi = {
      id: koifish.KoiID,
      name: koifish.Name,
      price: koifish.Price,
      image: koifish.ImagesLink,
      origin: koifish.Origin,
      size: koifish.Size,
      weight: koifish.Weight,
    };
    handleAddToCart(koi); // Call handleAddToCart properly
  };

  return (
    <Card
      hoverable
      cover={
        !imageUrl || imageError ? (
          <div className="image-placeholder">Image not available</div>
        ) : (
          <div className="image-container">
            <img alt={koifish.Name} src={imageUrl} onError={handleImageError} />
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
        <Text>Weight: {koifish.Weight} kg</Text>
        <Text strong>Price: ${koifish.Price}</Text>
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
