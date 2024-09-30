import { Button, Form, Input, Select } from "antd";
import React from "react";
import "./KoiSearch.scss";

const { Option } = Select;

const KoiSearch = ({ onFilter }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onFilter(values);
  };

  const handleReset = () => {
    form.resetFields();
    onFilter({});
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleFinish}
      className="koi-search-filter"
    >
      <Form.Item name="search" label="Tìm kiếm">
        <Input placeholder="Nhập tên cá Koi" allowClear />
      </Form.Item>
      <Form.Item name="color" label="Màu sắc">
        <Select placeholder="Chọn màu sắc" allowClear>
          <Option value="Đỏ & Trắng">Đỏ & Trắng</Option>
          <Option value="Đen & Đỏ & Trắng">Đen & Đỏ & Trắng</Option>
          {/* Thêm các màu sắc khác */}
        </Select>
      </Form.Item>
      <Form.Item name="size" label="Kích thước">
        <Select placeholder="Chọn kích thước" allowClear>
          <Option value="25 cm">25 cm</Option>
          <Option value="30 cm">30 cm</Option>
          {/* Thêm các kích thước khác */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lọc
        </Button>
      </Form.Item>
      <Form.Item>
        <Button htmlType="button" onClick={handleReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default KoiSearch;
