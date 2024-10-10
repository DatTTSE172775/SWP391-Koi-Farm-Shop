import { Layout, Typography, Card, Row, Col, Button } from "antd";
import React from "react";
import AccountHeader from "../../../components/account/header/AccountHeader";
import AccountSidebar from "../../../components/account/sidebar/AccountSidebar";
import "./WelcomeCustomer.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeCustomer = () => {
  return (
    <Layout className="account-layout">
      <AccountSidebar />
      <Layout>
        <AccountHeader />
        <Content className="account-content">
          <div className="welcome-container">
            <Title level={2}>Chào mừng đến với Customer Portal</Title>
            <Text>Đây là trang quản lý tài khoản của bạn. Bạn có thể xem đơn hàng, quản lý thông tin cá nhân, và theo dõi các sản phẩm yêu thích.</Text>
            
            {/* Phần truy cập nhanh */}
            <Row gutter={[16, 16]} className="quick-access">
              <Col span={6}>
                <Card title="Lịch sử đơn hàng" hoverable>
                  <p>Xem và quản lý các đơn hàng của bạn.</p>
                  <Button type="primary">Xem ngay</Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Thông tin cá nhân" hoverable>
                  <p>Cập nhật thông tin tài khoản của bạn.</p>
                  <Button type="primary">Cập nhật</Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Danh sách yêu thích" hoverable>
                  <p>Theo dõi các sản phẩm bạn yêu thích.</p>
                  <Button type="primary">Xem ngay</Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Hỗ trợ khách hàng" hoverable>
                  <p>Liên hệ với chúng tôi nếu bạn cần trợ giúp.</p>
                  <Button type="primary">Liên hệ</Button>
                </Card>
              </Col>
            </Row>

            {/* Phần sản phẩm nổi bật */}
            <div className="featured-products">
              <Title level={3}>Sản phẩm nổi bật</Title>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card hoverable cover={<img src="/path/to/koi1.jpg" alt="Koi 1" />}>
                    <Card.Meta title="Koi Đẹp 1" description="Giá từ 1.000.000 VNĐ" />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card hoverable cover={<img src="/path/to/koi2.jpg" alt="Koi 2" />}>
                    <Card.Meta title="Koi Đẹp 2" description="Giá từ 1.500.000 VNĐ" />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card hoverable cover={<img src="/path/to/koi3.jpg" alt="Koi 3" />}>
                    <Card.Meta title="Koi Đẹp 3" description="Giá từ 2.000.000 VNĐ" />
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WelcomeCustomer;
