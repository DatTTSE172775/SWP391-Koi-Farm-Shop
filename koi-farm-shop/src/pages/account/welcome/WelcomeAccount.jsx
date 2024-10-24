import { Layout, Typography, Card, Row, Col, Button } from "antd";
import React from "react";
import AccountHeader from "../../../components/account/header/AccountHeader";
// import AccountSidebar from "../../../components/account/sidebar/AccountSidebar";
import Navigation from "../../../components/navigation/Navigation";
import "./WelcomeAccount.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

const WelcomeAccount = () => {
  return (
    <Layout className="account-layout">
      <Navigation />
      <Layout>
        <AccountHeader />
        <Content className="account-content">
          <div className="welcome-container">
            <Title level={2}>Hồ Sơ Của Bạn</Title>
            <Text>
              Đây là trang quản lý tài khoản của bạn. Bạn có thể theo dõi đơn hàng, cập nhật thông tin cá nhân, và xem các sản phẩm cá Koi yêu thích.
            </Text>

            {/* Phần truy cập nhanh */}
            <Row gutter={[16, 16]} className="quick-access">
              <Col span={6}>
                <Card title="Đơn hàng của tôi" hoverable>
                  <p>Xem và quản lý các đơn hàng mua cá Koi.</p>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#2f855a", borderColor: "#276749" }}
                  >
                    Xem ngay
                  </Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Thông tin cá nhân" hoverable>
                  <p>Cập nhật thông tin tài khoản của bạn tại Koi Farm Shop.</p>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#2f855a", borderColor: "#276749" }}
                  >
                    Cập nhật
                  </Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Danh sách yêu thích" hoverable>
                  <p>Theo dõi các sản phẩm cá Koi bạn yêu thích.</p>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#2f855a", borderColor: "#276749" }}
                  >
                    Xem ngay
                  </Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Hỗ trợ khách hàng" hoverable>
                  <p>Liên hệ với chúng tôi nếu bạn cần trợ giúp về cá Koi.</p>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#2f855a", borderColor: "#276749" }}
                  >
                    Liên hệ
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WelcomeAccount;
