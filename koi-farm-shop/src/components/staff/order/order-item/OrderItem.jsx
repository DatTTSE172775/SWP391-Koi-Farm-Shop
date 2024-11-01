// OrderItem.jsx
import { Button, Card, Divider, notification, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../api/axiosInstance";
import "./OrderItem.scss";

const { Title, Text } = Typography;

const getNextStatus = (status) => {
  switch (status) {
    case "Processing":
      return "Delivering";
    case "Delivering":
      return "Delivered";
    default:
      return null;
  }
};

const shouldShowUpdateButton = (status) => {
  return status === "Processing" || status === "Delivering";
};

const OrderItem = ({ order, onRemove }) => {
  const handleStatusUpdate = async () => {
    const nextStatus = getNextStatus(order.OrderStatus);
    if (nextStatus) {
      try {
        await axiosInstance.patch(
          `/orders/${order.OrderID}/${nextStatus.toLowerCase()}`
        );
        notification.success({
          message: "Thành Công",
          description: `Đơn hàng đã chuyển sang trạng thái ${nextStatus}.`,
        });

        // Gọi hàm xóa đơn hàng khỏi danh sách sau khi cập nhật thành công
        onRemove(order.OrderID);
      } catch (error) {
        notification.error({
          message: "Lỗi",
          description: "Không thể cập nhật trạng thái đơn hàng.",
        });
      }
    }
  };

  return (
    <Card className="order-item" bordered={false}>
      <div className="order-main-info">
        <div>
          <Title level={5}>Địa chỉ:</Title>
          <Text className="highlight-text">{order.ShippingAddress}</Text>
        </div>
        <div>
          <Title level={5}>Số điện thoại:</Title>
          <Text className="highlight-text">{order.PhoneNumber}</Text>
        </div>
        <div>
          <Title level={5}>Giá:</Title>
          <Text className="price-text">
            {order.TotalAmount != null
                ? order.TotalAmount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
                : "N/A"}
          </Text>
        </div>
      </div>

      <Divider />

      <div className="order-details">
        <div>
          <Text strong>Mã đơn hàng:</Text> <Text>{order.OrderID}</Text>
        </div>
        <div>
          <Text strong>Ngày tạo:</Text>{" "}
          <Text>{new Date(order.OrderDate).toLocaleDateString()}</Text>
        </div>
        <div>
          <Text strong>Họ tên khách hàng:</Text>{" "}
          <Text>{order.CustomerName}</Text>
        </div>
      </div>

      <div className="order-actions">
        <Space size="middle">
          <Button type="default" className="detail-button">
            <Link to={`/staff/orders/${order.OrderID}`}>Xem Chi Tiết</Link>
          </Button>
          {shouldShowUpdateButton(order.OrderStatus) && (
            <Button
              type="primary"
              className="update-button"
              onClick={handleStatusUpdate}
            >
              {order.OrderStatus === "Processing"
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