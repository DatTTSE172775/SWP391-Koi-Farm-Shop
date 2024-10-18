import { Button, Card, Col, Row, Select, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StaffConsignmentItem.scss";

const { Text } = Typography;
const { Option } = Select;

const StaffConsignmentItem = ({ consignment }) => {
  const [status, setStatus] = useState(consignment.status);
  const navigate = useNavigate();

  const handleStatusChange = (value) => {
    setStatus(value);
    // Logic cập nhật trạng thái ký gửi vào hệ thống hoặc backend
    console.log(`Consignment ${consignment.id} updated to status: ${value}`);
  };

  return (
    <Card className="staff-consignment-item-card">
      <Row gutter={[16, 16]}>
        {/* Consignment Info */}
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

        {/* Status Selection */}
        <Col xs={24} md={4}>
          <Text strong>Trạng Thái:</Text>
          <Select
            value={status}
            onChange={handleStatusChange}
            className="status-select"
          >
            <Option value="Đang chờ duyệt">Đang chờ duyệt</Option>
            <Option value="Đang xem xét">Đang xem xét</Option>
            <Option value="Đã xem xét">Đã xem xét</Option>
            <Option value="Hủy bỏ">Hủy bỏ</Option>
          </Select>
        </Col>

        {/* View Details Button */}
        <Col xs={24} md={2}>
          <Button
            type="primary"
            onClick={() => navigate(`/staff/consignments/${consignment.id}`)}
          >
            Xem Chi Tiết
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default StaffConsignmentItem;
