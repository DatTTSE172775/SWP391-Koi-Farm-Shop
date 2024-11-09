import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Button, message, Popconfirm } from "antd";
import axiosPublic from "../../../api/axiosPublic";
import { useNavigate } from "react-router-dom";
import "./delete.scss";

const { Content } = Layout;
const { Title } = Typography;

const DeleteKoiPackage = () => {
  const [koiPackageList, setKoiPackageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKoiPackageList();
  }, []);

  const fetchKoiPackageList = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get("koipackages");
      console.log("API Response:", response.data); // Log the response data
      if (Array.isArray(response.data)) {
        setKoiPackageList(response.data);
      } else if (typeof response.data === 'object' && response.data !== null) {
        // If the response is an object, it might be nested under a property
        const dataArray = response.data.packages || response.data.data || [];
        setKoiPackageList(dataArray);
      } else {
        throw new Error("Received data is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching Koi Package list:", error);
      setError(error.message);
      message.error("Failed to fetch Koi Package list");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (packageId) => {
    try {
      await axiosPublic.delete(`deleteKoiPackage/${packageId}`);
      message.success("Koi Package deleted successfully");
      fetchKoiPackageList(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting Koi Package:", error);
      message.error("Failed to delete Koi Package");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "PackageID", key: "PackageID" },
    { title: "Name", dataIndex: "PackageName", key: "PackageName" },
    { title: "Package Size", dataIndex: "PackageSize", key: "PackageSize" },
    { title: "Price", dataIndex: "Price", key: "Price" },
    { title: "Availability", dataIndex: "Availability", key: "Availability" },
    { title: "Created Date", dataIndex: "CreatedDate", key: "CreatedDate" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this Koi Package?"
          onConfirm={() => handleDelete(record.PackageID)}
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
    <Layout>
      <Layout>
        <Content className="admin-content">
          <div className="delete-koi-package-container">
            <Title level={2}>Xóa Gói cá Koi</Title>
            <div className="button-group">
              <Button type="primary" onClick={() => navigate("/admin/AddPackage")}>
                Thêm Gói cá Koi
              </Button>
              <Button type="primary" onClick={() => navigate("/admin/updatePackage")}>
                Cập nhật Gói cá Koi
              </Button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : koiPackageList.length > 0 ? (
              <Table dataSource={koiPackageList} columns={columns} rowKey="PackageID" />
            ) : (
              <p>No koi package data available</p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DeleteKoiPackage;
