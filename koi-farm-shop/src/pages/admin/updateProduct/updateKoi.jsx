import React, { useState, useEffect } from "react";
import { Layout, Typography, Form, Input, InputNumber, Select, Button, message, Table } from "antd";
import axiosPublic from "../../../api/axiosPublic";
import "./update.scss";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const UpdateKoi = () => {
  const [koiList, setKoiList] = useState([]);
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [form] = Form.useForm();
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

  const handleUpdate = async (values) => {
    try {
      const { KoiID, ...updateData } = {
        ...values,
        Born: parseInt(values.Born),
        Size: parseFloat(values.Size),
        Price: parseFloat(values.Price)
      };

      await axiosPublic.put(`updateKoi/${selectedKoi.KoiID}`, updateData);
      message.success("Koi updated successfully");
      setSelectedKoi(null);
      form.resetFields();
      fetchKoiList();
    } catch (error) {
      console.error("Error updating Koi:", error);
      message.error("Failed to update Koi");
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
        <Button type="primary" onClick={() => {
          setSelectedKoi(record);
          form.setFieldsValue(record);
        }}>
          Cập nhật
        </Button>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    if (selectedKoi?.KoiID !== record.KoiID) return null;
    
    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        className="update-form"
      >
        <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Gender" label="Gender" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="Origin" label="Origin" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Born" label="Born" rules={[{ required: true }]}>
          <InputNumber min={1990} max={2024} />
        </Form.Item>
        <Form.Item name="Size" label="Size" rules={[{ required: true }]}>
          <InputNumber min={1} max={30}/>
        </Form.Item>
        <Form.Item name="HealthStatus" label="Health Status" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="Availability" label="Availability" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Available">Available</Select.Option>
            <Select.Option value="Sold Out">Sold Out</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Koi
          </Button>
          <Button onClick={() => {
            setSelectedKoi(null);
            form.resetFields();
          }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout>
      <Layout>
        <Content className="admin-content">
          <div className="update-koi-container">
            <Title level={2}>Cập nhật cá Koi</Title>
            <div className="button-group">
              <Button type="primary" onClick={() => navigate("/admin/addKoi")}>
                Thêm cá Koi
              </Button>
              <Button type="primary" onClick={() => navigate("/admin/deleteKoi")}>
                Xóa cá Koi
              </Button>
            </div>

            <Table 
              dataSource={koiList} 
              columns={columns} 
              rowKey="KoiID" 
              expandable={{
                expandedRowRender,
                expandedRowKeys: selectedKoi ? [selectedKoi.KoiID] : [],
                onExpand: (expanded, record) => {
                  if (expanded) {
                    setSelectedKoi(record);
                    form.setFieldsValue(record);
                  } else {
                    setSelectedKoi(null);
                    form.resetFields();
                  }
                }
              }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UpdateKoi;
