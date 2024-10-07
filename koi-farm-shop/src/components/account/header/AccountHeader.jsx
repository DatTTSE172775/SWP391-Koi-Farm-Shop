import { LogoutOutlined } from "@mui/icons-material";
import { Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccountHeader.scss";

const { Header } = Layout;

const AccountHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    navigate("/login");
  };

  return (
    <Header className="account-header">
      <div className="header-content">
        <span className="welcome-message">Xin chào, quý khách!</span>
        <LogoutOutlined className="logout-icon" onClick={handleLogout} />
      </div>
    </Header>
  );
};

export default AccountHeader;