import { Button, Card, Col, Row, Select, Typography } from "antd";
import React, { useState } from "react";
import "./ConsignmentRequestItem.scss";

const { Text } = Typography;
const { Option } = Select;

const ConsignmentRequestItem = ({ request, onAssignStaff }) => {
  const [assignedTo, setAssignedTo] = useState(
    request.assignedTo || "Chưa giao"
  );

  const handleAssignChange = (value) => {
    setAssignedTo(value);
    onAssignStaff(request.id, value);
  };

  return (
    <Card className="consignment-request-item-card">
      <Row gutter={[16, 16]}>
        {/* Request Info */}
        <Col xs={24} md={4}>
          <Text strong>Mã Yêu Cầu:</Text>
          <Text>{request.id}</Text>
        </Col>
        <Col xs={24} md={5}>
          <Text strong>Loại Cá:</Text>
          <Text>{request.fishType}</Text>
        </Col>
        <Col xs={24} md={4}>
          <Text strong>Ngày Yêu Cầu:</Text>
          <Text>{request.date}</Text>
        </Col>
        <Col xs={24} md={3}>
          <Text strong>Giá Mong Muốn:</Text>
          <Text>{request.price.toLocaleString()} VND</Text>
        </Col>

        {/* Staff Assignment */}
        <Col xs={24} md={5}>
          <Text strong>Nhân Viên Phụ Trách:</Text>
          <Select
            value={assignedTo}
            onChange={handleAssignChange}
            className="assign-staff-select"
          >
            <Option value="Chưa giao">Chưa giao</Option>
            <Option value="Staff A">Staff A</Option>
            <Option value="Staff B">Staff B</Option>
            <Option value="Staff C">Staff C</Option>
          </Select>
        </Col>

        {/* View Details Button */}
        <Col xs={24} md={3}>
          <Button type="primary">Xem Chi Tiết</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ConsignmentRequestItem;
