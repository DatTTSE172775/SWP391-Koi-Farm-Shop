import React, { useState, useEffect } from "react";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./koiPackageCard.scss";

const { Text } = Typography;

const KoiPackageCard = ({ koipackage, isAuthenticated }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Koi package data:", koipackage);
  }, [koipackage]);

  const handleImageError = () => {
    console.error(`Failed to load image for ${koipackage.PackageName}`);
    console.error("Image URL:", koipackage.ImageLink);
    setImageError(true);
  };

  const imageUrl = koipackage.ImageLink || '';

  const handleAddToCart = () => {
    // Implement add to cart functionality here
    console.log("Add to cart clicked for:", koipackage.PackageName);
  };

  return (
    <Card
      hoverable
      cover={
        <div className="image-container">
          {!imageError ? (
            <img 
              alt={koipackage.PackageName} 
              src={imageUrl}
              onError={handleImageError}
            />
          ) : (
            <div className="image-placeholder">
              <Text>Image not available</Text>
            </div>
          )}
        </div>
      }
      className="koi-package-card"
    >
      <Card.Meta 
        title={koipackage.PackageName} 
      />
      <div className="koi-details">
        <Text>Size: {koipackage.PackageSize}</Text>
        <Text strong>Price: ${koipackage.Price}</Text>
        <Text>Availability: {koipackage.Availability}</Text>
      </div>
      <Button type="primary" onClick={handleAddToCart} block>
        Thêm vào giỏ hàng
      </Button>
    </Card>
  );
};

export default KoiPackageCard;
