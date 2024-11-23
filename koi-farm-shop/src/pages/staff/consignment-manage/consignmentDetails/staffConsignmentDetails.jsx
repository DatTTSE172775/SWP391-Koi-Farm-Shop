import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Typography, Spin, Alert, Descriptions, Image, Tag } from "antd";
import axiosInstance from "../../../../api/axiosInstance";
import "./staffConsignmentDetails.scss";

const { Content } = Layout;
const { Title } = Typography;

const StaffConsignmentDetails = () => {
  const [consignment, setConsignment] = useState(null);
  const [varieties, setVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [consignmentResponse, varietiesResponse] = await Promise.all([
          axiosInstance.get(`koiconsignment/${id}`),
          axiosInstance.get('/varieties')
        ]);
        
        setConsignment(consignmentResponse.data.data);
        setVarieties(varietiesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getVarietyName = (varietyId) => {
    const variety = varieties.find(v => v.VarietyID === parseInt(varietyId));
    return variety ? variety.VarietyName : 'Unknown Variety';
  };

  return (
    <Layout className="consignment-details">
      <Layout className="site-layout">
        <Content>
          <div className="site-layout-background">
            <Title level={2}>Chi tiết ký gửi</Title>
            {loading ? (
              <Spin size="large" />
            ) : error ? (
              <Alert message={error} type="error" />
            ) : consignment ? (
              <>
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="ID">{consignment.ConsignmentID}</Descriptions.Item>
                  <Descriptions.Item label="Loại Ký gửi">{consignment.ConsignmentType}</Descriptions.Item>
                  <Descriptions.Item label="Hình thức">
                    <Tag color={consignment.ConsignmentMode === 'Online' ? 'blue' : 'green'}>
                      {consignment.ConsignmentMode}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày ký gửi">
                    {new Date(consignment.StartDate).toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giá thỏa thuận">
                    {consignment.PriceAgreed.toLocaleString()} VND
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái duyệt">
                    <Tag color={consignment.ApprovedStatus === 'Approved' ? 'green' : 
                               consignment.ApprovedStatus === 'Rejected' ? 'red' : 'orange'}>
                      {consignment.ApprovedStatus}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại Koi">{getVarietyName(consignment.KoiType)}</Descriptions.Item>
                  <Descriptions.Item label="Màu sắc">{consignment.KoiColor}</Descriptions.Item>
                  <Descriptions.Item label="Tuổi">{consignment.KoiAge}</Descriptions.Item>
                  <Descriptions.Item label="Kích thước">{consignment.KoiSize}</Descriptions.Item>
                  <Descriptions.Item label="Kết quả kiểm tra" span={2}>
                    {consignment.InspectionResult}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ghi chú" span={2}>
                    {consignment.Notes}
                  </Descriptions.Item>
                </Descriptions>
                
                {consignment.ImagePath && (
                  <div className="image-section">
                    <Title level={4}>Hình ảnh</Title>
                    <Image
                      width={200}
                      src={`${process.env.REACT_APP_BASE_URL}${consignment.ImagePath}`}
                      alt="Koi fish"
                      placeholder={
                        <div style={{ background: '#f0f0f0', width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          Loading...
                        </div>
                      }
                    />
                  </div>
                )}
              </>
            ) : (
              <Alert message="No consignment found" type="info" />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffConsignmentDetails;
