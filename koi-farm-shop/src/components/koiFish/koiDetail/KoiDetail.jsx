// src/pages/KoiDetail.jsx

import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Carousel,
  Col,
  Image,
  Row,
  Typography,
} from "antd";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../order/cart-context/CartContext";
import "./KoiDetail.scss";

const { Title, Paragraph } = Typography;

// Sample data (có thể được thay thế bằng dữ liệu thực từ API hoặc Redux)
const koiSampleList = [
  {
    id: 1,
    name: "Kohaku Koi",
    images: [
      require("../../../assets/koi-list/koiImg1.jpg"),
      require("../../../assets/koi-list/koiImg1.jpg"),
      require("../../../assets/koi-list/koiImg1.jpg"),
    ],
    color: "Đỏ & Trắng",
    size: "30 cm",
    price: "2.000.000 VND",
    description:
      "Kohaku Koi là loại cá Koi nổi tiếng với màu đỏ và trắng sắc nét.",
    breeder: "Breeder A",
    sex: "Nữ",
    bornIn: "2023",
    variety: "Standard",
    estimatedValue: "2.500.000 VND",
  },
  {
    id: 2,
    name: "Showa Koi",
    images: [
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
    ],
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
    description: "Showa Koi là sự kết hợp tuyệt vời giữa màu đen, đỏ và trắng.",
    breeder: "Breeder B",
    sex: "Nam",
    bornIn: "2023",
    variety: "Standard",
    estimatedValue: "2.000.000 VND",
  },
  {
    id: 3,
    name: "Showa Koi",
    images: [
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
    ],
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
    description: "Showa Koi là sự kết hợp tuyệt vời giữa màu đen, đỏ và trắng.",
    breeder: "Breeder B",
    sex: "Nam",
    bornIn: "2023",
    variety: "Standard",
    estimatedValue: "2.000.000 VND",
  },
  {
    id: 4,
    name: "Showa Koi",
    images: [
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
    ],
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
    description: "Showa Koi là sự kết hợp tuyệt vời giữa màu đen, đỏ và trắng.",
    breeder: "Breeder B",
    sex: "Nam",
    bornIn: "2023",
    variety: "Standard",
    estimatedValue: "2.000.000 VND",
  },
  {
    id: 5,
    name: "Showa Koi",
    images: [
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
    ],
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
    description: "Showa Koi là sự kết hợp tuyệt vời giữa màu đen, đỏ và trắng.",
    breeder: "Breeder B",
    sex: "Nam",
    bornIn: "2023",
    variety: "Standard",
    estimatedValue: "2.000.000 VND",
  },
  {
    id: 6,
    name: "Showa Koi",
    images: [
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
    ],
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
    description: "Showa Koi là sự kết hợp tuyệt vời giữa màu đen, đỏ và trắng.",
    breeder: "Breeder B",
    sex: "Nam",
    bornIn: "2023",
    variety: "Standard",
    estimatedValue: "2.000.000 VND",
  },
  {
    id: 7,
    name: "Showa Koi",
    images: [
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
    ],
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
    description: "Showa Koi là sự kết hợp tuyệt vời giữa màu đen, đỏ và trắng.",
    breeder: "Breeder B",
    sex: "Nam",
    bornIn: "2023",
    variety: "Standard",
    estimatedValue: "2.000.000 VND",
  },
  {
    id: 8,
    name: "Showa Koi",
    images: [
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
      require("../../../assets/koi-list/koiImg2.jpg"),
    ],
    color: "Đen & Đỏ & Trắng",
    size: "25 cm",
    price: "1.800.000 VND",
    description: "Showa Koi là sự kết hợp tuyệt vời giữa màu đen, đỏ và trắng.",
    breeder: "Breeder B",
    sex: "Nam",
    bornIn: "2023",
    variety: "Standard",
    estimatedValue: "2.000.000 VND",
  },
];

const KoiDetail = () => {
  const { id } = useParams();
  const koiId = parseInt(id, 10);
  const koi = koiSampleList.find((item) => item.id === koiId);
  const { handleAddToCart } = useContext(CartContext);

  if (!koi) {
    return (
      <div className="koi-detail">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/home">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/koi-list">Tìm kiếm cá Koi</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Không tìm thấy</Breadcrumb.Item>
        </Breadcrumb>
        <Title level={2}>Không tìm thấy cá Koi này.</Title>
        <Link to="/koi-list">
          <Button type="primary">Quay lại danh sách</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="koi-detail">
      <div className="breadcrumb-background">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/home">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/koi-list">Tìm kiếm cá Koi</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{koi.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row gutter={[32, 32]} className="koi-detail-container">
        {/* Hình Ảnh */}
        <Col xs={24} md={12}>
          <Carousel autoplay>
            {koi.images.map((img, index) => (
              <div key={index} className="koi-detail-image-container">
                <Image
                  src={img}
                  alt={`${koi.name} ${index + 1}`}
                  className="koi-detail-image"
                />
              </div>
            ))}
          </Carousel>
        </Col>

        {/* Thông Tin Chi Tiết */}
        <Col xs={24} md={12}>
          <Typography>
            <Title level={2}>{koi.name}</Title>
            <Paragraph>{koi.description}</Paragraph>
            <Paragraph>
              <strong>Màu sắc:</strong> {koi.color}
            </Paragraph>
            <Paragraph>
              <strong>Kích thước:</strong> {koi.size}
            </Paragraph>
            <Paragraph>
              <strong>Giá:</strong> {koi.price}
            </Paragraph>
            <Paragraph>
              <strong>Giá trị ước tính:</strong> {koi.estimatedValue}
            </Paragraph>
            <Paragraph>
              <strong>Breeder:</strong> {koi.breeder}
            </Paragraph>
            <Paragraph>
              <strong>Giới tính:</strong> {koi.sex}
            </Paragraph>
            <Paragraph>
              <strong>Năm sinh:</strong> {koi.bornIn}
            </Paragraph>
            <Paragraph>
              <strong>Loại:</strong> {koi.variety}
            </Paragraph>
          </Typography>
          <div className="koi-detail-buttons">
            <Button
              type="default"
              icon={<ShoppingCartOutlined />}
              size="large"
              style={{ marginRight: "16px" }}
              block
              onClick={() => handleAddToCart(koi)}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button type="primary" icon={<DollarOutlined />} size="large">
              Mua ngay
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default KoiDetail;
