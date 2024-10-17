import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./AdminSidebar.scss";

const { Sider } = Layout;

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo">Admin Portal</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["admin"]}>
        <Menu.Item key="admin" icon={<DashboardOutlined />}>
          <Link to="/admin">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingOutlined />}>
          <Link to="/admin/manage-orders">Quản lý đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/admin/users">Quản lý người dùng</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/admin/settings">Cài Đặt Hệ Thống</Link>
        </Menu.Item>
      </Menu>
      <div className="footer">© 2024 Admin Portal</div>
    </Sider>
  );
};

export default AdminSidebar;
