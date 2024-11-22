import React, { useState } from "react";
import { Card, Typography, Button, Tag, notification } from "antd";
import "./StaffConsignmentItem.scss";
import axiosInstance from "../../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const StaffConsignmentItem = ({ consignment, onRemove }) => {
  const navigate = useNavigate();
  const [action, setAction] = useState(null);

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

  const shouldShowUpdateButton = (status) => {
    return status === "Pending";
  };

  const handleStatusChange = async (actionType) => {
    try {
      const nextStatus = actionType === "Approve" ? "Approved" : "Rejected";
      
      // First update the consignment status
      const statusResponse = await axiosInstance.patch(
        `/koiconsignment/${ConsignmentID}/${nextStatus}`
      );

      // Check if the response contains data
      if (statusResponse?.data) {
        // Only create KoiFish entry if approving
        if (actionType === "Approve") {
          const koiData = {
            KoiType: consignment.KoiType,
            KoiAge: consignment.KoiAge,
            KoiSize: consignment.KoiSize,
            PriceAgreed: consignment.PriceAgreed,
            InspectionResult: consignment.InspectionResult,
            ImagePath: consignment.ImagePath
          };

          // Create KoiFish entry
          const koiResponse = await axiosInstance.post(
            'from-consignment',
            koiData
          );

          if (koiResponse.data.koiId) {
            // Update the consignment with the new KoiID
            await axiosInstance.patch(
              `/koiconsignment/${ConsignmentID}`,
              { koiId: koiResponse.data.koiId }
            );
          }
        }

        notification.success({
          message: "Thành Công",
          description: `Đơn ký gửi đã chuyển sang trạng thái ${nextStatus}.`,
        });

        if (onRemove) {
          onRemove(ConsignmentID);
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      notification.error({
        message: "Lỗi",
        description: error.response?.data?.message || "Không thể cập nhật trạng thái đơn ký gửi.",
      });
    }
  };

  const handleSeeDetails = () => {
    navigate(`/staff/consignments/detail/${ConsignmentID}`);
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
        <Button type="default" onClick={handleSeeDetails}>Xem Chi Tiết</Button>
        {shouldShowUpdateButton(ApprovedStatus) && (
          <>
            <Button 
              className="ant-btn-approve" 
              onClick={() => handleStatusChange("Approve")}
            >
              Approve
            </Button>
            <Button 
              className="ant-btn-reject" 
              onClick={() => handleStatusChange("Reject")}
            >
              Reject
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default StaffConsignmentItem;
