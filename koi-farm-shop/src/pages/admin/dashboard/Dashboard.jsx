// src/components/admin/dashboard/Dashboard.jsx
import React from 'react';
import { Row, Col } from 'antd';

import './Dashboard.scss';
import RevenueWidget from "../../../components/admin/dashboard/widget/revenue/RevenueWidget";
import OrdersWidget from "../../../components/admin/dashboard/widget/orders/OrdersWidget";
import ConsignmentWidget from "../../../components/admin/dashboard/widget/consignment/ConsignmentWidget";
import CustomersWidget from "../../../components/admin/dashboard/widget/customer/CustomersWidget";
import RevenueChart from "../../../components/admin/dashboard/chart/revenue/RevenueChart";
import OrdersChart from "../../../components/admin/dashboard/chart/order/OrdersChart";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard__title">Dashboard FPT Koi Farm Shop</h1>

            {/* Row chứa các widget */}
            <Row gutter={[16, 16]} className="dashboard__widgets">
                <Col span={6}>
                    <RevenueWidget />
                </Col>
                <Col span={6}>
                    <OrdersWidget />
                </Col>
                <Col span={6}>
                    <ConsignmentWidget />
                </Col>
                <Col span={6}>
                    <CustomersWidget />
                </Col>
            </Row>

            {/* Row chứa các biểu đồ */}
            <Row gutter={[16, 16]} className="dashboard__charts">
                <Col span={12}>
                    <RevenueChart />
                </Col>
                <Col span={12}>
                    <OrdersChart />
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
