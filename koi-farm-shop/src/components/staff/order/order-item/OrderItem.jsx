// OrderItem.jsx
import { Button, Card, Divider, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./OrderItem.scss";

const { Title, Text } = Typography;

const getNextStatus = (status) => {
  switch (status) {
    case "Processing":
      return "Shipped";
    case "Shipped":
      return "Delivered";
    default:
      return null; // Delivered and Cancelled don't have next status
  }
};

const shouldShowUpdateButton = (status) => {
  return status === "Processing" || status === "Shipped";
};

const OrderItem = ({ order, onUpdateStatus }) => {
  const { id, createdAt, total, customerName, phoneNumber, address, status } =
    order;

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus(status);
    if (nextStatus) {
      onUpdateStatus(id, nextStatus);
    }
  };

  return (
    <Card className="order-item" bordered={false}>
      <div className="order-main-info">
        <div>
          <Title level={5}>Địa chỉ:</Title>
          <Text className="highlight-text">{address}</Text>
        </div>
        <div>
          <Title level={5}>Số điện thoại:</Title>
          <Text className="highlight-text">{phoneNumber}</Text>
        </div>
        <div>
          <Title level={5}>Giá:</Title>
          <Text className="price-text">
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </div>
      </div>

      <Divider />

      <div className="order-details">
        <div>
          <Text strong>Mã đơn hàng:</Text> <Text>{id}</Text>
        </div>
        <div>
          <Text strong>Ngày tạo:</Text>{" "}
          <Text>{new Date(createdAt).toLocaleDateString()}</Text>
        </div>
        <div>
          <Text strong>Họ tên khách hàng:</Text> <Text>{customerName}</Text>
        </div>
      </div>

      <div className="order-actions">
        <Space size="middle">
          <Button type="default" className="detail-button">
            <Link to={`/staff/orders/${order.id}`}>Xem Chi Tiết</Link>
          </Button>
          {shouldShowUpdateButton(status) && (
            <Button
              type="primary"
              className="update-button"
              onClick={handleStatusUpdate}
            >
              {status === "Processing"
                ? "Chuyển sang Đang Giao"
                : "Chuyển sang Đã Giao"}
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
};

export default OrderItem;
