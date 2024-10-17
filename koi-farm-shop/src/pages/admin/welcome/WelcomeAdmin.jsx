import { Layout, Typography } from "antd";
import React from "react";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import "./WelcomeAdmin.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeAdmin = () => {
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
};

export default WelcomeAdmin;
