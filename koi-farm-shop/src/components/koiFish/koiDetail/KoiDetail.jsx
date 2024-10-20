// src/pages/KoiDetail.jsx

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Button, Carousel, Col, Image, Row, Typography, Spin } from "antd";
import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../order/cart-context/CartContext";
import axiosPublic from "../../../api/axiosPublic";
import "./KoiDetail.scss";

const { Title, Paragraph } = Typography;

const KoiDetail = () => {
  console.log('KoiDetail component initialized');
  const { id } = useParams();
  const [koi, setKoi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handleAddToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchKoiData = async () => {
      try {
        setLoading(true);
        console.log('Fetching koi data for ID:', id);
        const response = await axiosPublic.get(`koifish/${id}`);
        console.log('Koi data received:', response.data);
        setKoi(response.data);
      } catch (error) {
        console.error('Error fetching koi data:', error);
        setError('Failed to fetch koi data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchKoiData();
    } else {
      console.error("No ID provided in URL");
      setError('No koi ID provided');
      setLoading(false);
    }
  }, [id]);

  console.log('Component rendering. Loading:', loading, 'Koi:', koi);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!koi) {
    console.log('No koi data found');
    return <div>No koi data found</div>;
  }

  console.log('Rendering koi details:', koi);

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
          <Breadcrumb.Item>{koi.Name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row gutter={[32, 32]} className="koi-detail-container">
        {/* Hình Ảnh */}
        <Col xs={24} md={12}>
          <Image
            src={koi.ImagesLink}
            alt={koi.Name}
            className="koi-detail-image"
          />
        </Col>

        {/* Thông Tin Chi Tiết */}
        <Col xs={24} md={12}>
          <Typography>
            <Title level={2}>{koi.Name}</Title>
            <Paragraph>
              <strong>Loại:</strong> {koi.VarietyID}
            </Paragraph>
            <Paragraph>
              <strong>Xuất xứ:</strong> {koi.Origin}
            </Paragraph>
            <Paragraph>
              <strong>Giới tính:</strong> {koi.Gender}
            </Paragraph>
            <Paragraph>
              <strong>Năm sinh:</strong> {koi.Born}
            </Paragraph>
            <Paragraph>
              <strong>Kích thước:</strong> {koi.Size} cm
            </Paragraph>
            <Paragraph>
              <strong>Cân nặng:</strong> {koi.Weight} kg
            </Paragraph>
            <Paragraph>
              <strong>Tính cách:</strong> {koi.Personality}
            </Paragraph>
            <Paragraph>
              <strong>Lượng thức ăn mỗi ngày:</strong> {koi.FeedingAmountPerDay} g
            </Paragraph>
            <Paragraph>
              <strong>Tình trạng sức khỏe:</strong> {koi.HealthStatus}
            </Paragraph>
            <Paragraph>
              <strong>Giá:</strong> {koi.Price.toLocaleString()} VND
            </Paragraph>
            <Paragraph>
              <strong>Tình trạng:</strong> {koi.Availability}
            </Paragraph>
          </Typography>
          <div className="koi-detail-buttons">
            <Button
              type="default"
              icon={<ShoppingCartOutlined />}
              size="large"
              style={{ marginRight: "16px" }}
              onClick={() => handleAddToCart(koi)}
              disabled={koi.Availability !== "Available"}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button 
              type="primary" 
              icon={<DollarOutlined />} 
              size="large"
              disabled={koi.Availability !== "Available"}
            >
              Mua ngay
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default KoiDetail;
