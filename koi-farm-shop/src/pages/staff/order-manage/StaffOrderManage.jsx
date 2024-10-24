import { Layout, Spin, Typography, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import StaffHeader from "../../../components/staff/header/StaffHeader";
import OrderItem from "../../../components/staff/order-item/OrderItem";
import Sidebar from "../../../components/staff/sidebar/StaffSidebar";
import "./StaffOrderManage.scss";

const { Title } = Typography;

const StaffOrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  const user = JSON.parse(localStorage.getItem("user")); // Lấy user từ localStorage

  useEffect(() => {
    const fetchOrdersByUser = async () => {
      try {
        if (user && user.UserID) {
          const response = await axiosInstance.get(
            `/orders/user/${user.UserID}`
          );
          setOrders(response.data); // Lưu danh sách đơn hàng vào state
        } else {
          throw new Error("Không tìm thấy thông tin nhân viên.");
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        notification.error({
          message: "Lỗi",
          description: "Không thể tải danh sách đơn hàng. Vui lòng thử lại.",
        });
      } finally {
        setLoading(false); // Dừng trạng thái loading
      }
    };

    fetchOrdersByUser();
  }, [user]);

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <Layout className="staff-order-list">
      <Sidebar />
      <Layout>
        <StaffHeader />
        <Content className="staff-content">
          <Title level={2}>Quản lý đơn hàng</Title>
          <div className="orders-list">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem key={order.orderId} order={order} />
              ))
            ) : (
              <p>Không có đơn hàng nào được giao.</p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffOrderManage;
