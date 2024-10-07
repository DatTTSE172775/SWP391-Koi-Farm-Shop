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
import "./AccountSidebar.scss";

const { Sider } = Layout;

const AccountSidebar = () => {
  return (
    <Sider className="account-sidebar">
      <div className="logo">
        <h2>account Portal</h2>
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="home" icon={<HomeMiniOutlined />}>
          <Link to="/account">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/account/dashboard">Tổng quan</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingOutlined />}>
          <Link to="/account/orders">Đơn hàng của tôi</Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/account/profile">Thông tin cá nhân</Link>
        </Menu.Item>
        <Menu.Item key="wishlist" icon={<HeartOutlined />}>
          <Link to="/account/wishlist">Danh sách yêu thích</Link>
        </Menu.Item>
        <Menu.Item key="support" icon={<QuestionCircleOutlined />}>
          <Link to="/account/support">Hỗ trợ khách hàng</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AccountSidebar;