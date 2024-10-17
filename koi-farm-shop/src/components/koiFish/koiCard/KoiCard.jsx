import React, { useState } from "react";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./KoiCard.scss";

const { Text } = Typography;

const KoiCard = ({ koifish, isAuthenticated }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleImageError = () => {
    console.error(`Failed to load image for ${koifish.Name}`);
    setImageError(true);
  };

  const imageUrl = koifish.ImagesLink || '';

  const handleViewDetail = () => {
    if (koifish.KoiID) {
      navigate(`/koiDetail/${koifish.KoiID}`);
    } else {
      console.error("Koi fish ID is undefined", koifish);
    }
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log("Add to cart clicked for:", koifish.Name);
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
            <Button className="view-detail-btn" onClick={handleViewDetail}>View Detail</Button>
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
      <Button type="primary" onClick={handleAddToCart} block>
        Thêm vào giỏ hàng
      </Button>
    </Card>
  );
};

export default KoiCard;
