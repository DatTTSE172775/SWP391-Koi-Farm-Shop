import {
  FundOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./AboutUs.scss";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <div className="about-us-section">
      <Row justify="center" className="section-header">
        <Col>
          <Title level={2}>Koi Farm Shop</Title>
          <Paragraph>
            Tìm hiểu thêm về Koi Farm Shop, sứ mệnh, tầm nhìn và những giá trị
            cốt lõi mà chúng tôi mang đến cho khách hàng.
          </Paragraph>
          <Link to="/about" className="learn-more-button">
            <Button type="primary">Tìm hiểu thêm</Button>
          </Link>
        </Col>
      </Row>

      <Row gutter={[32, 32]} className="about-us-content">
        {/* Sứ Mệnh */}
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="about-card">
            <TeamOutlined className="icon" />
            <Title level={4}>Sứ Mệnh</Title>
            <Paragraph>
              Cung cấp cá Koi chất lượng cao và dịch vụ khách hàng xuất sắc, đảm
              bảo mỗi khách hàng tìm được bổ sung hoàn hảo cho môi trường thủy
              sinh của mình.
            </Paragraph>
          </Card>
        </Col>

        {/* Tầm Nhìn */}
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="about-card">
            <SolutionOutlined className="icon" />
            <Title level={4}>Tầm Nhìn</Title>
            <Paragraph>
              Trở thành cửa hàng cá Koi hàng đầu trên toàn cầu, được biết đến
              với sự đa dạng trong lựa chọn cá Koi, giải pháp hồ cá tiên tiến và
              cam kết bền vững.
            </Paragraph>
          </Card>
        </Col>

        {/* Giá Trị */}
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="about-card">
            <FundOutlined className="icon" />
            <Title level={4}>Giá Trị</Title>
            <Paragraph>
              Chúng tôi coi trọng tính trung thực, chất lượng và sự hài lòng của
              khách hàng. Đội ngũ của chúng tôi đam mê về cá Koi và tận tâm giúp
              bạn tạo dựng một hệ sinh thái thủy sinh phát triển mạnh mẽ.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
