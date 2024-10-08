import { LogoutOutlined } from "@mui/icons-material";
import { Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerHeader.scss";

const { Header } = Layout;

const CustomerHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    navigate("/login");
  };

  return (
    <Header className="customer-header">
      <div className="header-content">
        <span className="welcome-message">Xin chào, Customer!</span>
        <LogoutOutlined className="logout-icon" onClick={handleLogout} />
      </div>
    </Header>
  );
};

export default CustomerHeader;