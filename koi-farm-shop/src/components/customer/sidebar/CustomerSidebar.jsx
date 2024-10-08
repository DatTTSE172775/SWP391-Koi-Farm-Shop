import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { HomeMiniOutlined } from "@mui/icons-material";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./CustomerSidebar.scss";

const { Sider } = Layout;

const CustomerSidebar = () => {
  return (
    <Sider className="customer-sidebar">
      <div className="logo">
        <h2>Customer Portal</h2>
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="home" icon={<HomeMiniOutlined />}>
          <Link to="/customer">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/customer/dashboard">Tổng quan</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingOutlined />}>
          <Link to="/customer/orders">Đơn hàng của tôi</Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/customer/profile">Thông tin cá nhân</Link>
        </Menu.Item>
        <Menu.Item key="wishlist" icon={<HeartOutlined />}>
          <Link to="/customer/wishlist">Danh sách yêu thích</Link>
        </Menu.Item>
        <Menu.Item key="support" icon={<QuestionCircleOutlined />}>
          <Link to="/customer/support">Hỗ trợ khách hàng</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default CustomerSidebar;