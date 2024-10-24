// DeliveredOrders.jsx
import { Spin, notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../../../../components/staff/order/list/OrderList";
import { fetchOrdersByUser } from "../../../../store/actions/orderActions";

const DeliveredOrders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    const userId = 3; // ID của nhân viên, giả sử thanhdat
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

  // Lọc các đơn hàng có trạng thái "Delivered"
  const deliveredOrders = orders.filter(
    (order) => order.OrderStatus === "Delivered"
  );

  return <OrderList initialOrders={deliveredOrders} filterStatus="Delivered" />;
};

export default DeliveredOrders;
