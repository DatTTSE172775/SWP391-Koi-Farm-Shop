import React from "react";
import {Card, Tag, List, Avatar, Divider, Button, Space} from "antd";
import {HomeOutlined, CalendarOutlined, DollarOutlined, ShoppingOutlined} from "@ant-design/icons";
import "./OrderHistoryItem.scss";
import {useNavigate} from "react-router-dom";

const OrderHistoryItem = ({order}) => {
    const getStatusDetails = (status) => {
        switch (status) {
            case "Pending":
                return {color: "orange", label: "Đang xử lý"};
            case "Processing":
                return {color: "blue", label: "Đang đóng gói"};
            case "Delivering":
                return {color: "cyan", label: "Đang vận chuyển"};
            case "Delivered":
                return {color: "green", label: "Đã vận chuyển"};
            case "Cancelled":
                return {color: "red", label: "Đã hủy"};
            default:
                return {color: "default", label: "Không xác định"};
        }
    };

    const navigate = useNavigate();
    const statusDetails = getStatusDetails(order.status);

    return (
        <Card className="order-history-item" hoverable>
            {/* Header: Order ID & Status */}
            <div className="order-header">
                <div className="order-id">
                    <ShoppingOutlined/> {order.id}
                </div>
                <Tag color={statusDetails.color} className="order-status">
                    {statusDetails.label}
                </Tag>
            </div>

            {/* Order Details */}
            <div className="order-details">
                <p>
                    <CalendarOutlined/> <strong>Ngày đặt:</strong> {order.date}
                </p>
                <p>
                    <DollarOutlined/> <strong>Tổng tiền:</strong> {order.total} VND
                </p>
                <p>
                    <HomeOutlined/> <strong>Địa chỉ giao hàng:</strong> {order.address}
                </p>
            </div>

            <Divider/>

            {/* Product List */}
            <List
                className="order-products"
                header={<strong>Sản phẩm trong đơn hàng:</strong>}
                dataSource={order.products}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.image}/>}
                            title={<span>{item.name}</span>}
                            description={
                                <span>
                                    Số lượng: <strong>{item.quantity}</strong> | Giá:{" "}
                                    <strong>{item.price} VND</strong>
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />

            {/* Footer: Button */}
            <div className="order-footer">
                <Space>
                    <Button type="primary" size="large" className="primary-btn"
                            onClick={() => navigate(`/order-history/${order.id}`)}>
                        Xem chi tiết
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

export default OrderHistoryItem;
