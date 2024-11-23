import React, { useEffect, useState } from "react";
import { Card, Tag, List, Avatar, Divider, Button, Space } from "antd";
import { HomeOutlined, CalendarOutlined, DollarOutlined, ShoppingOutlined } from "@ant-design/icons";
import "./OrderHistoryItem.scss";
import { useNavigate } from "react-router-dom";

const OrderHistoryItem = ({ order }) => {
    const navigate = useNavigate();

    // Parse products from order data
    const products = [];

    // Single Fish Items
    if (order.ProductTypes?.includes("Single Fish") && order.KoiNames) {
        const koiNames = order.KoiNames.split(",");
        const koiPrices = order.KoiPrices.split(",");
        const koiQuantities = order.KoiIDs.split(",").map(() => 1); // Assuming single quantity for each koi
        koiNames.forEach((name, index) => {
            products.push({
                type: "Single Fish",
                name: name.trim(),
                image: "/placeholder-fish.png", // Replace with actual image if available
                quantity: koiQuantities[index],
                price: parseFloat(koiPrices[index]).toLocaleString() + " VND",
            });
        });
    }

    // Koi Packages
    if (order.ProductTypes?.includes("Package") && order.PackageNames) {
        const packageNames = order.PackageNames.split(",");
        const packagePrices = order.PackagePrices.split(",");
        const packageQuantities = order.PackageIDs.split(",").map(() => 1); // Assuming single quantity for each package
        const packageImages = ["/placeholder-package.png", "/placeholder-package.png"]; // Replace with actual images
        packageNames.forEach((name, index) => {
            products.push({
                type: "Package",
                name: name.trim(),
                image: packageImages[index] || "/placeholder-package.png",
                quantity: packageQuantities[index],
                price: parseFloat(packagePrices[index]).toLocaleString() + " VND",
            });
        });
    }

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

    const statusDetails = getStatusDetails(order.OrderStatus);

    return (
        <Card className="order-history-item" hoverable>
            <div className="order-header">
                <div className="order-id">
                    <ShoppingOutlined /> {order.TrackingNumber}
                </div>
                <Tag color={statusDetails.color}>{statusDetails.label}</Tag>
            </div>

            <div className="order-details">
                <p>
                    <CalendarOutlined /> <strong>Ngày đặt:</strong> {order.OrderDate}
                </p>
                <p>
                    <DollarOutlined /> <strong>Tổng tiền:</strong>{" "}
                    {order.TotalAmount.toLocaleString()} VND
                </p>
                <p>
                    <HomeOutlined /> <strong>Địa chỉ giao hàng:</strong>{" "}
                    {order.ShippingAddress}
                </p>
            </div>

            <Divider />

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
                                    Số lượng: <strong>{item.quantity}</strong> | Giá: <strong>{item.price}</strong>
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />

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
