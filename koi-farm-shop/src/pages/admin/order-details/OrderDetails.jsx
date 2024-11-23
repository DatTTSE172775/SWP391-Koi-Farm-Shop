import {
    Alert,
    Button,
    Card,
    Col,
    Divider,
    Layout,
    Row,
    Spin,
    Table,
    Typography,
    Select,
    Tag,
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
const translatePaymentStatus = (status) => {
    const paymentStatusMap = {
        Completed: "Đã thanh toán",
        Pending: "Đang chờ thanh toán",
        Failed: "Thanh toán thất bại",
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
                const assignedStaff = staff.find(
                    (member) => member.UserID === response.data.UserID
                );
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
            ...prevOrder,
            UserID: userId,
        }));
    };

    if (loading) {
        return <Spin size="large" className="loading-spinner"/>;
    }

    if (error) {
        return (
            <Alert message="Error" description={error} type="error" showIcon/>
        );
    }

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "ProductName",
            key: "ProductName",
            render: (_, record) => (
                <div className="product-info">
                    <img
                        src={record.KoiImagesLink || record.PackageImageLink || "https://placehold.co/50"}
                        alt={record.KoiName || record.PackageName || "Product"}
                        className="product-image"
                    />
                    <div>
                        <Text strong>{record.KoiName || record.PackageName || "N/A"}</Text>
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

    const dataSource = [
        {
            key: 1,
            ProductName: order.PackageName || order.KoiName,
            Quantity: order.Quantity,
            UnitPrice: order.PackagePrice || order.KoiPrice,
            TotalPrice: order.TotalPrice,
            KoiImagesLink: order.KoiImagesLink,
            PackageImageLink: order.PackageImageLink,
            KoiName: order.KoiName,
            PackageName: order.PackageName,
        },
    ];

    return (
        <Layout>
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
                                {order.OrderStatus === "Pending" ? (
                                    <Select
                                        value={assignee}
                                        onChange={(userId) => handleAssign(userId)}
                                        style={{width: "100%", marginTop: 10}}
                                    >
                                        {staff.map((member) => (
                                            <Option key={member.UserID} value={member.UserID}>
                                                {member.Username}
                                            </Option>
                                        ))}
                                    </Select>
                                ) : (
                                    <p style={{marginTop: 10}}>{assignee || "Chưa giao"}</p>
                                )}
                            </Card>
                        </Col>
                    </Row>

                    {/* Tóm Tắt Sản Phẩm */}
                    <Divider/>
                    <Title level={4}>Tóm tắt sản phẩm</Title>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        className="order-summary-table"
                    />

                    {/* Chi Tiết Thanh Toán và Giao Hàng */}
                    <Divider/>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card bordered className="info-card">
                                <Title level={5}>Thông tin thanh toán</Title>
                                <p>{order.FullName || "N/A"}</p>
                                <p>{order.Address || "N/A"}</p>
                                <p>{order.PhoneNumber || "N/A"}</p>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered className="info-card">
                                <Title level={5}>Thông tin giao hàng</Title>
                                <p>{order.FullName || "N/A"}</p>
                                <p>{order.ShippingAddress || "N/A"}</p>
                                <p>{order.PhoneNumber || "N/A"}</p>
                            </Card>
                        </Col>
                    </Row>

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
                                    <Text strong>Phương thức thanh toán:</Text>{" "}
                                    {translatePaymentMethod(order.PaymentMethod)}
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default OrderDetails;
