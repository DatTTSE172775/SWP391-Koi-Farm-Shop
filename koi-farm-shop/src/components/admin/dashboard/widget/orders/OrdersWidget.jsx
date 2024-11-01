// src/components/admin/dashboard/OrdersWidget.jsx
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
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
            <div>
                <h3 className="orders-widget__title">Tổng Đơn Hàng</h3>
                <p className="orders-widget__value">
                    {orders ? `${orders.totalOrders} đơn hàng` : 'Không có dữ liệu'}
                </p>
                <p className="orders-widget__details">
                    {orders && (
                        <>
                            <span>Đang chờ xử lý: {orders.pendingOrders}</span> |{' '}
                            <span>Hoàn tất: {orders.completedOrders}</span> |{' '}
                            <span>Hủy: {orders.cancelledOrders}</span>
                        </>
                    )}
                </p>
            </div>
        </Card>
    );
};

export default OrdersWidget;
