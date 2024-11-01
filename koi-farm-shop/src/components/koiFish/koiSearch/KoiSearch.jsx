import { Button, Form, Input, Select, Slider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import "./KoiSearch.scss";
import {getAllVarieties} from "../../../store/actions/KoiActions";

const { Option } = Select;

const KoiSearch = ({ onFilter, setLoading }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { varieties, loading: varietiesLoading, error } = useSelector(state => state.koi);

  useEffect(() => {
    // Gọi action để lấy danh sách giống cá Koi khi component được render lần đầu
    dispatch(getAllVarieties());
  }, [dispatch]);

  if (error) {
    console.error("Error fetching varieties:", error);
  }

  const handleFinish = (values) => {
    setLoading(true); // Bật loading khi nhấn "Tìm kiếm"
    onFilter(values);
  };

  const handleReset = () => {
    form.resetFields();
    setLoading(true); // Bật loading khi nhấn "Reset"
    onFilter({}); // Gọi hàm onFilter với giá trị rỗng để reset bộ lọc
  };

  return (
      <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="koi-search-filter"
          style={{ marginBottom: 16 }}
      >
        <Form.Item name="search" label="Tìm kiếm">
          <Input placeholder="Nhập tên cá Koi" allowClear />
        </Form.Item>
        <Form.Item name="varieties" label="Giống cá">
          <Select
              mode="multiple" // Cho phép chọn nhiều giống cá
              placeholder="Chọn giống cá Koi"
              allowClear
              loading={varietiesLoading}
          >
            {varieties.map((variety) => (
                <Option key={variety.VarietyID} value={variety.VarietyID}>
                  {variety.VarietyName}
                </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="origin" label="Nguồn gốc">
          <Select placeholder="Chọn nguồn gốc" allowClear>
            <Option value="Imported">Imported</Option>
            <Option value="F1 Hybrid">F1 Hybrid</Option>
            <Option value="Pure Vietnamese">Pure Vietnamese</Option>
          </Select>
        </Form.Item>
        <Form.Item name="priceRange" label="Khoảng giá">
          <Slider
              range
              max={10000000}
              step={100000}
              defaultValue={[0, 10000000]}
              tipFormatter={(value) => `${value.toLocaleString()} VND`}
          />
        </Form.Item>
        <Form.Item name="sizeRange" label="Kích thước (cm)">
          <Slider
              range
              min={20}
              max={80}
              step={1}
              defaultValue={[20, 80]}
              tipFormatter={(value) => `${value} cm`}
          />
        </Form.Item>
        <Form.Item name="weightRange" label="Cân nặng (kg)">
          <Slider
              range
              min={1}
              max={5}
              step={0.1}
              defaultValue={[1, 5]}
              tipFormatter={(value) => `${value.toFixed(1)} kg`}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
          <Button
              style={{ marginLeft: 8 }}
              htmlType="button"
              onClick={handleReset}
              icon={<ReloadOutlined />}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
  );
};

export default KoiSearch;
