// OrderDetail.jsx
import { Button, Card, Divider, List, Space, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./OrderDetail.scss";

const { Title, Text } = Typography;

const OrderDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Giả lập API call để lấy dữ liệu đơn hàng dựa trên id
  useEffect(() => {
    const fetchOrder = async () => {
      // API giả lập (có thể thay bằng API thực tế)
      const fakeData = [
        {
          id: "ORD001",
          status: "Processing",
          createdAt: "2023-10-10",
          total: 500000,
          customerName: "Nguyễn Văn A",
          phoneNumber: "0123456789",
          address: "123 Đường ABC, Quận 1, TP.HCM",
          products: [
            { name: "Sản Phẩm 1", quantity: 2, price: 250000 },
            { name: "Sản Phẩm 2", quantity: 1, price: 100000 },
          ],
        },
        {
          id: "ORD002",
          status: "Shipped",
          createdAt: "2023-10-12",
          total: 1500000,
          customerName: "Trần Thị B",
          phoneNumber: "0987654321",
          address: "456 Đường XYZ, Quận 2, TP.HCM",
          products: [
            { name: "Sản Phẩm 3", quantity: 1, price: 500000 },
          ],
        },
      ];

      const order = fakeData.find((o) => o.id === id);
      setOrder(order);
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Spin size="large" />;

  if (!order) return <Text>Đơn hàng không tồn tại.</Text>;

  const { customerName, address, phoneNumber, status, createdAt, total, products } = order;

  return (
    <div className="order-detail-container">
      <Title level={2}>Chi Tiết Đơn Hàng</Title>
      <Card className="order-detail-card">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="detail-info">
            <Title level={5}>Thông Tin Khách Hàng</Title>
            <p><Text strong>Họ Tên: </Text>{customerName}</p>
            <p><Text strong>Số Điện Thoại: </Text>{phoneNumber}</p>
            <p><Text strong>Địa Chỉ: </Text>{address}</p>
          </div>

          <Divider />

          <div className="detail-order-info">
            <Title level={5}>Thông Tin Đơn Hàng</Title>
            <p><Text strong>Mã Đơn Hàng: </Text>{id}</p>
            <p><Text strong>Ngày Tạo: </Text>{new Date(createdAt).toLocaleDateString()}</p>
            <p><Text strong>Trạng Thái: </Text>{status}</p>
            <p><Text strong>Tổng Giá: </Text>{total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
          </div>

          <Divider />

          <div className="order-products">
            <Title level={5}>Sản Phẩm Trong Đơn Hàng</Title>
            <List
              dataSource={products}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{item.name}</Text>}
                    description={`Số Lượng: ${item.quantity} - Giá: ${item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}`}
                  />
                </List.Item>
              )}
            />
          </div>

          <div className="detail-actions">
            <Button type="default">
              <Link to="/staff/orders/processing">Quay Lại</Link>
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default OrderDetail;
