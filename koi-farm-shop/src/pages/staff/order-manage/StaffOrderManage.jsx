import { Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import StaffHeader from "../../../components/staff/header/StaffHeader";
import OrderItem from "../../../components/staff/order-item/OrderItem";
import Sidebar from "../../../components/staff/sidebar/StaffSidebar";
import "./StaffOrderManage.scss";

const { Title } = Typography;

const StaffOrderManage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const assignedOrders = [
      {
        id: "ORD001",
        productName: "Kohaku Koi",
        date: "2024-10-01",
        price: 2000000,
        status: "Đang xử lý",
      },
      {
        id: "ORD002",
        productName: "Showa Koi",
        date: "2024-10-03",
        price: 1800000,
        status: "Đang giao",
      },
      {
        id: "ORD003",
        productName: "Shiro Utsuri Koi",
        date: "2024-10-04",
        price: 1500000,
        status: "Chưa xử lý",
      },
      {
        id: "ORD004",
        productName: "Hi Utsuri Koi",
        date: "2024-10-05",
        price: 2500000,
        status: "Đang xử lý",
      },
      {
        id: "ORD005",
        productName: "Goshiki Koi",
        date: "2024-10-06",
        price: 3000000,
        status: "Đã hoàn thành",
      },
      {
        id: "ORD006",
        productName: "Kujyaku Koi",
        date: "2024-10-07",
        price: 2200000,
        status: "Đang giao",
      },
      {
        id: "ORD007",
        productName: "Butterfly Koi",
        date: "2024-10-08",
        price: 2800000,
        status: "Đã hủy",
      },
      {
        id: "ORD008",
        productName: "Asagi Koi",
        date: "2024-10-09",
        price: 2100000,
        status: "Đã hoàn thành",
      },
      {
        id: "ORD009",
        productName: "Tancho Koi",
        date: "2024-10-10",
        price: 2500000,
        status: "Đang chờ",
      },
      {
        id: "ORD010",
        productName: "Doitsu Koi",
        date: "2024-10-11",
        price: 2300000,
        status: "Đang xử lý",
      },
      {
        id: "ORD011",
        productName: "Ginrin Koi",
        date: "2024-10-12",
        price: 2900000,
        status: "Đang giao",
      },
      {
        id: "ORD012",
        productName: "Kohaku Koi Premium",
        date: "2024-10-13",
        price: 3500000,
        status: "Đã hoàn thành",
      },
    ];
    setOrders(assignedOrders);
  }, []);

  return (
    <Layout className="staff-order-list">
      <Sidebar />
      <Layout>
        <StaffHeader />
        <Content className="staff-content">
          <Title level={2}>Quản lý đơn hàng</Title>
          <div className="orders-list">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default StaffOrderManage;
