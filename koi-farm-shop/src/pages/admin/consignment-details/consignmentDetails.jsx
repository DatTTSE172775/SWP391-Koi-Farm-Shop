import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Typography, Spin, Alert, Descriptions, Image, Tag, Select } from "antd";
import AdminHeader from "../../../components/admin/header/AdminHeader";
import AdminSidebar from "../../../components/admin/sidebar/AdminSidebar";
import axiosInstance from "../../../api/axiosInstance";
import { fetchStaff } from "../../../store/actions/staffActions";
import "./consignmentDetails.scss";
import { notification } from "antd";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const ConsignmentDetails = () => {
  const [consignment, setConsignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { staff } = useSelector((state) => state.staff);
  const { id } = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchConsignmentDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`koiconsignment/${id}`);
        setConsignment(response.data.data);
        console.log("Consignment details:", response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching consignment details:", err);
        setError("Failed to fetch consignment details");
        setLoading(false);
      }
    };
    fetchConsignmentDetails();
  }, [id]);

  const renderStatus = (status) => {
    let color = 'default';
    switch (status) {
      case 'Approved': color = 'green'; break;
      case 'Pending': color = 'orange'; break;
      case 'In Care': color = 'blue'; break;
      case 'Listed for Sale': color = 'cyan'; break;
      case 'Sold': color = 'purple'; break;
      case 'Withdrawn': color = 'red'; break;
      default: color = 'default';
    }
    return <Tag color={color}>{status}</Tag>;
  };

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const handleAssign = async (userId) => {
    try {
      const assignedStaff = staff.find((member) => member.UserID === userId);
      const username = assignedStaff ? assignedStaff.Username : "Chưa giao";

      console.log("Assigning consignment:", { consignmentId: consignment.ConsignmentID, userId });

      const response = await axiosInstance.patch(`/koiconsignment/${consignment.ConsignmentID}/assign`, {
        userId,
      });

      console.log("Assignment response:", response.data);

      if (response.data.message === "Consignment assigned to staff.") {
        setConsignment((prevConsignment) => ({
          ...prevConsignment,
          UserID: userId,
          AssignedTo: username,
          Status: "In Care" // Assuming the status changes to "In Care" after assignment
        }));

        notification.success({
          message: "Thành Công",
          description: `Ký gửi ${consignment.ConsignmentID} đã được giao cho ${username}`,
        });
      } else {
        throw new Error(response.data.message || "Failed to assign consignment");
      }
    } catch (error) {
      console.error("Error assigning consignment:", error);
      notification.error({
        message: "Lỗi",
        description: error.message || "Không thể giao ký gửi. Vui lòng thử lại.",
      });
    }
  };

  return (
    <Layout className="consignment-details">
      <AdminSidebar />
      <Layout className="site-layout">
        <AdminHeader />
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
                  <Descriptions.Item label="Trạng thái">{renderStatus(consignment.Status)}</Descriptions.Item>
                  <Descriptions.Item label="Giá thỏa thuận">
                    {consignment.PriceAgreed.toLocaleString()} VND
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái duyệt">
                    <Tag color={consignment.ApprovedStatus === 'Approved' ? 'green' : 
                               consignment.ApprovedStatus === 'Rejected' ? 'red' : 'orange'}>
                      {consignment.ApprovedStatus}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại Koi">{consignment.KoiType}</Descriptions.Item>
                  <Descriptions.Item label="Màu sắc">{consignment.KoiColor}</Descriptions.Item>
                  <Descriptions.Item label="Tuổi">{consignment.KoiAge}</Descriptions.Item>
                  <Descriptions.Item label="Kích thước">{consignment.KoiSize}</Descriptions.Item>
                  <Descriptions.Item label="Kết quả kiểm tra" span={2}>
                    {consignment.InspectionResult}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ghi chú" span={2}>
                    {consignment.Notes}
                  </Descriptions.Item>


                  <Descriptions.Item label="Nhân Viên Phụ Trách">
                    {consignment.Status === "Pending" ? (
                      <Select
                        value={consignment.UserID || undefined}
                        onChange={(userId) => handleAssign(userId)}
                        style={{ width: "100%" }}
                      >
                        <Option value={undefined}>Chọn nhân viên</Option>
                        {staff.map((member) => (
                          <Option key={member.UserID} value={member.UserID}>
                            {member.Username}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <Typography.Text>{consignment.AssignedTo || "Chưa giao"}</Typography.Text>
                    )}
                  </Descriptions.Item>


                </Descriptions>
                {consignment.ImagePath && (
                  <div className="image-section">
                    <Title level={4}>Hình ảnh</Title>
                    <Image
                      width={200}
                      src={consignment.ImagePath}
                      alt="Koi fish"
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

export default ConsignmentDetails;
