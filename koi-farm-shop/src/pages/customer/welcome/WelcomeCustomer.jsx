import { Layout, Typography } from "antd";
import React from "react";
import CustomerHeader from "../../../components/customer/header/CustomerHeader";
import CustomerSidebar from "../../../components/customer/sidebar/CustomerSidebar";
import "./WelcomeCustomer.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeCustomer = () => {
  return (
    <Layout className="customer-layout">
      <CustomerSidebar />
      <Layout>
        <CustomerHeader />
        <Content className="customer-content">
          <div className="welcome-container">
            <Title level={2}>Chào mừng đến với Customer Portal</Title>
            <Text>Đây là trang quản lý dành riêng cho khách hàng.</Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WelcomeCustomer;