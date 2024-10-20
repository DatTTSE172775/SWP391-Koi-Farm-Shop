import { Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ConsignmentRequestItem from "../../../components/admin/consignement/consign-item/ConsignmentRequestItem";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import "./AdminConsignment.scss";

const { Title } = Typography;

const ManagerConsignmentPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Dữ liệu mẫu yêu cầu ký gửi
    const sampleRequests = [
      {
        id: "REQ001",
        fishType: "Kohaku Koi",
        date: "2024-10-01",
        price: 2000000,
        assignedTo: "Chưa giao",
      },
      {
        id: "REQ002",
        fishType: "Showa Koi",
        date: "2024-10-03",
        price: 1800000,
        assignedTo: "Staff A",
      },
      {
        id: "REQ003",
        fishType: "Shiro Utsuri Koi",
        date: "2024-10-04",
        price: 1500000,
        assignedTo: "Chưa giao",
      },
    ];
    setRequests(sampleRequests);
  }, []);

  const handleAssignStaff = (requestId, staff) => {
    // Cập nhật người phụ trách của yêu cầu ký gửi trong danh sách yêu cầu
    const updatedRequests = requests.map((request) =>
      request.id === requestId ? { ...request, assignedTo: staff } : request
    );
    setRequests(updatedRequests);
  };

  return (
    <Layout className="manager-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="manager-consignment-page">
          <Title level={2}>Quản Lý Yêu Cầu Ký Gửi</Title>
          <div className="consignment-requests-list">
            {requests.map((request) => (
              <ConsignmentRequestItem
                key={request.id}
                request={request}
                onAssignStaff={handleAssignStaff}
              />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerConsignmentPage;
