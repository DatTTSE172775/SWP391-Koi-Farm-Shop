// src/components/admin/dashboard/OrdersWidget.jsx
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './OrdersWidget.scss';

const OrdersWidget = () => {
    const [orders, setOrders] = useState(null);

    // Mockup data for demonstration
    useEffect(() => {
        const mockOrdersData = {
            totalOrders: 150,
            pendingOrders: 10,
            completedOrders: 120,
            cancelledOrders: 20,
        };
        setOrders(mockOrdersData);
    }, []);

    return (
        <Card className="orders-widget">
            <div className="orders-widget__header">
                <h3 className="orders-widget__title">Tổng Đơn Hàng</h3>
                <ShoppingCartOutlined className="orders-widget__icon" />
            </div>
            <p className="orders-widget__value">
                {orders ? `${orders.totalOrders} đơn hàng` : 'Không có dữ liệu'}
            </p>
            <div className="orders-widget__details">
                {orders && (
                    <>
                        <p className="orders-widget__detail">Đang chờ xử lý: <span>{orders.pendingOrders}</span></p>
                        <p className="orders-widget__detail">Hoàn tất: <span>{orders.completedOrders}</span></p>
                        <p className="orders-widget__detail">Hủy: <span>{orders.cancelledOrders}</span></p>
                    </>
                )}
            </div>
        </Card>
    );
};

export default OrdersWidget;
