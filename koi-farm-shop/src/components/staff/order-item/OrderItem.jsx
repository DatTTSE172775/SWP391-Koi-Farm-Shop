import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Select, Typography } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderItem.scss";

const { Text } = Typography;

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = (value) => {
    setStatus(value);
    // Logic để cập nhật trạng thái đơn hàng vào hệ thống hoặc backend
    console.log(`Order ${order.id} status updated to: ${value}`);
  };

  return (
    <Card className="staff-order-item-card">
      <Row gutter={[16, 16]} align="middle">
        {/* Order Info */}
        <Col xs={24} md={4}>
          <Text strong>Mã Đơn Hàng:</Text>
          <Text>{order.id}</Text>
        </Col>
        <Col xs={24} md={5}>
          <Text strong>Tên Sản Phẩm:</Text>
          <Text>{order.productName}</Text>
        </Col>
        <Col xs={24} md={4}>
          <Text strong>Ngày Đặt Hàng:</Text>
          <Text>{order.date}</Text>
        </Col>
        <Col xs={24} md={3}>
          <Text strong>Giá:</Text>
          <Text>{order.price.toLocaleString()}</Text>
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
