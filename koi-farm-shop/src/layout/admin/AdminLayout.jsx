import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import "./AdminLayout.scss";
import AdminHeader from "../../components/admin/header/AdminHeader";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";

const { Content } = Layout;

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-layout__sidebar">
                <AdminSidebar />
            </aside>

            <div className="admin-layout__wrapper">
                {/* Header */}
                <header className="admin-layout__header">
                    <AdminHeader />
                </header>

                {/* Main Content */}
                <main className="admin-layout__main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
