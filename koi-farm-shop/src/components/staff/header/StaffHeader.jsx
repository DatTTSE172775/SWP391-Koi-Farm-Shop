import { LogoutOutlined } from "@mui/icons-material";
import { Avatar, Badge, Layout } from "antd";
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
        <Avatar
          size={40}
          style={{ backgroundColor: "#87d068" }}
          src="https://via.placeholder.com/40"
        />
        <span className="welcome-message">Xin chào, Staff!</span>
      </div>
      <div className="logout-section">
        <Badge dot>
          <LogoutOutlined className="logout-icon" onClick={handleLogout} />
        </Badge>
      </div>
    </Header>
  );
};

export default StaffHeader;
