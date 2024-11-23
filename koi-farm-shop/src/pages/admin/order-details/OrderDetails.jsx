import {
    Alert, Button, Card, Col, Divider, Layout, Row, Spin, Table, Typography, Select, Tag,
} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import {assignOrder} from "../../../store/actions/orderActions";
import {fetchStaff} from "../../../store/actions/staffActions";
import "./OrderDetails.scss";

const {Content} = Layout;
const {Title, Text} = Typography;
const {Option} = Select;


const statusColors = {
    Pending: "orange", // Chờ xử lý
    Processing: "blue", // Đang xử lý
    Shipped: "purple", // Đã giao hàng
    Delivered: "green", // Đã hoàn thành
    Cancelled: "red", // Đã hủy
};

const paymentColors = {
    Completed: "green", // Đã thanh toán
    Pending: "orange", // Đang chờ thanh toán
    Failed: "red", // Thanh toán thất bại
};

// Convert status to Vietnamese
const translateStatus = (status) => {
    const statusMap = {
        Pending: "Chờ xử lý",
        Processing: "Đang xử lý",
        Shipped: "Đã giao hàng",
        Delivered: "Đã hoàn thành",
        Cancelled: "Đã hủy",
    };
    return statusMap[status] || "Không xác định";
};

// Convert payment method to Vietnamese
const translatePaymentMethod = (method) => {
    if (method === "Bank Transfer" || method === "Credit Card") return "VN Pay";
    return method || "N/A";
};

// Convert payment status to Vietnamese
const translatePaymentStatus = (status, method) => {
    if (method === "VNPay") {
        return "Đã thanh toán";
    }

    const paymentStatusMap = {
        Completed: "Đã thanh toán", Pending: "Đang chờ thanh toán", Failed: "Thanh toán thất bại",
    };
    return paymentStatusMap[status] || "Không xác định";
};


