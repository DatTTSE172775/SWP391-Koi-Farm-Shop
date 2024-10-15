import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Radio,
  Row,
  Typography,
} from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import momoLogo from "../../../assets/checkout/momo-logo.png";
import vnpayLogo from "../../../assets/checkout/vnpay-logo.png";
import { CartContext } from "../cart-context/CartContext";
import "./Checkout.scss";

const { Title, Text } = Typography;

const Checkout = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const onFinish = async (values) => {
    try {
      // Data to send to the backend
      const orderData = {
        customerID: "sampleCustomerId", // Replace with actual customer ID
        totalAmount: cartItems.reduce((total, item) => total + item.total, 0),
        shippingAddress: values.address,
        paymentMethod: values.paymentMethod,
      };

      // Call the API to create the order
      const response = await axiosInstance.post("/orders", orderData);

      if (response.status === 201) {
        notification.success({
          message: "Đặt hàng thành công",
          description: "Đơn hàng của bạn đã được tạo thành công!",
          placement: "topRight",
        });

        // Navigate to success page
        navigate("/order-success", {
          state: { cartItems, customerInfo: values },
        });
      }
    } catch (error) {
      notification.error({
        message: "Đặt hàng thất bại",
        description:
          error.response?.data?.error || "Đã xảy ra lỗi khi đặt hàng.",
        placement: "topRight",
      });
    }
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
              <Button type="primary" onClick={onFinish}>
                Xác Nhận Thanh Toán
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Phần Xem Lại Đơn Hàng */}
        <Col xs={24} lg={8}>
          <Card title="Đơn Hàng Của Bạn" bordered={false}>
            {/* Dữ liệu mẫu, bạn sẽ thay thế bằng dữ liệu thực tế sau */}
            <div className="order-summary">
              {cartItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <Text>{`1x ${item.name}`}</Text>
                  <Text strong>{`${item.price.toLocaleString()}`}</Text>
                </div>
              ))}
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
