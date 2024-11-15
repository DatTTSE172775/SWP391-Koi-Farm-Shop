import { Alert, Layout, Spin, Typography, Table, Button, Space, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleDelete = async (record) => {
    try {
      await axiosInstance.delete(`koiconsignment/${record.ConsignmentID}`);
      message.success('Consignment deleted successfully');
      // Refresh the consignments list
      const response = await axiosInstance.get("koiconsignments");
      setConsignments(response.data.data || []);
    } catch (error) {
      console.error("Error deleting consignment:", error);
      message.error('Failed to delete consignment');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ConsignmentID',
      key: 'ConsignmentID',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.ConsignmentID - b.ConsignmentID,
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
      dataIndex: 'ApprovedStatus',
      key: 'ApprovedStatus',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleSeeDetail(record)}>Chi Tiết</Button>
          <Popconfirm
            title="Are you sure you want to delete this consignment?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  console.log("Consignments state:", consignments);

  return (
    <Layout className="admin-consignment">
      <Layout className="site-layout">
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