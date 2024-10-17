import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
  NotificationFilled,
  InboxOutlined,
} from "@ant-design/icons";
import "./StaffSidebar.scss";

const { Sider } = Layout;

const StaffSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      className={`staff-sidebar ${collapsed ? "collapsed" : ""}`}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo">Staff Portal</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["staff"]}>
        <Menu.Item key="staff" icon={<DashboardOutlined />}>
          <Link to="/staff">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/staff/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingOutlined />}>
          <Link to="/staff/orders">Quản Lý Đơn Hàng</Link>
        </Menu.Item>
        <Menu.Item key="consignments" icon={<InboxOutlined />}>
          <Link to="/staff/consignments">Quản Lý Ký Gửi</Link>
        </Menu.Item>
        <Menu.Item key="add-koi" icon={<UserOutlined />}>
          <Link to="/staff/create">Thêm cá koi</Link>
        </Menu.Item>
        <Menu.Item key="notification" icon={<NotificationFilled />}>
          <Link to="/staff/notifications">Thông báo</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/staff/settings">Cài Đặt</Link>
        </Menu.Item>
      </Menu>
      <div className="footer">© 2024 Staff Portal</div>
    </Sider>
  );
};

export default StaffSidebar;
