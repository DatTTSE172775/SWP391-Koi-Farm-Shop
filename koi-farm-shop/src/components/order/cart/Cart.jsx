// src/components/cart/CartPage.jsx

import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Image,
  InputNumber,
  Row,
  Table,
  Typography,
} from "antd";
import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../../../assets/koi-list/koiImg1.jpg";
import "./Cart.scss";

const { Title, Text } = Typography;

const Cart = () => {
  // Dữ liệu mẫu cho giỏ hàng
  const cartData = [
    {
      key: "1",
      image: placeholderImage,
      name: "Kohaku Koi",
      price: 2000000,
      quantity: 2,
      total: 4000000,
    },
    {
      key: "2",
      image: placeholderImage,
      name: "Showa Koi",
      price: 1800000,
      quantity: 1,
      total: 1800000,
    },
    // Thêm các sản phẩm khác nếu cần
  ];

  // Định nghĩa các cột cho bảng
  const columns = [
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Image
          src={record.image}
          alt={record.name}
          width={80}
          height={80}
          preview={false}
        />
      ),
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <Text>{price.toLocaleString()} VND</Text>,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => <InputNumber min={1} defaultValue={quantity} />,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => <Text strong>{total.toLocaleString()} VND</Text>,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Hành Động",
      key: "action",
      render: (text, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          // Thêm hàm xử lý xóa sản phẩm khi click
          onClick={() => handleRemove(record.key)}
        />
      ),
      responsive: ["sm", "md", "lg"],
    },
  ];

  // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (key) => {
    // Hiện tại, chỉ console log. Bạn sẽ cập nhật state sau khi kết nối với backend hoặc state management.
    console.log(`Remove product with key: ${key}`);
  };

  // Tổng tiền tất cả sản phẩm
  const totalPrice = cartData.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="cart-page">
      <Title level={2}>Giỏ Hàng Của Bạn</Title>
      <Table
        columns={columns}
        dataSource={cartData}
        pagination={false}
        className="cart-table"
        rowClassName="cart-row"
      />
      <Divider />
      <Row justify="end" className="cart-summary">
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className="summary-item">
            <Text>Tổng Tiền:</Text>
            <Text strong>{totalPrice.toLocaleString()} VND</Text>
          </div>
          {/* Bạn có thể thêm thuế, phí vận chuyển ở đây */}
          <div className="summary-actions">
            <Link to="/koi-list">
              <Button type="default" className="continue-shopping">
                Tiếp Tục Mua Sắm
              </Button>
            </Link>
            <Link to="/checkout">
              <Button type="primary" className="proceed-to-checkout">
                Thanh Toán
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
