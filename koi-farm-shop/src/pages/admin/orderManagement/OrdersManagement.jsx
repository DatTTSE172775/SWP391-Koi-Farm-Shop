import { Alert, Layout, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../../components/admin/order-item/OrderItem";
import { fetchOrders } from "../../../store/actions/orderActions";
import "./OrdersManagement.scss";

const { Content } = Layout;
const { Title } = Typography;

const OrdersManagement = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const sortedOrders = orders ? [...orders].sort((a, b) => {
        return new Date(b.OrderDate) - new Date(a.OrderDate);
    }) : [];

    if (loading) {
        return (
            <div className="loading-spinner">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <Content className="admin-content">
                <Alert message="Error" description={error} type="error" showIcon />
            </Content>
        );
    }

    return (
        <Content className="admin-content">
            <Title level={2}>Quản Lý Đơn Hàng</Title>
            <div className="orders-list">
                {Array.isArray(sortedOrders) && sortedOrders.length > 0 ? (
                    sortedOrders.map((order) => (
                        <OrderItem key={order.OrderID} order={order} className="order-item" />
                    ))
                ) : (
                    <p>No orders available.</p>
                )}
            </div>
        </Content>
    );
};

export default OrdersManagement;