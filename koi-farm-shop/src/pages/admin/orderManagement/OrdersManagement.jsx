import { Layout, Typography } from "antd";
import React from "react";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import OrderItem from "../../../components/admin/order-item/OrderItem";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import "./OrdersManagement.scss";

const { Content } = Layout;
const { Title } = Typography;

const sampleOrders = [
  {
    id: "ORD001",
    productName: "Kohaku Koi",
    date: "2024-10-01",
    price: 2000000,
    assignedTo: "Staff A",
    status: "Đang xử lý",
  },
  {
    id: "ORD002",
    productName: "Showa Koi",
    date: "2024-10-03",
    price: 1800000,
    assignedTo: "Chưa giao",
    status: "Chưa xử lý",
  },
  {
    id: "ORD003",
    productName: "Shiro Utsuri Koi",
    date: "2024-10-04",
    price: 1500000,
    assignedTo: "Staff B",
    status: "Đã hoàn thành",
  },
];

const OrdersManagement = () => {
  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <Title level={2}>Quản Lý Đơn Hàng</Title>
          <div className="orders-list">
            {sampleOrders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default OrdersManagement;
