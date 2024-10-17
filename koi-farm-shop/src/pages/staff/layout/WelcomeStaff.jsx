// src/pages/staff/WelcomeStaff.jsx

import { Layout, Typography } from "antd";
import React from "react";
import StaffHeader from "../../../components/staff/header/StaffHeader";
import StaffSidebar from "../../../components/staff/sidebar/StaffSidebar";
import "./WelcomeStaff.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeStaff = () => {
  return (
    <Layout className="staff-layout">
      <StaffSidebar />
      <Layout>
        <StaffHeader />
        <Content className="staff-content">
          <div className="welcome-container">
            <Title level={2}>Chào mừng đến với Staff Portal</Title>
            <Text>Đây là trang quản lý dành riêng cho nhân viên.</Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WelcomeStaff;
