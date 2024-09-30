import { HeartOutlined, SwapOutlined } from "@ant-design/icons"; // Bổ sung icon
import { Button as MUIButton } from "@mui/material";
import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./KoiCard.scss";

const KoiCard = ({ koi, isAuthenticated }) => {
  return (
    <Card
      hoverable
      className="koi-card"
      cover={
        <div className="koi-image-container">
          <img alt={koi.name} src={koi.image} className="koi-image" />
          <div className="hover-info">
            <p>{koi.description}</p>
            <Link to="#">
              <MUIButton variant="contained" color="secondary" size="small">
                View Details
              </MUIButton>
            </Link>
          </div>
        </div>
      }
      actions={[
        <Link to="#">
          <HeartOutlined key="wishlist" /> Yêu thích
        </Link>,
        <Link to="#">
          <SwapOutlined key="compare" /> So sánh
        </Link>,
      ]}
    >
      <div className="koi-info">
        <h3>{koi.name}</h3>
        <p className="koi-bid">Starting bid: {koi.startingBid} USD</p>
        <div className="koi-details">
          <p>Estimated Value: {koi.estimatedValue}</p>
          <p>Breeder(s): {koi.breeder}</p>
          <p>Sex: {koi.sex}</p>
          <p>Born in: {koi.bornIn}</p>
          <p>Size: {koi.size}</p>
          <p>Variety: {koi.variety}</p>
        </div>
      </div>
      <div className="koi-card-footer">
        {isAuthenticated ? (
          <MUIButton variant="contained" color="primary" fullWidth>
            Đặt hàng ngay
          </MUIButton>
        ) : (
          <Link to="/login">
            <MUIButton variant="contained" color="primary" fullWidth>
              Đăng nhập để mua
            </MUIButton>
          </Link>
        )}
      </div>
    </Card>
  );
};

export default KoiCard;
