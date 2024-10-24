import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Button, message, Popconfirm } from "antd";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import axiosPublic from "../../../api/axiosPublic";
import { useNavigate } from "react-router-dom";
import "./delete.scss";

const { Content } = Layout;
const { Title } = Typography;

const DeleteKoi = () => {
  const [koiList, setKoiList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKoiList();
  }, []);

  const fetchKoiList = async () => {
    try {
      const response = await axiosPublic.get("koifish");
      setKoiList(response.data);
    } catch (error) {
      console.error("Error fetching Koi list:", error);
      message.error("Failed to fetch Koi list");
    }
  };

  const handleDelete = async (koiId) => {
    try {
      await axiosPublic.delete(`deleteKoi/${koiId}`);
      message.success("Koi deleted successfully");
      fetchKoiList(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting Koi:", error);
      message.error("Failed to delete Koi");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "KoiID", key: "KoiID" },
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "Gender", dataIndex: "Gender", key: "Gender" },
    { title: "Origin", dataIndex: "Origin", key: "Origin" },
    { title: "Born", dataIndex: "Born", key: "Born" },
    { title: "Size", dataIndex: "Size", key: "Size" },
    { title: "HealthStatus", dataIndex: "HealthStatus", key: "HealthStatus" },
    { title: "Price", dataIndex: "Price", key: "Price" },
    { title: "Availability", dataIndex: "Availability", key: "Availability" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this Koi?"
          onConfirm={() => handleDelete(record.KoiID)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <div className="delete-koi-container">
            <Title level={2}>Xóa cá Koi</Title>
            <div className="button-group">
              <Button type="primary" onClick={() => navigate("/admin/addKoi")}>
                Thêm cá Koi
              </Button>
              <Button type="primary" onClick={() => navigate("/admin/updateKoi")}>
                Cập nhật cá Koi
              </Button>
            </div>
            {koiList.length > 0 ? (
              <Table dataSource={koiList} columns={columns} rowKey="KoiID" />
            ) : (
              <p>No koi data available</p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DeleteKoi;
