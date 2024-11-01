// src/components/WelcomeAdmin.jsx
import React from 'react';
import { Row, Col, Card, Button} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined, AppstoreOutlined, UserAddOutlined } from '@ant-design/icons';
import WelcomeCard from '../../../components/admin/layout/welcome/WelcomeCard';
import './WelcomeAdmin.scss';

const WelcomeAdmin = () => {
    const navigate = useNavigate();
    const today = new Date().toLocaleDateString('vi-VN');

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="welcome-admin">
            <h1 className="welcome-admin__title">Chào mừng đến với Trang Quản Trị Koi Farm</h1>
            <p className="welcome-admin__subtitle">
                Quản lý trang trại cá koi của bạn, theo dõi đơn hàng và kiểm tra tồn kho dễ dàng.
            </p>
            <p className="welcome-admin__date">Ngày hôm nay: {today}</p>

            {/* Widgets Section */}
            <Row gutter={[16, 16]} className="welcome-admin__widgets">
                <Col span={8}>
                    <WelcomeCard
                        title="Đơn Hàng Mới"
                        value="5"
                        description="Đơn hàng đang chờ xử lý"
                        icon={<ShoppingOutlined />}
                    />
                </Col>
                <Col span={8}>
                    <WelcomeCard
                        title="Tổng Doanh Thu"
                        value="80,000,000 VND"
                        description="Doanh thu trong tháng này"
                        icon={<AppstoreOutlined />}
                    />
                </Col>
                <Col span={8}>
                    <WelcomeCard
                        title="Khách Hàng Mới"
                        value="12"
                        description="Khách hàng đăng ký trong tháng"
                        icon={<UserAddOutlined />}
                    />
                </Col>
            </Row>

            {/* Quick Actions Section */}
            <Row gutter={[16, 16]} className="welcome-admin__actions">
                <Col span={12}>
                    <Card className="action-card hover-card">
                        <h3>Quản Lý Đơn Hàng</h3>
                        <p>Kiểm tra, cập nhật và xử lý đơn hàng</p>
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={() => handleNavigate('/admin/manage-orders')}
                        >
                            Xem Đơn Hàng
                        </Button>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="action-card hover-card">
                        <h3>Quản Lý Tồn Kho</h3>
                        <p>Cập nhật số lượng và thêm sản phẩm mới</p>
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            onClick={() => handleNavigate('/admin/inventory')}
                        >
                            Xem Tồn Kho
                        </Button>
                    </Card>
                </Col>
            </Row>

            {/* Status Section */}
            <Row gutter={[16, 16]} className="welcome-admin__status">
                <Col span={12}>
                    <WelcomeCard
                        title="Số Lượng Cá Koi Trong Kho"
                        value="50"
                        description="Nhiều chủng loại khác nhau"
                    />
                </Col>
                <Col span={12}>
                    <WelcomeCard
                        title="Tình Trạng Thức Ăn & Nước"
                        value="Đủ dùng"
                        description="Chưa cần hành động ngay"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default WelcomeAdmin;