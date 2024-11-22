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
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../components/order/cart-context/CartContext";
import "./CartPage.scss";

const { Title, Text } = Typography;

const CartPage = () => {
  const { cartItems, handleRemoveFromCart, handleUpdateQuantity  } = useContext(CartContext);
console.log("Cart Items:", cartItems);
  // Define columns for the table
  const columns = [
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text, record) => {
        // Handle both full URLs and relative paths
        const imageUrl = record.image && record.image.startsWith('http') 
          ? record.image 
          : `${process.env.REACT_APP_BASE_URL}${record.image}`;
          
        return (
          <Image
            src={imageUrl}
            alt={record.name}
            width={80}
            height={140}
            preview={false}
          />
        );
      },
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
      render: (quantity, record) => (
          record.type === 'package' ? (
              <InputNumber
                  min={1}
                  value={quantity}
                  onChange={(value) => handleUpdateQuantity(record.key, value)}
              />
          ) : (
              <InputNumber min={1} max={1} value={quantity} disabled />
          )
      ),
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
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveFromCart(record.key)}
        />
      ),
      responsive: ["sm", "md", "lg"],
    },
  ];

  // Calculate total price of all items
  const totalPrice = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="cart-page">
      <Title level={2}>Giỏ Hàng Của Bạn</Title>
      <Table
        columns={columns}
        dataSource={cartItems}
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
          {/* Add tax or shipping fees here if needed */}
          <div className="summary-actions">
            <Link to="/koi-list">
              <Button type="default" className="continue-shopping">
                Tiếp Tục Mua Sắm
              </Button>
            </Link>
            <Link to={cartItems.length > 0 ? "/checkout" : "#"}>
              <Button type="primary" className="proceed-to-checkout" disabled={cartItems.length === 0}>
                Thanh Toán
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
