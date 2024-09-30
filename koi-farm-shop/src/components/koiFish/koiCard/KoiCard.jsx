import { HeartOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import KoiDetail from "../koiDetail/KoiDetail";
import "./KoiCard.scss";

const { Meta } = Card;

const KoiCard = ({ koi, isAuthenticated }) => {
  const [isModelVisible, setIsModelVisible] = useState(false);

  const showModal = () => {
    setIsModelVisible(true);
  };

  const handleModalClose = () => {
    setIsModelVisible(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        hoverable
        className="koi-card"
        cover={
          <div className="koi-image-container">
            <img alt={koi.name} src={koi.image} className="koi-image" />
            <div className="hover-info">
              <p>{koi.description}</p>
              <Button type="primary" size="small" onClick={showModal}>
                Xem chi tiết
              </Button>
            </div>
          </div>
        }
        actions={[
          <Link to={`/wishlist/${koi.id}`}>
            <HeartOutlined key="wishlist" /> Yêu thích
          </Link>,
          <Link to={`/compare/${koi.id}`}>
            <SwapOutlined key="compare" /> So sánh
          </Link>,
        ]}
      >
        <Meta
          title={koi.name}
          description={
            <div className="koi-meta-description">
              <p className="koi-price">{koi.price}</p>
              <p className="koi-details">
                <span>Màu sắc:</span> {koi.color}
                <br />
                <span>Kích thước:</span> {koi.size}
              </p>
            </div>
          }
        />
        <div className="koi-card-footer">
          {isAuthenticated ? (
            <Button type="primary" block>
              Đặt hàng ngay
            </Button>
          ) : (
            <Link to="/login">
              <Button type="default" block>
                Đăng nhập để mua
              </Button>
            </Link>
          )}
        </div>
      </Card>
      <KoiDetail
        visible={isModelVisible}
        onClose={handleModalClose}
        koi={koi}
      />
    </motion.div>
  );
};

export default KoiCard;
