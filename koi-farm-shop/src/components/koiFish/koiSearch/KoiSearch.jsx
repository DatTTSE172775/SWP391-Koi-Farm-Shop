import { Button, Form, Input, Select, Slider, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import "./KoiSearch.scss";
import { getAllVarieties } from "../../../store/actions/KoiActions";

const { Option } = Select;

const KoiSearch = ({ onFilter, setLoading }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { varieties, loading: varietiesLoading, error } = useSelector(state => state.koi);

  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sizeRange, setSizeRange] = useState([20, 80]);
  const [weightRange, setWeightRange] = useState([1, 5]);

  useEffect(() => {
    dispatch(getAllVarieties());
  }, [dispatch]);

  if (error) {
    console.error("Error fetching varieties:", error);
  }

  const handleFinish = (values) => {
    setLoading(true);
    onFilter(values);
  };

  const handleReset = () => {
    form.resetFields();
    setPriceRange([0, 10000000]);
    setSizeRange([20, 80]);
    setWeightRange([1, 5]);
    setLoading(true);
    onFilter({});
  };

  return (
      <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="koi-search-filter"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item name="search" label="Tìm kiếm">
              <Input placeholder="Nhập tên cá Koi" allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item name="varieties" label="Giống cá">
              <Select
                  mode="multiple"
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
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item name="origin" label="Nguồn gốc">
              <Select placeholder="Chọn nguồn gốc" allowClear>
                <Option value="Imported">Imported</Option>
                <Option value="F1 Hybrid">F1 Hybrid</Option>
                <Option value="Pure Vietnamese">Pure Vietnamese</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} lg={24}>
            <Form.Item name="priceRange" label={`Khoảng giá: ${priceRange[0].toLocaleString()} VND - ${priceRange[1].toLocaleString()} VND`}>
              <Slider
                  range
                  max={10000000}
                  step={100000}
                  defaultValue={[0, 10000000]} // Đặt giá trị mặc định đầy đủ
                  value={priceRange}
                  onChange={(value) => setPriceRange(value)}
                  tipFormatter={(value) => `${value.toLocaleString()} VND`}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={24}>
            <Form.Item name="sizeRange" label={`Kích thước (cm): ${sizeRange[0]} cm - ${sizeRange[1]} cm`}>
              <Slider
                  range
                  min={20}
                  max={80}
                  step={1}
                  defaultValue={[20, 80]} // Đặt giá trị mặc định đầy đủ
                  value={sizeRange}
                  onChange={(value) => setSizeRange(value)}
                  tipFormatter={(value) => `${value} cm`}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={24}>
            <Form.Item name="weightRange" label={`Cân nặng (kg): ${weightRange[0].toFixed(1)} kg - ${weightRange[1].toFixed(1)} kg`}>
              <Slider
                  range
                  min={1}
                  max={5}
                  step={0.1}
                  defaultValue={[1, 5]} // Đặt giá trị mặc định đầy đủ
                  value={weightRange}
                  onChange={(value) => setWeightRange(value)}
                  tipFormatter={(value) => `${value.toFixed(1)} kg`}
              />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ textAlign: "center" }}>
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
          </Col>
        </Row>
      </Form>
  );
};

export default KoiSearch;