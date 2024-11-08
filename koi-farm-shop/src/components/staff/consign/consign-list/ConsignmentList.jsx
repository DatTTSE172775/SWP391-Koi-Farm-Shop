import { Empty, Typography } from "antd";
import React, { useState, useEffect } from "react";
import StaffConsignmentItem from "../consign-item/StaffConsignmentItem";
import "./ConsignmentList.scss";

// const { Title } = Typography;

const ConsignmentList = ({ initialConsignments = [], filterStatus }) => {
  const [consignments, setConsignments] = useState([]);

  useEffect(() => {
    console.log("Initial Consignments:", initialConsignments);
    setConsignments(Array.isArray(initialConsignments) ? initialConsignments : []);
  }, [initialConsignments]);

  if (consignments.length === 0) {
    return (
      <Empty
        description={`Không có đơn ký gửi ở trạng thái ${filterStatus}`}
        className="empty-state"
      />
    );
  }

  // Hàm xóa đơn ký gửi khỏi danh sách sau khi cập nhật trạng thái
  const removeConsignment = (consignmentId) => {
    console.log("Removing consignment:", consignmentId);
    setConsignments((prevConsignments) =>
      prevConsignments.filter((consignment) => consignment.ConsignmentID !== consignmentId)
    );
  };

  return (
    <div className="consignment-list-container">
      {/* <Title level={3} className="list-title">
        {filterStatus === "Processing"
          ? "Đơn Ký Gửi Đang Xử Lý"
          : filterStatus === "Approved"
          ? "Đơn Ký Gửi Đã Duyệt"
          : filterStatus === "Rejected"
          ? "Đơn Ký Gửi Đã Từ Chối"
          : filterStatus === "Pending"
          ? "Đơn Ký Gửi Đang Chờ Xử Lý"
          : "Đơn Ký Gửi"}
      </Title> */}
      <div className="consignment-list">
        {consignments.map((consignment) => (
          <StaffConsignmentItem
            key={consignment.ConsignmentID}
            consignment={consignment}
            onRemove={removeConsignment}
          />
        ))}
      </div>
    </div>
  );
};

export default ConsignmentList;
