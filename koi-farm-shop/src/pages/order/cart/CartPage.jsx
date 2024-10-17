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
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../components/order/cart-context/CartContext";
import "./CartPage.scss";

const { Title, Text } = Typography;

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, handleRemoveFromCart, handleUpdateQuantity } =
    useContext(CartContext);

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
          height={140}
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
      render: (price) => <Text>{price.toLocaleString()}</Text>,
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          defaultValue={quantity}
          onChange={(value) => handleUpdateQuantity(record.key, value)}
        />
      ),
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => <Text strong>{total.toLocaleString()}</Text>,
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

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  // Tổng tiền tất cả sản phẩm
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
            <Text strong>{totalPrice.toLocaleString()}</Text>
          </div>
          {/* Bạn có thể thêm thuế, phí vận chuyển ở đây */}
          <div className="summary-actions">
            =
            <Button
              type="default"
              className="continue-shopping"
              onClick={() => navigate("/koi-list")}
            >
              Tiếp Tục Mua Sắm
            </Button>
            =
            <Button
              type="primary"
              className="proceed-to-checkout"
              onClick={handleCheckOut}
            >
              Thanh Toán
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
