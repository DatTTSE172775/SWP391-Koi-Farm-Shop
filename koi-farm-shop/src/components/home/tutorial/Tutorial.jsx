import { EyeOutlined, FormOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tutorial.scss";

const Tutorial = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-section">
      <div className="content-wrapper">
        <h2 className="section-title">CÁCH BẮT ĐẦU VÀ MUA CÁ KOI TRỰC TUYẾN</h2>
        <p>
          Đăng ký mở tài khoản và săn những em koi chuẩn chỉ chất lượng tại
          FPTKoi - Koi Farm Shop
        </p>
        <p>
          Đăng ký gửi cá Koi của bạn - hợp tác trở thành nhà bán cá koi cùng
          FPTKoi
        </p>

        <Row gutter={[16, 16]} justify="center" className="icon-row">
          <Col xs={24} sm={8}>
            <Card
              className="icon-card"
              onClick={() => navigate("/login")}
              hoverable
            >
              <LockOutlined className="icon" />
              <h3 className="card-title">ĐĂNG NHẬP</h3>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              className="icon-card"
              onClick={() => navigate("/consign")}
              hoverable
            >
              <FormOutlined className="icon" />
              <h3 className="card-title">KÝ GỬI</h3>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              className="icon-card"
              onClick={() => navigate("/koi-list")}
              hoverable
            >
              <EyeOutlined className="icon" />
              <h3 className="card-title">XEM TẤT CẢ CÁ KOI</h3>
            </Card>
          </Col>
        </Row>

        <Button
          className="primary-button"
          onClick={() => navigate("/tutorial")}
        >
          XEM HƯỚNG DẪN NGƯỜI DÙNG MỚI
        </Button>
      </div>
    </div>
  );
};

export default Tutorial;
