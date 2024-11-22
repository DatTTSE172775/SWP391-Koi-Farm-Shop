import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Radio,
    Row, Select,
    Typography,
} from "antd";
import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createOrder} from "../../../store/actions/orderActions";
import {CartContext} from "../cart-context/CartContext";
import "./Checkout.scss";
import axiosInstance from "../../../api/axiosInstance";
import {fetchDistricts, fetchProvinces, fetchWards} from "../../../store/actions/addressActions";
import {Option} from "antd/es/mentions";

const {Title, Text} = Typography;

const Checkout = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cartItems, clearCart} = useContext(CartContext);

    const user = useSelector((state) => state.account.user);
    const {order, loading, error} = useSelector((state) => state.order);

    // Populate the form when user data is available
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                fullName: user.FullName || "",
                phone: user.PhoneNumber || "",
                email: user.Email || "",
                address: user.Address || "",
            });
        }
    }, [user, form]);

    // Generate a random tracking number
    const generateTrackingNumber = () => {
        const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
        return `VN${randomNumber}`;
    };

    // Calculate total amount from the cart items
    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    useEffect(() => {
        dispatch(fetchProvinces());
    }, [dispatch]);

    const {provinces, districts, wards} = useSelector((state) => state.address);

    // Handle form submission
    const onFinish = async (values) => {
        try {
            const trackingNumber = generateTrackingNumber();
            console.log("Generated tracking number:", trackingNumber);

            const {province, district, ward, addressDetails} = values;

            const provinceName = provinces.find((item) => item.code === province)?.name || "";
            const districtName = districts.find((item) => item.code === district)?.name || "";
            const wardName = wards.find((item) => item.code === ward)?.name || "";

            const fullAddress = `${addressDetails}, ${wardName}, ${districtName}, ${provinceName}`;
            console.log("Full Address:", fullAddress);

            // Consolidate cartItems into orderItems
            const orderItems = cartItems.map((item) => ({
                KoiID: item.type === 'koi' ? item.id : null,
                PackageID: item.type === 'package' ? item.id : null,
                quantity: item.quantity,
            }));

            const totalAmount = Math.round(calculateTotal());

            const orderData = {
                customerID: user ? user.id : 0,
                shippingAddress: fullAddress,
                paymentMethod: values.paymentMethod === 'VNPAY' ? 'Credit Card' : values.paymentMethod,
                orderItems,
                totalAmount,
                trackingNumber,
                discount: 0, // Set discount to 0 or fetch if available
                shippingCost: 0, // Set shipping cost to 0 or calculate if applicable
                promotionID: null, // Set promotionID if any, or keep it null
            };

            console.log("Final orderData:", orderData);

            const updateConsignmentStatus = async () => {
                for (const item of cartItems) {
                    if (item.type === 'koi') {
                        try {
                            console.log(`Updating consignment status for KoiID: ${item.id}`);
                            const response = await axiosInstance.patch(`/koiconsignment/${item.id}/sold`);
                            console.log('Update consignment response:', response);
                        } catch (error) {
                            console.error('Error updating consignment status:', error);
                        }
                    }
                }
            };

            if (values.paymentMethod === 'VNPAY') {
                try {
                    localStorage.setItem('pendingOrder', JSON.stringify({
                        ...orderData,
                        cartItems: cartItems
                    }));

                    const response = await axiosInstance.post('/payment/create', {
                        amount: calculateTotal(),
                        orderId: `ORDER_${Date.now()}`,
                        bankCode: '',
                        language: 'vn'
                    });

                    window.location.href = response.data.vnpUrl;
                } catch (error) {
                    console.error('Payment creation error:', error);
                }
            } else {
                try {
                    await dispatch(createOrder(orderData));
                    await updateConsignmentStatus();
                    clearCart(); // Clear the cart after successful order
                    navigate("/order-success", {state: {order: orderData}});
                } catch (error) {
                    console.error('Error processing COD order:', error);
                }
            }
        } catch (error) {
            console.log(error);
        }
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
                                        rules={[{required: true, message: "Vui lòng nhập họ và tên!"}]}
                                    >
                                        <Input placeholder="Nhập họ và tên"/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="phone"
                                        label="Số Điện Thoại"
                                        rules={[
                                            {required: true, message: "Vui lòng nhập số điện thoại!"},
                                            {pattern: /^\d{10,11}$/, message: "Số điện thoại không hợp lệ!"},
                                        ]}
                                    >
                                        <Input placeholder="Nhập số điện thoại"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {type: "email", message: "Email không hợp lệ!"},
                                    {required: true, message: "Vui lòng nhập email!"},
                                ]}
                            >
                                <Input placeholder="Nhập email"/>
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item
                                        name="province"
                                        rules={[{required: true, message: "Vui lòng chọn tỉnh/thành phố!"}]}
                                    >
                                        <Select
                                            placeholder="Chọn tỉnh/thành phố"
                                            onChange={(value) => dispatch(fetchDistricts(value))}
                                        >
                                            {provinces.map((province) => (
                                                <Option key={province.code} value={province.code}>
                                                    {province.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="district"
                                        rules={[{required: true, message: "Vui lòng chọn quận/huyện!"}]}
                                    >
                                        <Select
                                            placeholder="Chọn quận/huyện"
                                            onChange={(value) => dispatch(fetchWards(value))}
                                        >
                                            {districts.map((district) => (
                                                <Option key={district.code} value={district.code}>
                                                    {district.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="ward"
                                        rules={[{required: true, message: "Vui lòng chọn phường/xã!"}]}
                                    >
                                        <Select placeholder="Chọn phường/xã">
                                            {wards.map((ward) => (
                                                <Option key={ward.code} value={ward.code}>
                                                    {ward.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item name="addressDetails" label="Địa Chỉ">
                                <Input.TextArea
                                    rows={2}
                                    placeholder="Nhập số nhà, tên đường"
                                    rules={[{required: true, message: "Vui lòng nhập địa chỉ chi tiết!"}]}
                                />
                            </Form.Item>
                            <Divider/>
                            <Form.Item
                                name="paymentMethod"
                                label="Hình Thức Thanh Toán"
                                rules={[{required: true, message: "Vui lòng chọn hình thức thanh toán!"}]}
                            >
                                <Radio.Group>
                                    <Radio.Button value="VNPAY">VNPAY</Radio.Button>
                                    <Radio.Button value="Cash on Delivery">Thanh toán khi nhận hàng</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Divider/>
                            <Button type="primary" htmlType="submit" block loading={loading} disabled={loading}>
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
                                <div key={item.key} className="order-item">
                                    <Text>{`${item.quantity}x ${item.name} (${item.type === 'koi' ? 'Single Fish' : 'Package'})`}</Text>
                                    <Text strong>{`${item.total.toLocaleString()} VND`}</Text>
                                </div>
                            ))}
                            <Divider/>
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