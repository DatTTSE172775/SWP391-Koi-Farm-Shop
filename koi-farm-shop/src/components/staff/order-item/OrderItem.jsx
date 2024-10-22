import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Select, Typography, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance"; // Sử dụng axios để gửi API
import "./OrderItem.scss";

const { Text } = Typography;
const { Option } = Select;

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = async (value) => {
    try {
      setStatus(value); // Cập nhật trạng thái tạm thời

      // Gửi API call để cập nhật trạng thái đơn hàng trong backend
      const response = await axiosInstance.patch(`/orders/${order.id}`, {
        status: value,
      });

      // Hiển thị thông báo thành công nếu cập nhật thành công
      notification.success({
        message: "Cập Nhật Thành Công",
        description: `Trạng thái của đơn hàng ${order.id} đã được cập nhật thành ${value}.`,
      });

      console.log(`Order ${order.id} status updated to: ${value}`, response);
    } catch (error) {
      console.error("Failed to update order status:", error);

      // Hiển thị thông báo lỗi nếu cập nhật thất bại
      notification.error({
        message: "Cập Nhật Thất Bại",
        description:
          "Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại.",
      });
    }
  };

  return (
    <Card className="staff-order-item-card">
      <Row gutter={[16, 16]} align="middle">
        {/* Order Info */}
        <Col xs={24} md={4}>
          <Text strong>Mã Đơn Hàng:</Text>
          <Text> {order.id}</Text>
        </Col>
        <Col xs={24} md={5}>
          <Text strong>Tên Sản Phẩm:</Text>
          <Text> {order.productName}</Text>
        </Col>
        <Col xs={24} md={4}>
          <Text strong>Ngày Đặt Hàng:</Text>
          <Text> {new Date(order.date).toLocaleDateString()}</Text>
        </Col>
        <Col xs={24} md={3}>
          <Text strong>Giá:</Text>
          <Text> {order.price.toLocaleString()} VND</Text>
        </Col>

        {/* Order Status Selection */}
        <Col xs={24} md={4}>
          <Text strong>Trạng Thái:</Text>
          <Select
            value={status}
            onChange={handleStatusChange}
            className={`status-select status-${status
              .replace(/ /g, "-")
              .toLowerCase()}`}
          >
            <Option value="Đang chờ">Đang chờ</Option>
            <Option value="Đang xử lý">Đang xử lý</Option>
            <Option value="Đang giao">Đang giao</Option>
            <Option value="Đã giao">Đã giao</Option>
            <Option value="Đã hủy">Đã hủy</Option>
          </Select>
        </Col>

        {/* View Details Button */}
        <Col xs={24} md={4}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/staff/manage-orders/${order.id}`)}
            className="view-details-button"
          >
            Xem Chi Tiết
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderItem;
