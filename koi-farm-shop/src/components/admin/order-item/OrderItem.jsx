import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Select, Tag, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderItem.scss";

const { Text } = Typography;
const { Option } = Select;

const OrderItem = ({ order }) => {
  const [assignee, setAssignee] = useState(order.assignedTo || "Chưa giao");
  const navigate = useNavigate();

  const handleAssigneeChange = (value) => {
    setAssignee(value);
    // Logic để cập nhật người phụ trách đơn hàng vào hệ thống hoặc backend
    console.log(`Order ${order.id} assigned to: ${value}`);
  };

  return (
    <Card className="order-item-card">
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
        <Col xs={24} md={3}>
          <Text strong>Ngày Đặt Hàng:</Text>
          <Text>{order.date}</Text>
        </Col>
        <Col xs={24} md={3}>
          <Text strong>Giá:</Text>
          <Text>{order.price.toLocaleString()} VND</Text>
        </Col>

        {/* Assignee Selection */}
        <Col xs={24} md={4}>
          <Text strong>Người Phụ Trách:</Text>
          <Select
            value={assignee}
            onChange={handleAssigneeChange}
            className="assignee-select"
          >
            <Option value="Chưa giao">Chưa giao</Option>
            <Option value="Staff A">Staff A</Option>
            <Option value="Staff B">Staff B</Option>
            <Option value="Staff C">Staff C</Option>
          </Select>
        </Col>

        {/* Order Status */}
        <Col xs={24} md={3}>
          <Text strong>Trạng Thái:</Text>
          <Tag color={order.status === "Đã hoàn thành" ? "green" : "orange"}>
            {order.status}
          </Tag>
        </Col>

        {/* View Details Button */}
        <Col xs={24} md={2}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/admin/manage-orders/${order.id}`)}
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
