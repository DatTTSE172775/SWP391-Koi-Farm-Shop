// WelcomeStaff.jsx
import {
  NotificationOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import React, { useEffect } from "react";
import "./WelcomeStaff.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/actions/authActions";
import { checkRoleAccess } from "../../../utils/roleUtils";

const { Title, Text } = Typography;

const WelcomeStaff = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!checkRoleAccess(role, ["Staff"])) {
      dispatch(logout());
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <div className="welcome-container">
      <Title level={2}>
        Xin chào, Staff! <SmileOutlined />
      </Title>
      <Text className="welcome-message">
        Chào mừng bạn trở lại! Dưới đây là các hoạt động mới nhất và thống kê
        nhanh về hệ thống.
      </Text>

      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} md={8}>
          <Card className="stat-card" bordered={false}>
            <ShoppingCartOutlined className="stat-icon" />
            <Title level={4}>Đơn hàng đang xử lý</Title>
            <Text>12 đơn hàng đang được xử lý</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card className="stat-card" bordered={false}>
            <NotificationOutlined className="stat-icon" />
            <Title level={4}>Thông báo mới</Title>
            <Text>5 thông báo mới</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card className="stat-card" bordered={false}>
            <ShoppingCartOutlined className="stat-icon" />
            <Title level={4}>Đơn hàng hoàn thành</Title>
            <Text>8 đơn hàng đã hoàn thành</Text>
          </Card>
        </Col>
      </Row>

      <div className="action-buttons">
        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          href="/staff/orders/processing"
        >
          Quản lý đơn hàng
        </Button>
        <Button
          size="large"
          icon={<NotificationOutlined />}
          href="/staff/notification"
        >
          Xem thông báo
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStaff;
