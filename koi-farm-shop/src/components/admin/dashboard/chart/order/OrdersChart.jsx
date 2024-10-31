// src/components/admin/dashboard/OrdersChart.jsx
import React from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './OrdersChart.scss';

// Mockup data
const data = {
    labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'],
    datasets: [
        {
            label: 'Số Đơn Hàng',
            data: [5, 7, 4, 8, 6],
            backgroundColor: '#4caf50',
            borderColor: '#388e3c',
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    scales: {
        y: {
            ticks: {
                callback: (value) => `${value.toLocaleString('vi-VN')}`,
            },
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: (context) => `${context.raw.toLocaleString('vi-VN')} đơn hàng`,
            },
        },
    },
};

const OrdersChart = () => {
    return (
        <Card className="orders-chart">
            <h3 className="orders-chart__title">Biểu Đồ Đơn Hàng</h3>
            <Bar data={data} options={options} />
        </Card>
    );
};

export default OrdersChart;
