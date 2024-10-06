import { Layout, Typography } from "antd";
import React, { useEffect, useState } from "react";
import StaffConsignmentItem from "../../../components/staff/consign/cosign-item/StaffConsignmentItem";
import StaffHeader from "../../../components/staff/header/StaffHeader";
import Sidebar from "../../../components/staff/sidebar/StaffSidebar";
import "./StaffConsignmentPage.scss";

const { Title } = Typography;
const { Content } = Layout;

const StaffConsignmentPage = () => {
  const [consignments, setConsignments] = useState([]);

  useEffect(() => {
    // Dữ liệu mẫu cho các yêu cầu ký gửi
    const sampleConsignments = [
      {
        id: "CSG001",
        productName: "Kohaku Koi",
        date: "2024-10-10",
        expectedPrice: 3000000,
        status: "Đang chờ duyệt",
      },
      {
        id: "CSG002",
        productName: "Showa Koi",
        date: "2024-10-11",
        expectedPrice: 2500000,
        status: "Đang xem xét",
      },
      {
        id: "CSG003",
        productName: "Shiro Utsuri Koi",
        date: "2024-10-12",
        expectedPrice: 2000000,
        status: "Đang chờ duyệt",
      },
      {
        id: "CSG004",
        productName: "Asagi Koi",
        date: "2024-10-13",
        expectedPrice: 2800000,
        status: "Hủy bỏ",
      },
    ];
    setConsignments(sampleConsignments);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <StaffHeader />
        <Content className="staff-consignment-content">
          <div className="staff-consignment-page">
            <Title level={2}>Quản Lý Yêu Cầu Ký Gửi</Title>
            <div className="consignment-list">
              {consignments.length > 0 ? (
                consignments.map((consignment) => (
                  <StaffConsignmentItem
                    key={consignment.id}
                    consignment={consignment}
                  />
                ))
              ) : (
                <Title level={4} type="secondary">
                  Không có yêu cầu ký gửi nào.
                </Title>
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffConsignmentPage;
