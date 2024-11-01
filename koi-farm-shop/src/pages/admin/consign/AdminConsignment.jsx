import { Alert, Layout, Spin, Typography, Table, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import axiosInstance from "../../../api/axiosInstance";
import "./AdminConsignment.scss";

const { Content } = Layout;

const AdminConsignment = () => {
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsignments = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("koiconsignments");
        console.log("API response:", response.data);
        const consignmentData = response.data.data || [];
        setConsignments(consignmentData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching consignments:", err);
        setError("Failed to fetch consignments");
        setLoading(false);
      }
    };
    fetchConsignments();
  }, []);

  const handleSeeDetail = async (record) => {
    try {
      const response = await axiosInstance.get(`koiconsignment/${record.ConsignmentID}`);
      const consignmentDetails = response.data.data;
      navigate(`/admin/consign-detail/${record.ConsignmentID}`, { state: { consignmentDetails } });
    } catch (error) {
      console.error("Error fetching consignment details:", error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ConsignmentID',
      key: 'ConsignmentID',
    },
    {
      title: 'Loại Ký gửi',
      dataIndex: 'ConsignmentType',
      key: 'ConsignmentType',
    },
    {
      title: 'Ngày ký gửi',
      dataIndex: 'StartDate',
      key: 'StartDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleSeeDetail(record)}>Chi Tiết</Button>
        </Space>
      ),
    },
  ];

  console.log("Consignments state:", consignments);

  return (
    <Layout className="admin-consignment">
      <AdminSidebar />
      <Layout className="site-layout">
        <AdminHeader />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Typography.Title level={2}>Ký gửi</Typography.Title>
            {loading ? (
              <Spin size="large" />
            ) : error ? (
              <Alert message={error} type="error" />
            ) : consignments.length > 0 ? (
              <Table 
                columns={columns} 
                dataSource={consignments} 
                rowKey="ConsignmentID"
              />
            ) : (
              <Alert message="No consignments found" type="info" />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminConsignment;
