// src/components/admin/dashboard/Dashboard.jsx
import React from 'react';
import { Row, Col, Card } from 'antd';
import './Dashboard.scss';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard__title">Bảng Điều Khiển</h1>

            <Row gutter={[16, 16]} className="dashboard__widgets">
                <Col span={8}>
                    <Card className="dashboard__widget">
                        <h3>Doanh Thu Tháng Này</h3>
                        <p>80,000,000 VND</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="dashboard__widget">
                        <h3>Tổng Đơn Hàng</h3>
                        <p>150 đơn hàng</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="dashboard__widget">
                        <h3>Khách Hàng Mới</h3>
                        <p>12 khách hàng</p>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} cadlassName="dashboard__charts">
                <Col span={12}>
                    <Card className="dashboard__chart">
                        <h3>Biểu Đồ Doanh Thu</h3>
                        {/* Placeholder cho biểu đồ */}
                        <div className="chart-placeholder">Chart Area</div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="dashboard__chart">
                        <h3>Tăng Trưởng Khách Hàng</h3>
                        {/* Placeholder cho biểu đồ */}
                        <div className="chart-placeholder">Chart Area</div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
