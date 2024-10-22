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

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignee, setAssignee] = useState("");
  const [staffList, setStaffList] = useState([]);

  // Fetch order details from the API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/orders/${orderId}`);
        setOrder(response.data);
        setAssignee(response.data.assignedTo || "Chưa giao");
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Đơn hàng không tồn tại.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Fetch staff list from the API
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axiosInstance.get("/staff");
        setStaffList(response.data);
      } catch (err) {
        console.error("Failed to fetch staff:", err);
        message.error("Không thể lấy danh sách nhân viên.");
      }
    };

    fetchStaff();
  }, []);

  const handleAssigneeChange = (value) => {
    setAssignee(value);
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
                {order.OrderStatus === "Pending" ? (
                  <Select
                    value={assignee}
                    onChange={handleAssigneeChange}
                    style={{ width: "100%" }}
                  >
                    {staffList.map((staff) => (
                      <Option key={staff.UserID} value={staff.Username}>
                        {staff.Username}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Typography.Text>{assignee}</Typography.Text>
                )}
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
