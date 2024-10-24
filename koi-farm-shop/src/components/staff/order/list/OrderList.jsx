// OrderList.jsx
import { Empty, Typography, notification } from "antd";
import React, { useEffect, useState } from "react";
import OrderItem from "../order-item/OrderItem";
import "./OrderList.scss";

const { Title } = Typography;

const OrderList = ({ initialOrders, filterStatus }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const filteredOrders = initialOrders.filter(
      (order) => order.status === filterStatus
    );
    setOrders(filteredOrders);
  }, [initialOrders, filterStatus]);

  const handleUpdateStatus = (orderId, nextStatus) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((order) =>
          order.id === orderId ? { ...order, status: nextStatus } : order
        )
        .filter((order) => order.status === filterStatus)
    );

    notification.success({
      message: "Cập nhật thành công",
      description: `Đơn hàng đã chuyển sang trạng thái ${nextStatus}.`,
      placement: "topRight",
      duration: 3,
    });
  };

  return (
    <div className="order-list-container">
      <Title level={3} className="list-title">
        {filterStatus === "Processing"
          ? "Đơn Hàng Đang Xử Lý"
          : filterStatus === "Shipped"
          ? "Đơn Hàng Đang Giao"
          : filterStatus === "Delivered"
          ? "Đơn Hàng Đã Giao"
          : "Đơn Hàng Đã Hủy"}
      </Title>
      {orders.length > 0 ? (
        <div className="order-grid">
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      ) : (
        <Empty description="Không có đơn hàng" className="empty-state" />
      )}
    </div>
  );
};

export default OrderList;
