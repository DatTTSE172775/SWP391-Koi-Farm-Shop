import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import './RevenueWidget.scss';

const RevenueWidget = () => {
    const [revenue, setRevenue] = useState(null);

    // Mockup data for demonstration
    useEffect(() => {
        const mockRevenueData = {
            revenueToday: 5000000,
            revenueThisMonth: 80000000,
        };
        setRevenue(mockRevenueData);
    }, []);

    return (
        <Card className="revenue-widget">
            <div>
                <h3 className="revenue-widget__title">Tổng Doanh Thu</h3>
                <p className="revenue-widget__value">
                    {revenue ? `${revenue.revenueThisMonth.toLocaleString('vi-VN')} VND` : 'Không có dữ liệu'}
                </p>
                <p className="revenue-widget__subtitle">Doanh thu tháng này</p>
            </div>
        </Card>
    );
};

export default RevenueWidget;
