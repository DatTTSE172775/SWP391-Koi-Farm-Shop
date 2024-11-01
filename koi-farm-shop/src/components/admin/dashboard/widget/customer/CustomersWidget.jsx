// src/components/admin/dashboard/CustomersWidget.jsx
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import './CustomersWidget.scss';

const CustomersWidget = () => {
    const [customers, setCustomers] = useState(null);

    // Mockup data for demonstration
    useEffect(() => {
        const mockCustomerData = {
            newCustomersThisWeek: 7,
            newCustomersThisMonth: 20,
            returningCustomers: 5,
        };
        setCustomers(mockCustomerData);
    }, []);

    return (
        <Card className="customers-widget">
            <div className="customers-widget__header">
                <h3 className="customers-widget__title">Khách Hàng</h3>
                <UsergroupAddOutlined className="customers-widget__icon" />
            </div>
            <p className="customers-widget__value">
                {customers ? `${customers.newCustomersThisMonth} khách hàng mới trong tháng` : 'Không có dữ liệu'}
            </p>
            <div className="customers-widget__details">
                {customers && (
                    <>
                        <p className="customers-widget__detail">Trong tuần: <span>{customers.newCustomersThisWeek}</span></p>
                        <p className="customers-widget__detail">Quay lại: <span>{customers.returningCustomers}</span></p>
                    </>
                )}
            </div>
        </Card>
    );
};

export default CustomersWidget;
