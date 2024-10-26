import { EyeOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Dropdown,
  Menu,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assignConsignment } from "../../../../store/actions/consignmentActions";
import { fetchStaff } from "../../../../store/actions/staffActions";
import "./ConsignmentRequestItem.scss";

const { Text, Title } = Typography;

const statusColors = {
  Pending: "orange",
  Approved: "green",
  "In Care": "blue",
  "Listed for Sale": "cyan",
  Sold: "purple",
  Withdrawn: "red",
};

const ConsignmentRequestItem = ({ consignment }) => {
  const [assignee, setAssignee] = useState("Chưa giao");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { staff } = useSelector((state) => state.staff || { staff: [] });

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  useEffect(() => {
    if (consignment.UserID) {
      const assignedStaff = staff.find(
        (member) => member.UserID === consignment.UserID
      );
      if (assignedStaff) {
        setAssignee(assignedStaff.Username);
      }
    }
  }, [consignment.UserID, staff]);

  const handleAssign = (userId, username) => {
    dispatch(assignConsignment(consignment.ConsignmentID, userId, username));
  };

  const assigneeMenu = (
    <Menu
      onClick={({ key }) =>
        handleAssign(key, staff.find((s) => s.UserID == key).Username)
      }
    >
      {staff.map((member) => (
        <Menu.Item key={member.UserID}>
          <Text>{member.Username}</Text>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Card className="consignment-item-card">
      <Row align="middle" gutter={[16, 24]}>
        <Col xs={24} md={5}>
          <Space direction="vertical">
            <Title level={5}>Mã Số Ký Gửi</Title>
            <Text>{consignment.ConsignmentID}</Text>
          </Space>
        </Col>

        <Col xs={12} md={4}>
          <Title level={5}>Ngày Bắt Đầu</Title>
          <Text>{new Date(consignment.StartDate).toLocaleDateString()}</Text>
        </Col>

        <Col xs={12} md={4}>
          <Title level={5}>Giá Đồng Ý</Title>
          <Text strong>{consignment.PriceAgreed.toLocaleString()} VND</Text>
        </Col>

        <Col xs={12} md={5}>
          <Title level={5}>Nhân Viên Phụ Trách</Title>
          {consignment.Status === "Pending" ? (
            <Dropdown overlay={assigneeMenu} trigger={["click"]}>
              <a
                onClick={(e) => e.preventDefault()}
                className="editable-assignee"
              >
                {assignee}
              </a>
            </Dropdown>
          ) : (
            <Text>{assignee}</Text>
          )}
        </Col>

        <Col xs={12} md={4}>
          <Title level={5}>Trạng Thái</Title>
          <Tag
            color={statusColors[consignment.Status]}
            className="consignment-status-tag"
          >
            {consignment.Status}
          </Tag>
        </Col>

        <Col xs={24} md={2}>
          <Tooltip title="Xem Chi Tiết">
            <EyeOutlined
              className="view-icon"
              onClick={() => navigate(`/admin/manage-consignments/${consignment.ConsignmentID}`)}
            />
          </Tooltip>
        </Col>
      </Row>
    </Card>
  );
};

ConsignmentRequestItem.propTypes = {
  consignment: PropTypes.shape({
    ConsignmentID: PropTypes.number.isRequired,
    StartDate: PropTypes.string.isRequired,
    PriceAgreed: PropTypes.number.isRequired,
    Status: PropTypes.string.isRequired,
    UserID: PropTypes.number,
  }).isRequired,
};

export default ConsignmentRequestItem;
