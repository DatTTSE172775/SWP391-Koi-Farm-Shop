import {
  InboxOutlined,
  NotificationFilled,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { HomeMaxOutlined } from "@mui/icons-material";
import { Layout, Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom"; // Sử dụng useLocation
import "./StaffSidebar.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  // Xử lý logic selectedKeys
  const getSelectedKey = () => {
    const pathParts = location.pathname.split("/");
    if (pathParts.length >= 3 && pathParts[2] === "orders") {
      return `orders-${pathParts[3]}`; // Xử lý các submenu orders
    }
    return location.pathname.slice(1); // Trả về key cho các mục khác
  };

  return (
    <Sider className="staff-sidebar" width={260}>
      <div className="logo">
        <h2>Staff Portal</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getSelectedKey()]} // Đồng bộ với đường dẫn
      >
        <Menu.Item key="staff" icon={<HomeMaxOutlined />}>
          <Link to="/staff">Trang chủ</Link>
        </Menu.Item>

        <SubMenu
          key="orders"
          icon={<ShoppingCartOutlined />}
          title="Quản Lý Đơn Hàng"
        >
          <Menu.Item key="orders-processing">
            <Link to="/staff/orders/processing">Đang Xử Lý</Link>
          </Menu.Item>
          <Menu.Item key="orders-shipping">
            <Link to="/staff/orders/shipping">Đang Giao</Link>
          </Menu.Item>
          <Menu.Item key="orders-deliveried">
            <Link to="/staff/orders/deliveried">Hoàn Thành</Link>
          </Menu.Item>
          <Menu.Item key="orders-cancelled">
            <Link to="/staff/orders/cancelled">Đã Hủy</Link>
          </Menu.Item>
        </SubMenu>


        {/* <Menu.Item key="consignments" icon={<InboxOutlined />}>
          <Link to="/staff/consignments">Quản Lý Ký Gửi</Link>
        </Menu.Item> */}

        <SubMenu
          key="consignments"
          icon={<ShoppingCartOutlined />}
          title="Quản Lý Ký Gửi"
        >
          <Menu.Item key="consignments-pending">
            <Link to="/staff/consignments/pending">Đang Ký Gửi</Link>
          </Menu.Item>
          <Menu.Item key="consignments-in-care">
            <Link to="/staff/consignments/in-care">Hoàn Thành</Link>
          </Menu.Item>
        </SubMenu>


        <Menu.Item key="notification" icon={<NotificationFilled />}>
          <Link to="/staff/notification">Thông báo</Link>
        </Menu.Item>
        <Menu.Item key="setting" icon={<SettingOutlined />}>
          <Link to="/staff/setting">Cài đặt</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
