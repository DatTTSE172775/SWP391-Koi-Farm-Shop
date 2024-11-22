import React from "react";
import { Card, Tag, List, Avatar, Divider, Button, Space } from "antd";
import {
    HomeOutlined,
    CalendarOutlined,
    DollarOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";
import "./OrderHistoryItem.scss";
import { useNavigate } from "react-router-dom";

const OrderHistoryItem = ({ order }) => {
    const getStatusDetails = (status) => {
        switch (status) {
            case "Pending":
                return { color: "orange", label: "Đang xử lý" };
            case "Processing":
                return { color: "blue", label: "Đang đóng gói" };
            case "Delivering":
                return { color: "cyan", label: "Đang vận chuyển" };
            case "Delivered":
                return { color: "green", label: "Đã vận chuyển" };
            case "Cancelled":
                return { color: "red", label: "Đã hủy" };
            default:
                return { color: "default", label: "Không xác định" };
        }
    };

    const navigate = useNavigate();
    const statusDetails = getStatusDetails(order.OrderStatus);

    // Chuẩn bị dữ liệu sản phẩm trong đơn hàng
    const products = [];
    if (order.ProductType === "Single Fish") {
        products.push({
            name: order.KoiName || "Không có tên",
            image: order.KoiImagesLink || "",
            quantity: order.Quantity || 1,
            price: order.KoiPrice || 0,
        });
    }

    // Nếu cần xử lý thêm các loại sản phẩm khác (ví dụ: lô cá koi), hãy thêm logic tương tự ở đây.

    return (
        <Card className="order-history-item" hoverable>
            {/* Header: Order ID & Status */}
            <div className="order-header">
                <div className="order-id">
                    <ShoppingOutlined /> {order.TrackingNumber}
                </div>
                <Tag color={statusDetails.color} className="order-status">
                    {statusDetails.label}
                </Tag>
            </div>

            {/* Order Details */}
            <div className="order-details">
                <p>
                    <CalendarOutlined /> <strong>Ngày đặt:</strong> {order.OrderDate}
                </p>
                <p>
                    <DollarOutlined /> <strong>Tổng tiền:</strong> {order.TotalAmount.toLocaleString()} VND
                </p>
                <p>
                    <HomeOutlined /> <strong>Địa chỉ giao hàng:</strong>{" "}
                    {order.ShippingAddress}
                </p>
            </div>

            <Divider />

            {/* Product List */}
            <List
                className="order-products"
                header={<strong>Sản phẩm trong đơn hàng:</strong>}
                dataSource={products}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.image} />}
                            title={<span>{item.name}</span>}
                            description={
                                <span>
                                    Số lượng: <strong>{item.quantity}</strong> | Giá:{" "}
                                    <strong>{item.price.toLocaleString()} VND</strong>
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />

            {/* Footer: Button */}
            <div className="order-footer">
                <Space>
                    <Button
                        type="primary"
                        size="large"
                        className="primary-btn"
                        onClick={() => navigate(`/order-history/${order.TrackingNumber}`)}
                    >
                        Xem chi tiết
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

export default OrderHistoryItem;