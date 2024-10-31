// ShippedOrders.jsx
import { Spin, notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../../../../components/staff/order/list/OrderList";
import { fetchOrdersByUser } from "../../../../store/actions/orderActions";

const ShippedOrders = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  console.log('User ID from localStorage:', userId);
  // Lấy dữ liệu từ store Redux
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrdersByUser(userId));
  }, [dispatch]);

  if (loading) return <Spin tip="Đang tải đơn hàng..." />;
  if (error) {
    notification.error({
      message: "Lỗi",
      description: "Không thể tải đơn hàng.",
    });
    return <div>Error: {error}</div>;
  }

  // Lọc các đơn hàng với trạng thái "Shipped"
  const shippedOrders = orders.filter(
    (order) => order.OrderStatus === "Delivering"
  );

  return <OrderList initialOrders={shippedOrders} filterStatus="Delivering" />;
};

export default ShippedOrders;
