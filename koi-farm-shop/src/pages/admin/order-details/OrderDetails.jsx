// src/pages/admin/OrderDetails.jsx

import {
  Alert,
  Button,
  Card,
  Descriptions,
  Divider,
  Layout,
  Row,
  Select,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import "./OrderDetails.scss";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const statusColors = {
  Pending: "orange",
  Processing: "blue",
  Shipped: "purple",
  Delivered: "green",
  Cancelled: "red",
};

// Mock list of staff
const staffList = ["Chưa giao", "Staff A", "Staff B", "Staff C"];

const OrderDetails = () => {
  const { orderId } = useParams(); // Get orderId from URL params
  const navigate = useNavigate();

  const [order, setOrder] = useState(null); // Store order details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [assignee, setAssignee] = useState(""); // Assigned staff

  // Fetch order details from the API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/orders/${orderId}`);
        setOrder(response.data);
        setAssignee(response.data.assignedTo || "Chưa giao"); // Set current assignee
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Đơn hàng không tồn tại.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleAssigneeChange = (value) => {
    setAssignee(value); // Update the state
    message.success(`Đã giao đơn hàng cho ${value}`);
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <Card className="order-details-card">
            <Title level={3} className="title">
              Chi Tiết Đơn Hàng: {order.OrderID}
            </Title>
            <Divider />
            <Descriptions
              title="Thông Tin Đơn Hàng"
              bordered
              layout="vertical"
              column={2}
              size="middle"
            >
              <Descriptions.Item label="Mã Số Đơn Hàng">
                {order.TrackingNumber || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày Đặt Hàng">
                {new Date(order.OrderDate).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Giá">
                {order.TotalAmount.toLocaleString()} VND
              </Descriptions.Item>
              <Descriptions.Item label="Trạng Thái">
                <Tag color={statusColors[order.OrderStatus]}>
                  {order.OrderStatus}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Địa Chỉ Giao Hàng" span={2}>
                {order.ShippingAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Phương Thức Thanh Toán">
                {order.PaymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Nhân Viên Phụ Trách">
                <Select
                  value={assignee}
                  onChange={handleAssigneeChange}
                  style={{ width: "100%" }}
                >
                  {staffList.map((staff) => (
                    <Option key={staff} value={staff}>
                      {staff}
                    </Option>
                  ))}
                </Select>
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Row justify="end">
              <Button
                type="primary"
                onClick={() => navigate("/admin/manage-orders")}
                className="back-button"
              >
                Quay Lại Danh Sách Đơn Hàng
              </Button>
            </Row>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrderDetails;
