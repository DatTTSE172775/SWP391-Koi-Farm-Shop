import React, { useEffect } from "react";
import {Card, Tag, List, Avatar, Divider, Button, Timeline, notification} from "antd";
import { CalendarOutlined, DollarOutlined, HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {cancelOrder, fetchOrderDetail} from "../../../store/actions/orderActions";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetailPage.scss";
import Loading from "../../../components/loading/Loading";

const OrderDetailPage = () => {
    const { OrderID, trackingNumber } = useParams(); // Nhận OrderId và trackingNumber từ URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { order, loading, error } = useSelector((state) => state.order || {});

    useEffect(() => {
        if (OrderID) {
            dispatch(fetchOrderDetail(OrderID)); // Call API lấy chi tiết đơn hàng
        }
    }, [dispatch, OrderID]);

    const handleCancelOrder = () => {
        if (order?.OrderStatus === "Delivering" || order?.OrderStatus === "Delivered") {
            notification.error({
                message: "Không thể hủy",
                description: "Đơn hàng đang vận chuyển không thể hủy.",
            });
        } else {
            dispatch(cancelOrder(OrderID));
        }
    };

    const isCancellable = order?.OrderStatus === "Pending" || order?.OrderStatus === "Processing";

    const getStatusDetails = (status) => {
        switch (status) {
            case "Pending":
                return { color: "orange", label: "Đang xử lý" };
            case "Processing":
                return { color: "blue", label: "Đang đóng gói" };
            case "Delivering":
                return { color: "cyan", label: "Đang vận chuyển" };
            case "Delivered":
                return { color: "green", label: "Đã giao hàng" };
            case "Cancelled":
                return { color: "red", label: "Đã hủy" };
            default:
                return { color: "default", label: "Không xác định" };
        }
    };

    const timelineSteps = [
        { label: "Đang xử lý", status: "Pending" },
        { label: "Đóng gói", status: "Processing" },
        { label: "Đang vận chuyển", status: "Delivering" },
        { label: "Đã giao hàng", status: "Delivered" },
    ];

    // Xử lý logic sản phẩm (Single Fish và Package)
    const products = [];

    if (order?.ProductTypes?.includes("Single Fish")) {
        const koiNames = order.KoiNames?.split(",") || [];
        const koiPrices = order.KoiPrices?.split(",") || [];
        const koiQuantities = order.KoiIDs?.split(",").map(() => 1) || [];

        koiNames.forEach((name, index) => {
            products.push({
                type: "Single Fish",
                name: name.trim(),
                price: koiPrices[index]
                    ? parseFloat(koiPrices[index]).toLocaleString() + " VND"
                    : "N/A",
                quantity: koiQuantities[index] || 1,
                image: "/placeholder-fish.png", // Replace with real image if available
            });
        });
    }

    if (order?.ProductTypes?.includes("Package")) {
        const packageNames = order.PackageNames?.split(",") || [];
        const packagePrices = order.PackagePrices?.split(",") || [];
        const packageQuantities = order.PackageIDs?.split(",").map(() => 1) || [];
        const packageImages = ["/placeholder-package.png"]; // Replace with real images if available

        packageNames.forEach((name, index) => {
            products.push({
                type: "Package",
                name: name.trim(),
                price: packagePrices[index]
                    ? parseFloat(packagePrices[index]).toLocaleString() + " VND"
                    : "N/A",
                quantity: packageQuantities[index] || 1,
                image: packageImages[index] || "/placeholder-package.png",
            });
        });
    }

    if (loading) return <Loading />;
    if (error) return <p>Lỗi: {error}</p>;

    const statusDetails = getStatusDetails(order?.OrderStatus);

    return (
        <div className="order-detail-page">
            <h2>Chi tiết đơn hàng: {trackingNumber}</h2> {/* Hiển thị trackingNumber từ URL */}

            <Card className="order-detail-card">
                <div className="order-header">
                    <Tag color={statusDetails.color}>{statusDetails.label}</Tag>
                </div>

                {/* Thông tin đơn hàng */}
                <div className="order-info">
                    <p>
                        <CalendarOutlined /> <strong>Ngày đặt:</strong> {order?.OrderDate
                        ? new Intl.DateTimeFormat("vi-VN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        }).format(new Date(order.OrderDate))
                        : "Không có thông tin"}
                    </p>
                    <p>
                        <DollarOutlined /> <strong>Tổng tiền:</strong>{" "}
                        {order?.TotalAmount ? `${order.TotalAmount.toLocaleString()} VND` : "N/A"}
                    </p>
                    <p>
                        <HomeOutlined /> <strong>Địa chỉ giao hàng:</strong> {order?.ShippingAddress || "Không có thông tin"}
                    </p>
                </div>

                <Divider />

                {/* Tiến độ giao hàng */}
                <Timeline
                    mode="alternate"
                    items={timelineSteps.map((step, index) => ({
                        color:
                            order?.OrderStatus === step.status
                                ? "blue"
                                : timelineSteps.findIndex((s) => s.status === order?.OrderStatus) > index
                                    ? "green"
                                    : "gray",
                        children: step.label,
                    }))}
                />

                <Divider />

                {/* Danh sách sản phẩm */}
                <List
                    className="order-products"
                    header={<strong>Sản phẩm trong đơn hàng:</strong>}
                    dataSource={products}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.image || "/placeholder.png"} />}
                                title={<span>{item.name}</span>}
                                description={
                                    <span>
                                        Số lượng: <strong>{item.quantity}</strong> | Giá:{" "}
                                        <strong>{item.price}</strong>
                                    </span>
                                }
                            />
                        </List.Item>
                    )}
                />

                <Divider />

                <Divider />

                {/* Nút Hủy Đơn Hàng */}
                <Button
                    type="primary"
                    danger
                    onClick={handleCancelOrder}
                    disabled={!isCancellable}
                >
                    Hủy Đơn Hàng
                </Button>

                <Divider />

                {/* Nút điều hướng */}
                <Button type="primary" onClick={() => navigate(-1)}>
                    Trở lại
                </Button>
            </Card>
        </div>
    );
};

export default OrderDetailPage;
