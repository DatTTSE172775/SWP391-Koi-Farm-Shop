import React, { useState } from "react";
import { Card, Button, Typography } from "antd";
import "./KoiCard.scss";

const { Text } = Typography;

const KoiCard = ({ koifish, isAuthenticated }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image for ${koifish.Name}`);
    setImageError(true);
  };

  const imageUrl = koifish.ImagesLink || '';

  const handleBuyNow = () => {
    // Implement buy now functionality here
    console.log("Buy now clicked for:", koifish.Name);
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
            <Button className="view-detail-btn">View Detail</Button>
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
      <Button type="primary" onClick={handleBuyNow} block>
        Thêm vào giỏ hàng
      </Button>
    </Card>
  );
};

export default KoiCard;
