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
    Tag,
    notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import "./OrderDetailsStaff.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const statusColors = {
    Pending: "orange",
    Processing: "blue",
    Delivering: "purple",
    Delivered: "green",
    Cancelled: "red",
};

const paymentColors = {
    Completed: "green",
    Pending: "orange",
    Failed: "red",
};

const translateStatus = (status) => {
    const statusMap = {
        Pending: "Chờ xử lý",
        Processing: "Đang xử lý",
        Delivering: "Đang giao hàng",
        Delivered: "Đã hoàn thành",
        Cancelled: "Đã hủy",
    };
    return statusMap[status] || "Không xác định";
};

const translatePaymentStatus = (status) => {
    const paymentStatusMap = {
        Completed: "Đã thanh toán",
        Pending: "Đang chờ thanh toán",
        Failed: "Thanh toán thất bại",
    };
    return paymentStatusMap[status] || "Không xác định";
};

const OrderDetailsStaff = () => {
    const { OrderID } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axiosInstance.get(`/orders/${OrderID}`);
                setOrder(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch order:", err);
                setError("Không thể tải thông tin đơn hàng.");
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [OrderID]);

    const handleCancelOrder = async () => {
        if (order.OrderStatus === "Delivering") {
            try {
                // API call để hủy đơn hàng
                await axiosInstance.patch(`/orders/${order.OrderID}/cancelled`);
                notification.success({
                    message: "Thành công",
                    description: "Đơn hàng đã được hủy thành công.",
                });
                setOrder((prevOrder) => ({
                    ...prevOrder,
                    OrderStatus: "Cancelled",
                }));
            } catch (err) {
                console.error("Error cancelling order:", err);
                notification.error({
                    message: "Lỗi",
                    description: "Không thể hủy đơn hàng. Vui lòng thử lại.",
                });
            }
        } else {
            notification.warning({
                message: "Không thể hủy",
                description: "Chỉ có thể hủy đơn hàng ở trạng thái 'Đang giao hàng' (Delivering).",
            });
        }
    };


    if (loading) {
        return <Spin size="large" className="loading-spinner" />;
    }

    if (error) {
        return <Alert message="Lỗi" description={error} type="error" showIcon />;
    }

    const products = [];

    // Add Single Fish Products
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
                TotalPrice:
                    (parseFloat(koiPrices[index]) || 0) * (koiQuantities[index] || 1),
                ImageLink: "/placeholder-fish.png",
            });
        });
    }

    // Add Package Products
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
                TotalPrice:
                    (parseFloat(packagePrices[index]) || 0) * (packageQuantities[index] || 1),
                ImageLink: "/placeholder-package.png",
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

    return (
        <Layout>
            <Content className="staff-content">
                <div className="order-details-container">
                    <Button
                        type="link"
                        onClick={() => navigate("/staff/orders")}
                        className="back-button"
                    >
                        &lt; Quay lại
                    </Button>
                    <Title level={3} className="title">
                        Chi tiết đơn hàng
                    </Title>
                    <Divider />

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
                                    <Text strong>Số theo dõi:</Text> {order.TrackingNumber || "N/A"}
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

                    <Divider />
                    <Title level={4}>Tóm tắt sản phẩm</Title>
                    <Table
                        dataSource={products}
                        columns={columns}
                        pagination={false}
                        className="order-summary-table"
                    />

                    <Divider />
                    {order.OrderStatus !== "Cancelled" && (
                        <Button
                            type="danger"
                            disabled={order.OrderStatus === "Delivered"}
                            onClick={handleCancelOrder}
                        >
                            Hủy đơn hàng
                        </Button>
                    )}
                </div>
            </Content>
        </Layout>
    );
};

export default OrderDetailsStaff;
