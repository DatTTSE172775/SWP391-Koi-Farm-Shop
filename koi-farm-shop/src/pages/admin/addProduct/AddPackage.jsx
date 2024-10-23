import React, { useState, useEffect } from "react";
import { Layout, Typography, Form, Input, InputNumber, Select, Button, message } from "antd";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import axiosPublic from "../../../api/axiosPublic";
import { useNavigate } from "react-router-dom";
import "./AddProds.scss";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AddPackage = () => {
  const [form] = Form.useForm();
  const [varieties, setVarieties] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
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



  const onFinish = async (values) => {
    try {
      // Prepare the package data
      const packageData = {
        KoiID: values.KoiID[0],
        PackageName: values.PackageName,
        ImageLink: values.ImageLink,
        Price: parseFloat(values.Price), // Ensure Price is a number
        PackageSize: values.PackageSize,
        Availability: values.Availability
      };

      console.log("Sending package data:", packageData); // Log the data being sent

      const response = await axiosPublic.post("koipackage", packageData);
      
      console.log("Server response:", response.data);

      if (response.data && response.data.PackageID) {
        message.success(`Koi package added successfully with ID: ${response.data.PackageID}`);
        // If the package was created successfully, add the varieties
        const packageId = response.data.PackageID;
        const varietyPromises = values.KoiID.map(varietyId => 
          axiosPublic.post("addKoiPackageVariety", {
            PackageID: packageId,
            VarietyID: varietyId
          })
        );

        await Promise.all(varietyPromises);

        message.success("Koi package and varieties added successfully!");
        form.resetFields();
      } else {
        throw new Error("PackageID not found in response");
      }
    } catch (error) {
      console.error("Error adding Koi package:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      message.error(`Failed to add Koi package: ${error.message}`);
    }
  };


  return (
    <Layout className="admin-layout">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="admin-content">
          <div className="add-container">
            <Title level={2}>Thêm gói cá Koi</Title>
            <div className="button-group">
              <Button type="primary" onClick={() => navigate("/admin/updatePackage")}>
                Cập nhật gói cá Koi
              </Button>
              <Button type="primary" onClick={() => navigate("/admin/deletePackage")}>
                Xóa gói cá Koi
              </Button>
            </div>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item 
                name="KoiID" 
                label="Loại Koi" 
                rules={[{ required: true, message: 'Vui lòng chọn ít nhất một loại Koi' }]}
              >
                <Select mode="multiple" placeholder="Chọn một hoặc nhiều loại Koi">
                  {varieties.map((variety) => (
                    <Option key={variety.VarietyID} value={variety.VarietyID}>
                      {variety.VarietyName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="PackageName" label="Tên gói cá Koi" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="PackageSize" label="Số lượng cá trong gói" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="Price" label="Giá gói cá Koi" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="Availability" label="Trạng thái" rules={[{ required: true }]}>
                <Select>
                  <Option value="Available">Còn hàng</Option>
                  <Option value="Sold Out">Đã bán</Option>
                </Select>
              </Form.Item>
              <Form.Item name="ImageLink" label="Hình ảnh" rules={[{ required: true }]}>
                <Input />
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

export default AddPackage;
