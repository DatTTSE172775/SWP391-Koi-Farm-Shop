import { Layout, Typography } from "antd";
import React from "react";
import AccountHeader from "../../../components/account/header/AccountHeader";
import AccountSidebar from "../../../components/account/sidebar/AccountSidebar";
import "./WelcomeCustomer.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeCustomer = () => {
  return (
    <Layout className="customer-layout">
      <AccountSidebar />
      <Layout>
        <AccountHeader />
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