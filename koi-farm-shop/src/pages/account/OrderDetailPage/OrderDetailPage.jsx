import React from "react";
import {Card, Timeline, List, Avatar, Button, Tag, Divider} from "antd";
import {CalendarOutlined, DollarOutlined, HomeOutlined} from "@ant-design/icons";
import "./OrderDetailPage.scss";
import {useParams} from "react-router-dom";

const OrderDetailPage = () => {
    const order = {
        id: "ORD001",
        date: "21/11/2024",
        total: "2,000,000",
        address: "123 Đường ABC, Quận XYZ, Thành phố HCM",
        status: "Delivering", // Đang vận chuyển
        timeline: [
            {step: "Đang xử lý", time: "20/11/2024 10:00", status: "done"},
            {step: "Đóng gói", time: "20/11/2024 14:00", status: "done"},
            {step: "Đang vận chuyển", time: "21/11/2024 08:00", status: "active"},
            {step: "Đã giao hàng", time: null, status: "pending"},
        ],
        products: [
            {
                name: "Cá Koi Kohaku",
                quantity: 2,
                price: "500,000",
                image: "https://via.placeholder.com/50",
            },
            {
                name: "Cá Koi Showa",
                quantity: 1,
                price: "1,000,000",
                image: "https://via.placeholder.com/50",
            },
        ],
    };

    const getStatusDetails = (status) => {
        switch (status) {
            case "Pending":
                return {color: "orange", label: "Đang xử lý"};
            case "Processing":
                return {color: "blue", label: "Đang đóng gói"};
            case "Delivering":
                return {color: "cyan", label: "Đang vận chuyển"};
            case "Delivered":
                return {color: "green", label: "Đã giao hàng"};
            case "Cancelled":
                return {color: "red", label: "Đã hủy"};
            default:
                return {color: "default", label: "Không xác định"};
        }
    };

    const {id} = useParams();
    const statusDetails = getStatusDetails(order.status);

    return (
        <div className="order-detail-page">
            <h2>Chi tiết đơn hàng: {id}</h2>

            <Card className="order-detail-card">
                <div className="order-header">
                    <Tag color={statusDetails.color}>{statusDetails.label}</Tag>
                </div>

                {/* Thông tin cơ bản */}
                <div className="order-info">
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

                {/* Timeline giao hàng */}
                <Timeline className="order-timeline">
                    {order.timeline.map((step, index) => (
                        <Timeline.Item
                            color={step.status === "done" ? "green" : step.status === "active" ? "blue" : "gray"}
                            key={index}>
                            <p>{step.step}</p>
                            {step.time && <small>{step.time}</small>}
                        </Timeline.Item>
                    ))}
                </Timeline>

                <Divider/>

                {/* Danh sách sản phẩm */}
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

                <Divider/>

                {/* Nút điều hướng */}
                <Button type="primary" onClick={() => window.history.back()}>
                    Trở lại
                </Button>
            </Card>
        </div>
    );
};

export default OrderDetailPage;
