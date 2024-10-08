import { Layout, Typography } from "antd";
import React, { useEffect, useState } from "react";
import ApprovalItem from "../../../components/admin/consignement/consign-item/approval/ApprovalItem";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import "./ManagerConsignmentApprovalPage.scss";

const { Title } = Typography;
const { Content } = Layout;

const ManagerConsignmentApprovalPage = () => {
  const [consignments, setConsignments] = useState([]);

  useEffect(() => {
    // Dữ liệu mẫu cho các yêu cầu ký gửi cần ký
    const sampleConsignments = [
      {
        id: "CSG001",
        productName: "Kohaku Koi",
        date: "2024-10-10",
        expectedPrice: 3000000,
        status: "Đang chờ ký",
      },
      {
        id: "CSG002",
        productName: "Showa Koi",
        date: "2024-10-11",
        expectedPrice: 2500000,
        status: "Đang chờ ký",
      },
    ];
    setConsignments(sampleConsignments);
  }, []);

  const handleApprove = (id) => {
    const updatedConsignments = consignments.map((consignment) =>
      consignment.id === id ? { ...consignment, status: "Đã ký" } : consignment
    );
    setConsignments(updatedConsignments);
  };

  const handleReject = (id) => {
    const updatedConsignments = consignments.filter(
      (consignment) => consignment.id !== id
    );
    setConsignments(updatedConsignments);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="manager-consignment-approval-content">
          <div className="manager-consignment-approval-page">
            <Title level={2}>Phê Duyệt Yêu Cầu Ký Gửi</Title>
            <div className="approval-list">
              {consignments.length > 0 ? (
                consignments.map((consignment) => (
                  <ApprovalItem
                    key={consignment.id}
                    consignment={consignment}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))
              ) : (
                <Title level={4} type="secondary">
                  Không có yêu cầu ký gửi nào cần phê duyệt.
                </Title>
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerConsignmentApprovalPage;
