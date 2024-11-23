import { Button, Card, Divider, notification, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [customerInfo, setCustomerInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await axiosInstance.get(`/customers/${order.CustomerID}`);
        setCustomerInfo(response.data);
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };

    fetchCustomerInfo();
  }, [order.CustomerID]);

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

        onRemove(order.OrderID); // Remove the order from the list
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
            <Text className="highlight-text">
              {customerInfo ? customerInfo.PhoneNumber : "Đang tải..."}
            </Text>
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
            <Text>{customerInfo ? customerInfo.FullName : "Đang tải..."}</Text>
          </div>
        </div>

        <div className="order-actions">
          <Space size="middle">
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
            <Button
                type="default"
                onClick={() => navigate(`/staff/orders/order-details/${order.OrderID}`)}
            >
              Xem chi tiết
            </Button>
          </Space>
        </div>
      </Card>
  );
};

export default OrderItem;
