import { Button, Card, Col, Modal, Row, Tag, Typography } from "antd";
import React, { useState } from "react";
import "./ApprovalItem.scss";

const { Text } = Typography;

const ApprovalItem = ({ consignment, onApprove, onReject }) => {
  const [isApproved, setIsApproved] = useState(consignment.status === "Đã ký");

  const handleApprove = () => {
    setIsApproved(true);
    onApprove(consignment.id);
    Modal.success({
      title: "Thành công",
      content: `Yêu cầu ký gửi ${consignment.id} đã được ký thành công.`,
    });
  };

  const handleReject = () => {
    onReject(consignment.id);
    Modal.error({
      title: "Từ chối",
      content: `Yêu cầu ký gửi ${consignment.id} đã bị từ chối.`,
    });
  };

  return (
    <Card className="approval-item-card">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={4}>
          <Text strong>Mã Ký Gửi:</Text>
          <Text>{consignment.id}</Text>
        </Col>
        <Col xs={24} md={5}>
          <Text strong>Tên Sản Phẩm:</Text>
          <Text>{consignment.productName}</Text>
        </Col>
        <Col xs={24} md={3}>
          <Text strong>Ngày Gửi:</Text>
          <Text>{consignment.date}</Text>
        </Col>
        <Col xs={24} md={3}>
          <Text strong>Giá Dự Kiến:</Text>
          <Text>{consignment.expectedPrice.toLocaleString()} VND</Text>
        </Col>
        <Col xs={24} md={4}>
          <Text strong>Trạng Thái:</Text>
          <Tag color={isApproved ? "green" : "orange"}>
            {isApproved ? "Đã ký" : "Đang chờ ký"}
          </Tag>
        </Col>

        <Col xs={24} md={2}>
          <Button type="primary" onClick={handleApprove} disabled={isApproved}>
            Ký
          </Button>
        </Col>
        <Col xs={24} md={2}>
          <Button type="danger" onClick={handleReject} disabled={isApproved}>
            Từ chối
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ApprovalItem;
