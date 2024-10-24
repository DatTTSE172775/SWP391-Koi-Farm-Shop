import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import StaffHeader from "../../components/staff/header/StaffHeader";
import Sidebar from "../../components/staff/sidebar/StaffSidebar";
import "./StaffLayout.scss";

const { Content } = Layout;

const StaffLayout = () => {
  return (
    <Layout className="staff-layout">
      <StaffHeader />
      <Layout className="layout-container">
        <Sidebar />
        <Content className="content-layout">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffLayout;
