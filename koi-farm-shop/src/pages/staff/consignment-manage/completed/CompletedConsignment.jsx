import { Spin, notification } from "antd";
import React, { useState, useEffect } from "react";
import ConsignmentList from "../../../../components/staff/consign/consign-list/ConsignmentList";
import axiosInstance from "../../../../api/axiosInstance";

const CompletedConsignment = () => {
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  console.log('User ID from localStorage:', userId);
  useEffect(() => {
    const fetchConsignments = async () => {
        try {
          const response = await axiosInstance.get(`/koiconsignment/approved/${userId}`);
          console.log("API Response:", response.data);
          if (response.data && Array.isArray(response.data.data)) {
            setConsignments(response.data.data);
          } else {
            console.error("API did not return an array in data property:", response.data);
            setConsignments([]);
          }
          setLoading(false);
        } catch (err) {
          console.error("Error fetching consignments:", err);
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchConsignments();
  }, []);

  if (loading) return <Spin tip="Đang tải đơn ký gửi..." />;
  if (error) {
    notification.error({
      message: "Lỗi",
      description: "Không thể tải đơn ký gửi.",
    });
    return <div>Error: {error}</div>;
  }

  // const completedConsignments = consignments.filter(
  //   (consignment) => consignment.Status === "Approved"
  // );

  return <ConsignmentList
    initialConsignments={consignments} 
    filterStatus="Approved" 
  />;
};

export default CompletedConsignment;