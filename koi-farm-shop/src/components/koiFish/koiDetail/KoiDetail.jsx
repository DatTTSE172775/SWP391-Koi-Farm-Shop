// src/pages/KoiDetail.jsx

import { DollarOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Image, Row, Spin, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosPublic from "../../../api/axiosPublic";
import { CartContext } from "../../order/cart-context/CartContext";
import "./KoiDetail.scss";

const { Title, Paragraph } = Typography;

const KoiDetail = () => {
  console.log("KoiDetail component initialized");
  const { id } = useParams();
  const [koi, setKoi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handleAddToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchKoiData = async () => {
      try {
        setLoading(true);
        console.log("Fetching koi data for ID:", id);
        const response = await axiosPublic.get(`koifish/${id}`);
        console.log("Koi data received:", response.data);
        setKoi(response.data);
      } catch (error) {
        console.error("Error fetching koi data:", error);
        setError("Failed to fetch koi data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchKoiData();
    } else {
      console.error("No ID provided in URL");
      setError("No koi ID provided");
      setLoading(false);
    }
  }, [id]);

  console.log("Component rendering. Loading:", loading, "Koi:", koi);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!koi || !koi.data) {
    console.log("No koi data found");
    return <div>No koi data found</div>;
  }

  const koiData = koi.data;

  const imageUrl = koiData.ImagesLink && koiData.ImagesLink.startsWith('http') 
    ? koiData.ImagesLink 
    : `${process.env.REACT_APP_BASE_URL}${koiData.ImagesLink}`;

  console.log("Koi data:", koiData);

  return (
    <div className="koi-detail">
      <div className="breadcrumb-background">
        <Breadcrumb separator=">">
          <Breadcrumb separator=">">
            <Breadcrumb>
              <Link to="/home">Trang chủ</Link>
            </Breadcrumb>
            <Breadcrumb>
              <Link to="/koi-list">Tìm kiếm cá Koi</Link>
            </Breadcrumb>
            <Breadcrumb>{koiData.Name}</Breadcrumb>
          </Breadcrumb>
        </Breadcrumb>
      </div>
      <Row gutter={[32, 32]} className="koi-detail-container">
        {/* Hình Ảnh */}
        <Col xs={24} md={12}>
          <Image
            src={imageUrl}
            alt={koiData.Name}
            className="koi-detail-image"
          />
        </Col>

        {/* Thông Tin Chi Tiết */}
        <Col xs={24} md={12}>
          <Typography>
            <Title level={2}>{koiData.Name}</Title>
            <Paragraph>
              <strong>Loại:</strong> {koiData.VarietyID}
            </Paragraph>
            <Paragraph>
              <strong>Xuất xứ:</strong> {koiData.Origin}
            </Paragraph>
            <Paragraph>
              <strong>Giới tính:</strong> {koiData.Gender}
            </Paragraph>
            <Paragraph>
              <strong>Năm sinh:</strong> {koiData.Born}
            </Paragraph>
            <Paragraph>
              <strong>Kích thước:</strong> {koiData.Size} cm
            </Paragraph>
            {/* <Paragraph>
              <strong>Cân nặng:</strong> {koiData.Weight} kg
            </Paragraph> */}
            {/* <Paragraph>
              <strong>Tính cách:</strong> {koiData.Personality}
            </Paragraph> */}
            {/* <Paragraph>
              <strong>Lượng thức ăn mỗi ngày:</strong>{" "}
              {koiData.FeedingAmountPerDay} g
            </Paragraph> */}
            <Paragraph>
              <strong>Tình trạng sức khỏe:</strong> {koiData.HealthStatus}
            </Paragraph>
            <Paragraph>
              <strong>Giá:</strong>{" "}
              {koiData.Price !== undefined && koiData.Price !== null
                ? typeof koiData.Price === "number"
                  ? koiData.Price.toLocaleString()
                  : koiData.Price.toString()
                : "N/A"}{" "}
              VND
            </Paragraph>
            <Paragraph>
              <strong>Tình trạng:</strong> {koiData.Availability}
            </Paragraph>
          </Typography>
          <div className="koi-detail-buttons">
            <Button
              type="default"
              icon={<ShoppingCartOutlined />}
              size="large"
              style={{ marginRight: "16px" }}
              onClick={() => handleAddToCart(koiData)}
              disabled={koiData.Availability !== "Available"}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button
              type="primary"
              icon={<DollarOutlined />}
              size="large"
              disabled={koiData.Availability !== "Available"}
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
