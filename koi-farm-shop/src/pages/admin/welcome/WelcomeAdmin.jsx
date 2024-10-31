<<<<<<< HEAD
import { Layout, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/actions/authActions";
import { checkRoleAccess } from "../../../utils/roleUtils";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import "./WelcomeAdmin.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!checkRoleAccess(role, ["Manager"])) {
      dispatch(logout());
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <div className="welcome-container">
            <Title level={2}>Chào mừng đến với Admin Portal</Title>
            <Text>Đây là trang quản lý dành riêng cho quản trị viên.</Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
=======
// src/components/WelcomeAdmin.jsx
import React from 'react';
import { Row, Col, Card, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined, AppstoreOutlined, UserAddOutlined } from '@ant-design/icons';
import WelcomeCard from '../../../components/admin/layout/welcome/WelcomeCard';
import './WelcomeAdmin.scss';

const WelcomeAdmin = () => {
    const navigate = useNavigate();
    const today = new Date().toLocaleDateString('vi-VN');

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="welcome-admin">
            <h1 className="welcome-admin__title">Chào mừng đến với Trang Quản Trị Koi Farm</h1>
            <p className="welcome-admin__subtitle">
                Quản lý trang trại cá koi của bạn, theo dõi đơn hàng và kiểm tra tồn kho dễ dàng.
            </p>
            <p className="welcome-admin__date">Ngày hôm nay: {today}</p>

            {/* Widgets Section */}
            <Row gutter={[16, 16]} className="welcome-admin__widgets">
                <Col span={8}>
                    <WelcomeCard
                        title="Đơn Hàng Mới"
                        value="5"
                        description="Đơn hàng đang chờ xử lý"
                        icon={<ShoppingOutlined />}
                    />
                </Col>
                <Col span={8}>
                    <WelcomeCard
                        title="Tổng Doanh Thu"
                        value="80,000,000 VND"
                        description="Doanh thu trong tháng này"
                        icon={<AppstoreOutlined />}
                    />
                </Col>
                <Col span={8}>
                    <WelcomeCard
                        title="Khách Hàng Mới"
                        value="12"
                        description="Khách hàng đăng ký trong tháng"
                        icon={<UserAddOutlined />}
                    />
                </Col>
            </Row>

            {/* Quick Actions Section */}
            <Row gutter={[16, 16]} className="welcome-admin__actions">
                <Col span={12}>
                    <Card className="action-card hover-card">
                        <h3>Quản Lý Đơn Hàng</h3>
                        <p>Kiểm tra, cập nhật và xử lý đơn hàng</p>
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={() => handleNavigate('/admin/manage-orders')}
                        >
                            Xem Đơn Hàng
                        </Button>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="action-card hover-card">
                        <h3>Quản Lý Tồn Kho</h3>
                        <p>Cập nhật số lượng và thêm sản phẩm mới</p>
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={() => handleNavigate('/admin/inventory')}
                        >
                            Xem Tồn Kho
                        </Button>
                    </Card>
                </Col>
            </Row>

            {/* Status Section */}
            <Row gutter={[16, 16]} className="welcome-admin__status">
                <Col span={12}>
                    <WelcomeCard
                        title="Số Lượng Cá Koi Trong Kho"
                        value="50"
                        description="Nhiều chủng loại khác nhau"
                    />
                </Col>
                <Col span={12}>
                    <WelcomeCard
                        title="Tình Trạng Thức Ăn & Nước"
                        value="Đủ dùng"
                        description="Chưa cần hành động ngay"
                    />
                </Col>
            </Row>
        </div>
    );
>>>>>>> 6b41d50d0a674b57a871fbdf711a50ba35c5edc0
};

export default WelcomeAdmin;
