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
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assignOrder } from "../../../store/actions/orderActions"; // Import assign action
import { fetchStaff } from "../../../store/actions/staffActions";
import "./OrderItem.scss";

const { Text, Title } = Typography;

const statusColors = {
  Pending: "orange",
  Processing: "blue",
  Shipped: "purple",
  Delivered: "green",
  Cancelled: "red",
};

const OrderItem = ({ order }) => {
  const [assignee, setAssignee] = useState("Chưa giao");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch staff members from Redux store
  const { staff } = useSelector((state) => state.staff || { staff: [] });

  // Fetch staff list when component mounts
  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  // Update assignee when order or staff data changes
  useEffect(() => {
    if (order.UserID) {
      const assignedStaff = staff.find(
        (member) => member.UserID === order.UserID
      );
      if (assignedStaff) {
        setAssignee(assignedStaff.Username);
      }
    }
  }, [order.UserID, staff]);

  // Handle assigning order to a staff member
  const handleAssign = (userId, username) => {
    dispatch(assignOrder(order.OrderID, userId, username));
  };

  // Menu for selecting staff
  const assigneeMenu = (
    <Menu
      onClick={({ key }) =>
        handleAssign(key, staff.find((s) => s.UserID == key).Username)
      }
    >
      {staff.map((member) => (
        <Menu.Item key={member.UserID}>
          <Text>{member.Username}</Text>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Card className="order-item-card">
      <Row align="middle" gutter={[16, 24]}>
        <Col xs={24} md={5}>
          <Space direction="vertical">
            <Title level={5}>Mã Số Đơn Hàng</Title>
            <Text>{order.TrackingNumber || "N/A"}</Text>
          </Space>
        </Col>

        <Col xs={12} md={4}>
          <Title level={5}>Ngày Đặt Hàng</Title>
          <Text>{new Date(order.OrderDate).toLocaleDateString()}</Text>
        </Col>

        <Col xs={12} md={4}>
          <Title level={5}>Giá</Title>
          <Text strong>{order.TotalAmount.toLocaleString()} VND</Text>
        </Col>

        <Col xs={12} md={5}>
          <Title level={5}>Nhân Viên Phụ Trách</Title>
          {order.OrderStatus === "Pending" ? (
            <Dropdown overlay={assigneeMenu} trigger={["click"]}>
              <a
                onClick={(e) => e.preventDefault()}
                className="editable-assignee"
              >
                {assignee}
              </a>
            </Dropdown>
          ) : (
            <Text>{assignee}</Text>
          )}
        </Col>

        <Col xs={12} md={4}>
          <Title level={5}>Trạng Thái Đơn Hàng</Title>
          <Tag
            color={statusColors[order.OrderStatus]}
            className="order-status-tag"
          >
            {order.OrderStatus}
          </Tag>
        </Col>

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

OrderItem.propTypes = {
  order: PropTypes.shape({
    OrderID: PropTypes.number.isRequired,
    TrackingNumber: PropTypes.string,
    OrderDate: PropTypes.string.isRequired,
    TotalAmount: PropTypes.number.isRequired,
    OrderStatus: PropTypes.string.isRequired,
    UserID: PropTypes.number,
  }).isRequired,
};

export default OrderItem;
