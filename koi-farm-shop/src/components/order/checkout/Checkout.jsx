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
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserByUsername } from "../../../store/actions/accountActions";
import { createOrder } from "../../../store/actions/orderActions";
import { CartContext } from "../cart-context/CartContext";
import "./Checkout.scss";

const { Title, Text } = Typography;

const Checkout = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const user = useSelector((state) => state.account.user);
  const { order, loading, error } = useSelector((state) => state.order);

  // Fetch the username and trigger the API call to get user data
  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      console.error("No username found in localStorage");
      return;
    }

    console.log("Username from localStorage:", username);
    dispatch(fetchUserByUsername(username));
  }, [dispatch]);

  // Populate the form when user data is available
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.FullName,
        phone: user.PhoneNumber,
        email: user.Email,
        address: user.Address || "",
      });
    }
  }, [user, form]);

  // Navigate to order success page when order is created
  useEffect(() => {
    if (order) {
      console.log("Order created successfully:", order);
      navigate("/order-success", { state: { order } });
    }
  }, [order, navigate]);

  // Calculate total amount from the cart items
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Handle form submission
  const onFinish = (values) => {
    console.log("Form submitted with values:", values);

    const orderData = {
      totalAmount: calculateTotal(),
      shippingAddress: values.address,
      paymentMethod: values.paymentMethod,
    };

    console.log("Creating order with:", orderData);

    // Dispatch createOrder action
    dispatch(createOrder(orderData));
  };

  return (
    <div className="checkout-page">
      <Title level={2} className="checkout-title">
        Thanh Toán
      </Title>
      <Row gutter={16}>
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
                      { required: true, message: "Vui lòng nhập họ và tên!" },
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
                name="email"
                label="Email"
                rules={[
                  { type: "email", message: "Email không hợp lệ!" },
                  { required: true, message: "Vui lòng nhập email!" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa Chỉ"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input.TextArea rows={4} placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Divider />
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
                  <Radio.Button value="Credit Card">Credit Card</Radio.Button>
                  <Radio.Button value="Bank Transfer">
                    Bank Transfer
                  </Radio.Button>
                  <Radio.Button value="Cash on Delivery">
                    Cash on Delivery
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Divider />
              <Button type="primary" htmlType="submit" block loading={loading}>
                Xác Nhận Thanh Toán
              </Button>
              {error && <Text type="danger">{error}</Text>}
            </Form>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Đơn Hàng Của Bạn" bordered={false}>
            <div className="order-summary">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
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
