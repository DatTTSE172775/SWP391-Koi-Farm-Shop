import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Typography,
} from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import momoLogo from "../../../assets/checkout/momo-logo.png";
import vnpayLogo from "../../../assets/checkout/vnpay-logo.png";
import { CartContext } from "../cart-context/CartContext";
import "./Checkout.scss";

const { Title, Text } = Typography;

const Checkout = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  // Function to calculate total amount dynamically
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    // Ensure that we only pass clean data to navigate
    const serializedCartItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const serializedCustomerInfo = { ...values };

    // Navigate to the success page with serializable state
    navigate("/order-success", {
      state: {
        cartItems: serializedCartItems,
        customerInfo: serializedCustomerInfo,
      },
    });
  };

  return (
    <div className="checkout-page">
      <Title level={2} className="checkout-title">
        Thanh Toán
      </Title>
      <Row gutter={16}>
        {/* Shipping Information Section */}
        <Col xs={24} lg={16}>
          <Card title="Thông Tin Giao Hàng" bordered={false}>
            <Form
              form={form}
              layout="vertical"
              name="shippingForm"
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="fullName"
                    label="Họ và Tên"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập họ và tên!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="Số Điện Thoại"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                      {
                        pattern: /^\d{10,11}$/,
                        message: "Số điện thoại không hợp lệ!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="address"
                label="Địa Chỉ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ!",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Form.Item>
                <Divider />
              </Form.Item>

              {/* Payment Method Section */}
              <Form.Item
                name="paymentMethod"
                label="Hình Thức Thanh Toán"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hình thức thanh toán!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value="momo" className="payment-option">
                    <img src={momoLogo} alt="Momo" className="payment-logo" />
                    Momo
                  </Radio.Button>
                  <Radio.Button value="vnpay" className="payment-option">
                    <img src={vnpayLogo} alt="VNPAY" className="payment-logo" />
                    VNPAY
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Divider />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Xác Nhận Thanh Toán
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Order Review Section */}
        <Col xs={24} lg={8}>
          <Card title="Đơn Hàng Của Bạn" bordered={false}>
            <div className="order-summary">
              {cartItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <Text>{`${item.quantity}x ${item.name}`}</Text>
                  <Text strong>{`${(
                    item.price * item.quantity
                  ).toLocaleString()} VND`}</Text>
                </div>
              ))}
              <Divider />
              <div className="order-total">
                <Text>Tổng Tiền:</Text>
                <Text strong>{`${calculateTotal().toLocaleString()} VND`}</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
