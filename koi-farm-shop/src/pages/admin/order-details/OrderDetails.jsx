// src/pages/admin/OrderDetails.jsx

import { Button, Card, Col, Divider, Layout, Row, Typography } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import "./OrderDetails.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const sampleOrders = [
  {
    id: "ORD001",
    productName: "Kohaku Koi",
    date: "2024-10-01",
    price: 2000000,
    assignedTo: "Staff A",
    status: "Đang xử lý",
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  },
  {
    id: "ORD002",
    productName: "Showa Koi",
    date: "2024-10-03",
    price: 1800000,
    assignedTo: "Chưa giao",
    status: "Chưa xử lý",
    customer: "Trần Văn B",
    phone: "0912345678",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
  },
  {
    id: "ORD003",
    productName: "Shiro Utsuri Koi",
    date: "2024-10-04",
    price: 1500000,
    assignedTo: "Staff B",
    status: "Đã hoàn thành",
    customer: "Trần Văn B",
    phone: "0912345678",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
  },
  // Thêm dữ liệu khác nếu cần
];

const OrderDetails = () => {
  const { orderId } = useParams(); // Lấy mã đơn hàng từ URL
  const navigate = useNavigate();

  // Tìm kiếm thông tin đơn hàng từ sampleOrders
  const order = sampleOrders.find((o) => o.id === orderId);

  if (!order) {
    return <div>Đơn hàng không tồn tại.</div>;
  }

  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <Card className="order-details-card">
            <Title level={3}>Chi Tiết Đơn Hàng: {order.id}</Title>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Text strong>Tên Sản Phẩm:</Text>
                <Text>{order.productName}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text strong>Ngày Đặt Hàng:</Text>
                <Text>{order.date}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text strong>Giá:</Text>
                <Text>{order.price.toLocaleString()} VND</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text strong>Trạng Thái:</Text>
                <Text>{order.status}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text strong>Người Phụ Trách:</Text>
                <Text>{order.assignedTo}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text strong>Khách Hàng:</Text>
                <Text>{order.customer}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text strong>Số Điện Thoại:</Text>
                <Text>{order.phone}</Text>
              </Col>
              <Col xs={24} md={12}>
                <Text strong>Địa Chỉ Giao Hàng:</Text>
                <Text>{order.address}</Text>
              </Col>
            </Row>
            <Divider />
            <Button
              type="default"
              onClick={() => navigate("/admin/manage-orders")}
            >
              Quay Lại Danh Sách Đơn Hàng
            </Button>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrderDetails;