const OrderDetails = () => {
    const {orderId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [assignee, setAssignee] = useState(""); // Selected assignee
    const {staff} = useSelector((state) => state.staff); // Redux state for staff

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axiosInstance.get(`orders/${orderId}`);
                setOrder(response.data);

                // Set assignee based on the UserID
                const assignedStaff = staff.find((member) => member.UserID === response.data.UserID);
                setAssignee(assignedStaff ? assignedStaff.Username : "Chưa giao");

                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch order:", err);
                setError("Đơn hàng không tồn tại.");
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId, staff]);

    useEffect(() => {
        dispatch(fetchStaff());
    }, [dispatch]);

    const handleAssign = async (userId) => {
        const assignedStaff = staff.find((member) => member.UserID === userId);
        const username = assignedStaff ? assignedStaff.Username : "Chưa giao";

        dispatch(assignOrder(orderId, userId, username));

        // Update local state to reflect changes immediately
        setAssignee(username);
        setOrder((prevOrder) => ({
            ...prevOrder, UserID: userId,
        }));
    };

    if (loading) {
        return <Spin size="large" className="loading-spinner"/>;
    }

    if (error) {
        return (<Alert message="Error" description={error} type="error" showIcon/>);
    }

    const products = [];

    // Thêm sản phẩm từ loại "Single Fish"
    if (order?.ProductTypes?.includes("Single Fish")) {
        const koiNames = order.KoiNames?.split(",") || [];
        const koiPrices = order.KoiPrices?.split(",") || [];
        const koiQuantities = order.KoiIDs?.split(",").map(() => 1) || [];

        koiNames.forEach((name, index) => {
            products.push({
                key: index + 1,
                ProductName: name.trim(),
                Quantity: koiQuantities[index] || 1,
                UnitPrice: parseFloat(koiPrices[index]) || 0,
                TotalPrice: (parseFloat(koiPrices[index]) || 0) * (koiQuantities[index] || 1),
                ImageLink: "/placeholder-fish.png", // Thay bằng ảnh thực tế nếu có
            });
        });
    }

    // Thêm sản phẩm từ loại "Package"
    if (order?.ProductTypes?.includes("Package")) {
        const packageNames = order.PackageNames?.split(",") || [];
        const packagePrices = order.PackagePrices?.split(",") || [];
        const packageQuantities = order.PackageIDs?.split(",").map(() => 1) || [];

        packageNames.forEach((name, index) => {
            products.push({
                key: products.length + 1,
                ProductName: name.trim(),
                Quantity: packageQuantities[index] || 1,
                UnitPrice: parseFloat(packagePrices[index]) || 0,
                TotalPrice: (parseFloat(packagePrices[index]) || 0) * (packageQuantities[index] || 1),
                ImageLink: "/placeholder-package.png", // Thay bằng ảnh thực tế nếu có
            });
        });
    }


    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "ProductName",
            key: "ProductName",
            render: (_, record) => (
                <div className="product-info">
                    <img
                        src={record.ImageLink || "https://placehold.co/50"}
                        alt={record.ProductName || "Product"}
                        className="product-image"
                    />
                    <div>
                        <Text strong>{record.ProductName || "N/A"}</Text>
                    </div>
                </div>
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "Quantity",
            key: "Quantity",
            render: (quantity) => quantity || "N/A",
        },
        {
            title: "Giá",
            dataIndex: "UnitPrice",
            key: "UnitPrice",
            render: (price) => `${price?.toLocaleString() || "N/A"} VND`,
        },
        {
            title: "Tổng",
            dataIndex: "TotalPrice",
            key: "TotalPrice",
            render: (total) => `${total?.toLocaleString() || "N/A"} VND`,
        },
    ];

    return (<Layout>
        <Content className="admin-content">
            <div className="order-details-container">
                <Button
                    type="link"
                    onClick={() => navigate("/admin/manage-orders")}
                    className="back-button"
                >
                    &lt; Quay lại
                </Button>
                <Title level={3} className="title">
                    Chi tiết đơn hàng
                </Title>
                <Divider/>

                {/* Thông Tin Đơn Hàng */}
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Card bordered className="info-card">
                            <p>
                                <Text strong>Mã đơn hàng:</Text> {order.OrderID || "N/A"}
                            </p>
                            <p>
                                <Text strong>Trạng thái đơn hàng:</Text>{" "}
                                <Tag color={statusColors[order.OrderStatus]}>
                                    {translateStatus(order.OrderStatus)}
                                </Tag>
                            </p>
                            <p>
                                <Text strong>Ngày đặt hàng:</Text>{" "}
                                {new Date(order.OrderDate).toLocaleDateString() || "N/A"}
                            </p>
                            <p>
                                <Text strong>Số theo dõi:</Text>{" "}
                                {order.TrackingNumber || "N/A"}
                            </p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered className="info-card">
                            <p>
                                <Text strong>Người đặt hàng:</Text> {order.FullName || "N/A"}
                            </p>
                            <p>
                                <Text strong>Email:</Text> {order.Email || "N/A"}
                            </p>
                            <p>
                                <Text strong>Số điện thoại:</Text> {order.PhoneNumber || "N/A"}
                            </p>
                            <p>
                                <Text strong>Trạng thái thanh toán:</Text>{" "}
                                <Tag color={paymentColors[order.PaymentStatus]}>
                                    {translatePaymentStatus(order.PaymentStatus)}
                                </Tag>
                            </p>
                        </Card>
                    </Col>
                </Row>

                {/* Giao Đơn Hàng */}
                <Divider/>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card bordered className="info-card">
                            <Text strong>Nhân viên phụ trách:</Text>
                            {order.OrderStatus === "Pending" ? (<Select
                                value={assignee}
                                onChange={(userId) => handleAssign(userId)}
                                style={{width: "100%", marginTop: 10}}
                            >
                                {staff.map((member) => (<Option key={member.UserID} value={member.UserID}>
                                    {member.Username}
                                </Option>))}
                            </Select>) : (<p style={{marginTop: 10}}>{assignee || "Chưa giao"}</p>)}
                        </Card>
                    </Col>
                </Row>

                {/* Tóm Tắt Sản Phẩm */}
                <Divider/>
                <Title level={4}>Tóm tắt sản phẩm</Title>
                <Table
                    dataSource={products}
                    columns={columns}
                    pagination={false}
                    className="order-summary-table"
                />

                {/* Chi Tiết Thanh Toán và Giao Hàng */}
                <Divider/>
                <Card bordered className="info-card">
                    <Title level={5}>Thông tin giao hàng</Title>
                    <p>{order.FullName || "N/A"}</p>
                    <p>{order.ShippingAddress || "N/A"}</p>
                    <p>{order.PhoneNumber || "N/A"}</p>
                </Card>

                <Divider/>

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Card bordered className="info-card">
                            <p>
                                <Text strong>Phương thức vận chuyển:</Text> Free
                            </p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered className="info-card">
                            <p>
                                <Text strong>Trạng thái thanh toán:</Text>{" "}
                                <Tag color={paymentColors[order.PaymentStatus]}>
                                    {translatePaymentStatus(order.PaymentStatus, translatePaymentMethod(order.PaymentMethod))}
                                </Tag>
                            </p>

                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
    </Layout>);
};

export default OrderDetails;
