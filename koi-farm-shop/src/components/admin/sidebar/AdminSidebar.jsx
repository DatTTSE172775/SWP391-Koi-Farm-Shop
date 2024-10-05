// src/components/admin/AdminSidebar.jsx

import {
  DashboardOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { HomeMiniOutlined } from "@mui/icons-material";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.scss";

const { Sider } = Layout;

const AdminSidebar = () => {
  return (
    <Sider className="admin-sidebar">
      <div className="logo">
        <h2>Admin Portal</h2>
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="admin" icon={<HomeMiniOutlined />}>
          <Link to="/admin">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingOutlined />}>
          <Link to="/admin/manage-orders">Quản lý đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/admin/users">Quản Lý Người Dùng</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/admin/settings">Cài Đặt Hệ Thống</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSidebar;
