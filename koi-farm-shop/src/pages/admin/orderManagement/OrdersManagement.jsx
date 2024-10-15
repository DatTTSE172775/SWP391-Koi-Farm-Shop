import { Layout, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import OrderItem from "../../../components/admin/order-item/OrderItem";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import { fetchOrders } from "../../../store/actions/orderActions";
import "./OrdersManagement.scss";

const { Content } = Layout;
const { Title } = Typography;

// const sampleOrders = [
//   {
//     id: "ORD001",
//     productName: "Kohaku Koi",
//     date: "2024-10-01",
//     price: 2000000,
//     assignedTo: "Staff A",
//     status: "Đang xử lý",
//   },
//   {
//     id: "ORD002",
//     productName: "Showa Koi",
//     date: "2024-10-03",
//     price: 1800000,
//     assignedTo: "Chưa giao",
//     status: "Chưa xử lý",
//   },
//   {
//     id: "ORD003",
//     productName: "Shiro Utsuri Koi",
//     date: "2024-10-04",
//     price: 1500000,
//     assignedTo: "Staff B",
//     status: "Đã hoàn thành",
//   },
// ];

const OrdersManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <Title level={2}>Quản Lý Đơn Hàng</Title>
          {loading && <p>Đang tải...</p>}
          {error && <p>{error}</p>}
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
export default OrdersManagement;
