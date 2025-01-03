import {
  DashboardOutlined,
  ShoppingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ContrastOutlined, HomeMiniOutlined } from "@mui/icons-material";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation để lấy đường dẫn hiện tại
import "./AdminSidebar.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminSidebar = () => {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const [selectedKey, setSelectedKey] = useState(""); // State lưu key đang chọn

  useEffect(() => {
      // Cập nhật selectedKey mỗi khi đường dẫn thay đổi
      const path = location.pathname.split("/")[2] || "admin"; // Trích xuất key từ path
      setSelectedKey(path);
  }, [location]);

  return (
      <Sider className="admin-sidebar">
          <div className="logo">
              <h2>Admin Portal</h2>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
              <Menu.Item key="admin" icon={<HomeMiniOutlined />}>
                  <Link to="/admin">Trang chủ</Link>
              </Menu.Item>
              <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                  <Link to="/admin/dashboard">Dashboard</Link>
              </Menu.Item>
              <SubMenu key="add-product" icon={<PlusOutlined />} title="Quản Lý Cá Koi">
                  <Menu.Item key="AddKoi">
                      <Link to="/admin/AddKoi">Cá Koi</Link>
                  </Menu.Item>
                  <Menu.Item key="AddPackage">
                      <Link to="/admin/AddPackage">Gói cá Koi</Link>
                  </Menu.Item>
              </SubMenu>
              <Menu.Item key="manage-orders" icon={<ShoppingOutlined />}>
                  <Link to="/admin/manage-orders">Quản lý đơn hàng</Link>
              </Menu.Item>

              <Menu.Item key="manage-consign" icon={<ContrastOutlined />}>
                  <Link to="/admin/manage-consign">Quản lý ký gửi</Link>
              </Menu.Item>
          </Menu>
      </Sider>
  );
};

export default AdminSidebar;