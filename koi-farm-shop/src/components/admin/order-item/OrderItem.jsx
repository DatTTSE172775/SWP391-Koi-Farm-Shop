import { EyeOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Dropdown,
  Menu,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import PropTypes from "prop-types"; // Import PropTypes for props validation
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderItem.scss";

const { Text, Title } = Typography;

const statusColors = {
  Pending: "orange",
  Processing: "blue",
  Shipped: "purple",
  Delivered: "green",
  Cancelled: "red",
};

const staffList = ["Chưa giao", "Staff A", "Staff B", "Staff C"]; // Mock staff list

const OrderItem = ({ order }) => {
  const [assignee, setAssignee] = useState(order.assignedTo || "Chưa giao");
  const navigate = useNavigate();

  const handleAssigneeChange = ({ key }) => {
    setAssignee(key);
    console.log(`Order ${order.OrderID} assigned to: ${key}`);
  };

  const assigneeMenu = (
    <Menu onClick={handleAssigneeChange}>
      {staffList.map((staff) => (
        <Menu.Item key={staff}>
          <Text>{staff}</Text>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Card className="order-item-card">
      <Row align="middle" gutter={[16, 24]}>
        {/* Order Tracking Number */}
        <Col xs={24} md={5}>
          <Space direction="vertical">
            <Title level={5}>Mã Số Đơn Hàng</Title>
            <Text>{order.TrackingNumber}</Text>
          </Space>
        </Col>

        {/* Order Date */}
        <Col xs={12} md={4}>
          <Title level={5}>Ngày Đặt Hàng</Title>
          <Text>{new Date(order.OrderDate).toLocaleDateString()}</Text>
        </Col>

        {/* Order Price */}
        <Col xs={12} md={4}>
          <Title level={5}>Giá</Title>
          <Text strong>{order.TotalAmount.toLocaleString()} VND</Text>
        </Col>

        {/* Assignee Selection with Dropdown */}
        <Col xs={12} md={5}>
          <Title level={5}>Nhân Viên Phụ Trách</Title>
          <Dropdown overlay={assigneeMenu} trigger={["click"]}>
            <a
              onClick={(e) => e.preventDefault()}
              className="editable-assignee"
            >
              {assignee}
            </a>
          </Dropdown>
        </Col>

        {/* Order Status Display */}
        <Col xs={12} md={4}>
          <Title level={5}>Trạng Thái Đơn Hàng</Title>
          <Tag
            color={statusColors[order.OrderStatus]}
            className="order-status-tag"
          >
            {order.OrderStatus}
          </Tag>
        </Col>

        {/* View Details Icon */}
        <Col xs={24} md={2}>
          <Tooltip title="Xem Chi Tiết">
            <EyeOutlined
              className="view-icon"
              onClick={() => navigate(`/admin/manage-orders/${order.OrderID}`)}
            />
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
};

// PropTypes for Validation
OrderItem.propTypes = {
  order: PropTypes.shape({
    OrderID: PropTypes.number.isRequired,
    TrackingNumber: PropTypes.string.isRequired,
    OrderDate: PropTypes.string.isRequired,
    TotalAmount: PropTypes.number.isRequired,
    OrderStatus: PropTypes.string.isRequired,
    assignedTo: PropTypes.string,
  }).isRequired,
};

export default OrderItem;
