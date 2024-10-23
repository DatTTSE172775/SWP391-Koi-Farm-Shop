import React, { useState, useEffect } from "react";
import { Layout, Typography, Form, Input, InputNumber, Select, Button, message } from "antd";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import axiosPublic from "../../../api/axiosPublic";
import "./AddProds.scss";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddKoi = () => {
  const [form] = Form.useForm();
  const [breeders, setBreeders] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchBreeders();
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    try {
      const response = await axiosPublic.get("/varieties");
      if (Array.isArray(response.data)) {
          setVarieties(response.data);
          console.log(response.data);
      } else {
        message.error("Failed to fetch varieties. Unexpected data format.");
      }
    } catch (error) {
      console.error("Error fetching varieties:", error);
      message.error("Failed to fetch varieties. Please try again.");
    }
  };


  const fetchBreeders = async () => {
    try {
      const response = await axiosPublic.get("/breeders");
      if (Array.isArray(response.data)) {
        setBreeders(response.data);
        console.log(response.data);
      } else {
        message.error("Failed to fetch breeders. Unexpected data format.");
      }
    } catch (error) {
      console.error("Error fetching breeders:", error);
      message.error("Failed to fetch breeders. Please try again.");
    }
  };

  const onFinish = async (values) => {
    try {
      console.log("Selected Breeder ID:", values.breederId);
      const response = await axiosPublic.post("addKoiFish", values);
      message.success("Koi fish added successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error adding Koi fish:", error);
      message.error("Failed to add Koi fish. Please try again.");
    }
  };

  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <div className="add-container">
            <Title level={2}>Thêm cá Koi</Title>
            <div className="button-group">
              <Button type="primary" onClick={() => navigate("/admin/updateKoi")}>
                Cập nhật cá Koi
              </Button>
              <Button type="primary" onClick={() => navigate("/admin/deleteKoi")}>
                Xóa cá Koi
              </Button>
            </div>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="varietyId" label="Loại" rules={[{ required: true }]}>
                <Select>
                  {varieties.map((variety) => (
                    <Option key={variety.VarietyID} value={variety.VarietyID}>
                      {variety.VarietyName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="origin" label="Xuất xứ" rules={[{ required: true }]}>
                <Select>
                  <Option value="Imported">Nhập khẩu</Option>
                  <Option value="F1 Hybrid">Lai tạo F1</Option>
                  <Option value="Pure Vietnamese">Thuần Việt</Option>
                </Select>
              </Form.Item>
              <Form.Item name="breederId" label="Người nuôi" rules={[{ required: true }]}>
                <Select>
                  {breeders.map((breeder) => (
                    <Option key={breeder.BreederID} value={breeder.BreederID}>
                      {breeder.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
                <Select>
                  <Option value="Male">Đực</Option>
                  <Option value="Female">Cái</Option>
                  <Option value="Unknown">Không xác định</Option>
                </Select>
              </Form.Item>
              <Form.Item name="born" label="Năm sinh" rules={[{ required: true }]}>
                <InputNumber min={1900} max={new Date().getFullYear()} />
              </Form.Item>
              <Form.Item name="size" label="Kích thước (cm)" rules={[{ required: true }]}>
                <InputNumber min={0} step={0.1} />
              </Form.Item>
              <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                <InputNumber min={0} step={0.01} />
              </Form.Item>
              <Form.Item name="weight" label="Cân nặng (kg)" rules={[{ required: true }]}>
                <InputNumber min={0} step={0.1} />
              </Form.Item>
              <Form.Item name="personality" label="Tính cách">
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="feedingAmountPerDay" label="Lượng thức ăn mỗi ngày (g)">
                <InputNumber min={0} step={0.1} />
              </Form.Item>
              <Form.Item name="healthStatus" label="Tình trạng sức khỏe">
                <Input />
              </Form.Item>
              <Form.Item name="screeningRate" label="Tỷ lệ sàng lọc">
                <InputNumber min={0} max={100} step={0.1} />
              </Form.Item>
              <Form.Item name="certificateLink" label="Link chứng chỉ">
                <Input placeholder="change this to Upload file"/>
              </Form.Item>
              <Form.Item name="imagesLink" label="Link hình ảnh">
                <Input placeholder="change this to Upload file"/>
              </Form.Item>
              <Form.Item name="availability" label="Trạng thái">
                <Select>
                  <Option value="Available">Có sẵn</Option>
                  <Option value="Sold Out">Đã bán</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
                  Thêm cá Koi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddKoi;
