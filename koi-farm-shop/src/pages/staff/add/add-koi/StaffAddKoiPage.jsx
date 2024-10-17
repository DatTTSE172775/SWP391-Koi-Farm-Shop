import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Layout,
  Select,
  Typography,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import StaffHeader from "../../../../components/staff/header/StaffHeader";
import Sidebar from "../../../../components/staff/sidebar/StaffSidebar";
import "./StaffAddKoiPage.scss";

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const StaffAddKoiPage = () => {
  const [consignment, setConsignment] = useState(null);

  useEffect(() => {
    // Lấy thông tin ký gửi đã được phê duyệt từ backend hoặc state
    const approvedConsignment = {
      id: "CSG001",
      productName: "Kohaku Koi",
      expectedPrice: 3000000,
    };
    setConsignment(approvedConsignment);
  }, []);

  const handleSubmit = (values) => {
    console.log("Form Values: ", values);
    message.success("Cá Koi đã được thêm vào hệ thống thành công!");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <StaffHeader />
        <Content className="staff-add-koi-content">
          <div className="staff-add-koi-page">
            <Title level={2}>Thêm Cá Koi Lên Hệ Thống</Title>
            {consignment ? (
              <Form
                layout="vertical"
                name="addKoiForm"
                onFinish={handleSubmit}
                initialValues={{
                  productName: consignment.productName,
                  price: consignment.expectedPrice,
                }}
              >
                <Form.Item
                  name="productName"
                  label="Tên Cá Koi"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên cá Koi!" },
                  ]}
                >
                  <Input placeholder="Nhập tên cá Koi" />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Giá Bán"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá bán!" },
                  ]}
                >
                  <Input placeholder="Nhập giá bán" type="number" />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Mô Tả"
                  rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                >
                  <Input.TextArea rows={4} placeholder="Nhập mô tả về cá Koi" />
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Loại Cá Koi"
                  rules={[
                    { required: true, message: "Vui lòng chọn loại cá Koi!" },
                  ]}
                >
                  <Select placeholder="Chọn loại cá Koi">
                    <Option value="kohaku">Kohaku</Option>
                    <Option value="showa">Showa</Option>
                    <Option value="shiro_utsuri">Shiro Utsuri</Option>
                    <Option value="goshiki">Goshiki</Option>
                    {/* Thêm các loại khác nếu cần */}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="image"
                  label="Hình Ảnh"
                  rules={[
                    { required: true, message: "Vui lòng tải lên hình ảnh!" },
                  ]}
                >
                  <Upload name="image" listType="picture" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Tải Lên Hình Ảnh</Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Thêm Cá Koi
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Title level={4} type="secondary">
                Không có yêu cầu ký gửi nào cần thêm.
              </Title>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffAddKoiPage;
