import {
  DashboardOutlined,
  InboxOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { HomeMaxOutlined } from "@mui/icons-material";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./StaffSidebar.scss";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider className="staff-sidebar">
      <div className="logo">
        <h2>Staff Portal</h2>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["staff"]}>
        <Menu.Item key="staff" icon={<HomeMaxOutlined />}>
          <Link to="/staff">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
          <Link to="/staff/orders">Quản Lý Đơn Hàng</Link>
        </Menu.Item>
        <Menu.Item key="consignments" icon={<InboxOutlined />}>
          <Link to="/staff/consignments">Quản Lý Ký Gửi</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
