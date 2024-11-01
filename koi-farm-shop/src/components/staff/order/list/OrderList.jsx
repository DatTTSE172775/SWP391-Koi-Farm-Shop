// OrderList.jsx
import { Empty, Typography } from "antd";
import React, { useState } from "react";
import OrderItem from "../order-item/OrderItem";
import "./OrderList.scss";

const { Title } = Typography;

const OrderList = ({ initialOrders, filterStatus }) => {
  const [orders, setOrders] = useState(initialOrders);

  console.log("Initial Orders:", initialOrders);

  // Move the Empty component outside the early return
  const emptyState = (
    <Empty
      description={`Không có đơn hàng ở trạng thái ${filterStatus}`}
      className="empty-state"
    />
  );

  // Hàm xóa đơn hàng khỏi danh sách sau khi cập nhật trạng thái
  const removeOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.OrderID !== orderId)
    );
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
      {!orders || orders.length === 0 ? (
        emptyState
      ) : (
        <div className="order-grid">
          {orders.map((order) => (
            <OrderItem
              key={order.OrderID}
              order={order}
              onRemove={removeOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
