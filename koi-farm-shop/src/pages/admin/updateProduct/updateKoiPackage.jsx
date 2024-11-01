import React, { useState, useEffect } from "react";
import { Layout, Typography, Form, Input, InputNumber, Select, Button, message, Table } from "antd";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import axiosPublic from "../../../api/axiosPublic";
import { useNavigate } from "react-router-dom";
import "./update.scss";

const { Content } = Layout;
const { Title } = Typography;

const UpdateKoiPackage = () => {
  const [koiPackageList, setKoiPackageList] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchKoiPackageList();
  }, []);

  const fetchKoiPackageList = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get("koipackages");
      if (Array.isArray(response.data)) {
        setKoiPackageList(response.data);
      } else if (typeof response.data === 'object' && response.data !== null) {
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

  const handleUpdate = async (values) => {
    try {
      const { PackageID, ...updateData } = {
        ...values,
        PackageSize: parseInt(values.PackageSize),
        Price: parseFloat(values.Price)
      };

      await axiosPublic.put(`updateKoiPackage/${selectedPackage.PackageID}`, updateData);
      message.success("Koi Package updated successfully");
      setSelectedPackage(null);
      form.resetFields();
      fetchKoiPackageList();
    } catch (error) {
      console.error("Error updating Koi Package:", error);
      message.error("Failed to update Koi Package");
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
        <Button 
          type="primary" 
          onClick={() => {
            setSelectedPackage(record);
            form.setFieldsValue(record);
          }}
        >
          Cập nhật
        </Button>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    if (selectedPackage?.PackageID !== record.PackageID) return null;
    
    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        className="update-form"
      >
        <Form.Item 
          name="PackageName" 
          label="Package Name" 
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="PackageSize" 
          label="Package Size" 
          rules={[{ required: true }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item 
          name="Price" 
          label="Price" 
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item 
          name="Availability" 
          label="Availability" 
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Available">Available</Select.Option>
            <Select.Option value="Sold Out">Sold Out</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Package
          </Button>
          <Button 
            onClick={() => {
              setSelectedPackage(null);
              form.resetFields();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <div className="update-koi-package-container">
            <Title level={2}>Cập nhật Gói cá Koi</Title>
            <div className="button-group">
              <Button type="primary" onClick={() => navigate("/admin/AddPackage")}>
                Thêm Gói cá Koi
              </Button>
              <Button type="primary" onClick={() => navigate("/admin/deletePackage")}>
                Xóa Gói cá Koi
              </Button>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : koiPackageList.length > 0 ? (
              <Table 
                dataSource={koiPackageList} 
                columns={columns} 
                rowKey="PackageID"
                expandable={{
                  expandedRowRender,
                  expandedRowKeys: selectedPackage ? [selectedPackage.PackageID] : [],
                  onExpand: (expanded, record) => {
                    if (expanded) {
                      setSelectedPackage(record);
                      form.setFieldsValue(record);
                    } else {
                      setSelectedPackage(null);
                      form.resetFields();
                    }
                  }
                }}
              />
            ) : (
              <p>No koi package data available</p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UpdateKoiPackage;
