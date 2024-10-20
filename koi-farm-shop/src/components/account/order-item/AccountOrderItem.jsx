import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Tag, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccountOrderItem.scss";

const { Text } = Typography;

const AccountOrderItem = ({ order }) => {
  const navigate = useNavigate();

  return (
    <Card className="account-order-item-card">
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
            onClick={() => navigate(`/account/orders/${order.id}`)}
            className="view-details-button"
          >
            Xem Chi Tiết
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default AccountOrderItem;