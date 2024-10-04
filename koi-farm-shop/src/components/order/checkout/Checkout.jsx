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
import React from "react";
import { useNavigate } from "react-router-dom";
import momoLogo from "../../../assets/checkout/momo-logo.png";
import vnpayLogo from "../../../assets/checkout/vnpay-logo.png";
import "./Checkout.scss";

const { Title, Text } = Typography;

const Checkout = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Xử lý thanh toán ở đây (sau này tích hợp với backend)
    navigate("/order-success");
  };

  return (
    <div className="checkout-page">
      <Title level={2} className="checkout-title">
        Thanh Toán
      </Title>
      <Row gutter={16}>
        {/* Phần Thông Tin Giao Hàng */}
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

              {/* Phần Hình Thức Thanh Toán */}
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

              {/* Nút Xác Nhận Thanh Toán */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  onClick={onFinish}
                >
                  Xác Nhận Thanh Toán
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Phần Xem Lại Đơn Hàng */}
        <Col xs={24} lg={8}>
          <Card title="Đơn Hàng Của Bạn" bordered={false}>
            {/* Dữ liệu mẫu, bạn sẽ thay thế bằng dữ liệu thực tế sau */}
            <div className="order-summary">
              <div className="order-item">
                <Text>1x Kohaku Koi</Text>
                <Text strong>2,000,000 VND</Text>
              </div>
              <div className="order-item">
                <Text>1x Showa Koi</Text>
                <Text strong>1,800,000 VND</Text>
              </div>
              <Divider />
              <div className="order-total">
                <Text>Tổng Tiền:</Text>
                <Text strong>3,800,000 VND</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
