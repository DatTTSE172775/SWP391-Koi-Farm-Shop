import { LogoutOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./StaffHeader.scss";

const { Header } = Layout;

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Đăng xuất...");
    navigate("/login");
  };

  return (
    <Header className="admin-header">
      <div className="header-content">
        <span className="welcome-message">Xin chào, Staff!</span>
        <LogoutOutlined className="logout-icon" onClick={handleLogout} />
      </div>
    </Header>
  );
};

export default AdminHeader;
