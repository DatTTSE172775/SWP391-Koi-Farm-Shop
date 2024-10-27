import React from "react";
import { Card, Typography, Button, Tag, notification } from "antd";
import "./StaffConsignmentItem.scss";
import axiosInstance from "../../../../api/axiosInstance";

const { Text } = Typography;

const StaffConsignmentItem = ({ consignment, onRemove }) => {
  if (!consignment) {
    return null;
  }

  const {
    ConsignmentID,
    ConsignmentType,
    ConsignmentMode,
    StartDate,
    PriceAgreed,
    ApprovedStatus,
  } = consignment;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('vi-VN');
  };

  const formatPrice = (price) => {
    return typeof price === 'number' 
      ? price.toLocaleString('vi-VN') + ' đ'
      : 'N/A';
  };

  const handleStatusChange = async () => {
    try {
      const nextStatus = ApprovedStatus === "Pending" ? "Approved" : "Rejected";
      const response = await axiosInstance.patch(
        `/koiconsignment/${ConsignmentID}/${nextStatus}`
      );
      
      console.log("Status change response:", response.data);

      if (response.data.success || response.data.message.includes("updated to Approved")) {
        notification.success({
          message: "Thành Công",
          description: `Đơn ký gửi đã chuyển sang trạng thái ${nextStatus}.`,
        });

        // Call the onRemove function to remove the item from the list
        if (onRemove) {
          onRemove(ConsignmentID);
        }
      } else {
        throw new Error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      if (error.message.includes("updated to Approved")) {
        // If the error message indicates successful approval, treat it as a success
        notification.success({
          message: "Thành Công",
          description: "Đơn ký gửi đã được chuyển sang trạng thái Approved.",
        });
        if (onRemove) {
          onRemove(ConsignmentID);
        }
      } else {
        notification.error({
          message: "Lỗi",
          description: "Không thể cập nhật trạng thái đơn ký gửi.",
        });
      }
    }
  };

  return (
    <Card className="staff-consignment-item">
      <div className="consignment-info">
        <div className="info-row">
          <Text strong>Mã đơn:</Text>
          <Text>{ConsignmentID}</Text>
        </div>
        <div className="info-row">
          <Text strong>Loại ký gửi:</Text>
          <Text>{ConsignmentType}</Text>
        </div>
        <div className="info-row">
          <Text strong>Hình thức:</Text>
          <Text>{ConsignmentMode}</Text>
        </div>
        <div className="info-row">
          <Text strong>Ngày ký gửi:</Text>
          <Text>{formatDate(StartDate)}</Text>
        </div>
        <div className="info-row">
          <Text strong>Giá mong muốn:</Text>
          <Text className="price">{formatPrice(PriceAgreed)}</Text>
        </div>
        <div className="info-row">
          <Text strong>Trạng thái:</Text>
          <Tag color="warning">{ApprovedStatus}</Tag>
        </div>
      </div>
      <div className="action-buttons">
        <Button type="default">Xem Chi Tiết</Button>
        <Button type="primary" onClick={handleStatusChange}>Chuyển Trạng Thái</Button>
      </div>
    </Card>
  );
};

export default StaffConsignmentItem;
