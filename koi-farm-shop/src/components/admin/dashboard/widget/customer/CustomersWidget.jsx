// src/components/admin/dashboard/CustomersWidget.jsx
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
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
            <div>
                <h3 className="customers-widget__title">Khách Hàng</h3>
                <p className="customers-widget__value">
                    {customers ? `${customers.newCustomersThisMonth} khách hàng mới trong tháng` : 'Không có dữ liệu'}
                </p>
                <p className="customers-widget__details">
                    {customers && (
                        <>
                            <span>Trong tuần: {customers.newCustomersThisWeek}</span> |{' '}
                            <span>Quay lại: {customers.returningCustomers}</span>
                        </>
                    )}
                </p>
            </div>
        </Card>
    );
};

export default CustomersWidget;
