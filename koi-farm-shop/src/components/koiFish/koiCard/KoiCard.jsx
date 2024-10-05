import { HeartOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { motion } from "framer-motion";
import { memo, useContext } from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { CartContext } from "../../order/cart-context/CartContext";
import "./KoiCard.scss";

const { Meta } = Card;

const KoiCard = ({ koi, isAuthenticated, onAddToCart }) => {
  const { handleAddToCart } = useContext(CartContext);

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
            <LazyLoad height={200} offset={100} once>
              <img alt={koi.name} src={koi.image} className="koi-image" />
            </LazyLoad>
            <div className="hover-info">
              <p>{koi.description}</p>
              <Link to={`/koi-details/${koi.id}`}>
                <Button type="primary" size="small">
                  Xem chi tiết
                </Button>
              </Link>
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
            <Button type="primary" block onClick={() => handleAddToCart(koi)}>
              Thêm vào giỏ hàng
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
    </motion.div>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.koi.id === nextProps.koi.id &&
    prevProps.koi.name === nextProps.koi.name &&
    prevProps.koi.image === nextProps.koi.image &&
    prevProps.koi.color === nextProps.koi.color &&
    prevProps.koi.size === nextProps.koi.size &&
    prevProps.koi.price === nextProps.koi.price &&
    prevProps.isAuthenticated === nextProps.isAuthenticated
  );
};

export default memo(KoiCard, areEqual);
