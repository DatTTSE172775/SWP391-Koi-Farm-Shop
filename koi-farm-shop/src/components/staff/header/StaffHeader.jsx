import { LogoutOutlined } from "@mui/icons-material";
import { Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./StaffHeader.scss";

const { Header } = Layout;

const StaffHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    navigate("/login");
  };

  return (
    <Header className="staff-header">
      <div className="header-content">
        <span className="welcome-message">Xin chào, Staff!</span>
        <LogoutOutlined className="logout-icon" onClick={handleLogout} />
      </div>
    </Header>
  );
};
export default StaffHeader;
