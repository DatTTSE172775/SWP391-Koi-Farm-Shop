import { Alert, Layout, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import OrderItem from "../../../components/admin/order-item/OrderItem";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import { fetchOrders } from "../../../store/actions/orderActions";

const { Content } = Layout;
const { Title } = Typography;

const OrdersManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  // Ensure orders is always an array before mapping
  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <Title level={2}>Quản Lý Đơn Hàng</Title>
          <div className="orders-list">
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem key={order.OrderID} order={order} />
              ))
            ) : (
              <p>No orders available.</p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrdersManagement;
