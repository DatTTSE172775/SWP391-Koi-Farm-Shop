// src/components/admin/dashboard/RevenueChart.jsx
import React from 'react';
import { Card } from 'antd';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './RevenueChart.scss';

// Mockup data
const data = {
    labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'],
    datasets: [
        {
            label: 'Doanh Thu (VND)',
            data: [2000000, 3000000, 2500000, 4000000, 3500000],
            borderColor: '#8884d8',
            backgroundColor: 'rgba(136, 132, 216, 0.2)',
            borderWidth: 2,
            tension: 0.4,
        },
    ],
};

const options = {
    responsive: true,
    scales: {
        y: {
            ticks: {
                callback: (value) => `${value.toLocaleString('vi-VN')} VND`,
            },
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: (context) => `${context.raw.toLocaleString('vi-VN')} VND`,
            },
        },
    },
};

const RevenueChart = () => {
    return (
        <Card className="revenue-chart">
            <h3 className="revenue-chart__title">Biểu Đồ Doanh Thu</h3>
            <Line data={data} options={options} />
        </Card>
    );
};

export default RevenueChart;
