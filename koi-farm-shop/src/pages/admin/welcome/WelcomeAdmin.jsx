import { Layout, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/actions/authActions";
import { checkRoleAccess } from "../../../utils/roleUtils";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import "./WelcomeAdmin.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!checkRoleAccess(role, ["Manager"])) {
      dispatch(logout());
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <div className="welcome-container">
            <Title level={2}>Chào mừng đến với Admin Portal</Title>
            <Text>Đây là trang quản lý dành riêng cho quản trị viên.</Text>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WelcomeAdmin;
