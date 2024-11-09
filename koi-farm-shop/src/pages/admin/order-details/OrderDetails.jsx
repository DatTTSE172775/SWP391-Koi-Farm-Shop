// src/pages/admin/OrderDetails.jsx

import {
  Alert,
  Button,
  Card,
  Descriptions,
  Divider,
  Layout,
  Row,
  Select,
  Spin,
  Tag,
  Typography,
  List,
} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import {assignOrder} from "../../../store/actions/orderActions";
import {fetchStaff} from "../../../store/actions/staffActions";
import "./OrderDetails.scss";

const {Content} = Layout;
const {Title} = Typography;
const {Option} = Select;

const statusColors = {
  Pending: "orange",
  Processing: "blue",
  Shipped: "purple",
  Delivered: "green",
  Cancelled: "red",
};

const OrderDetails = () => {
  const {orderId} = useParams(); // Get the order ID from route params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [order, setOrder] = useState(null); // Order details state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [assignee, setAssignee] = useState(""); // Selected assignee
  const {staff} = useSelector((state) => state.staff); // Get staff from Redux
  const [orderDetails, setOrderDetails] = useState([]);

  // Fetch order details from the API
  useEffect(() => {
      const fetchOrderDetails = async () => {
          try {
              const response = await axiosInstance.get(`/orders/${orderId}`);
              console.log("Order Details Response:", response.data);
              setOrder(response.data);

              // Fetch order details
              const detailsResponse = await axiosInstance.get(`/orders/${orderId}/details`);
              console.log("Order Details:", detailsResponse.data);
              setOrderDetails(detailsResponse.data);

              // Set assignee based on the UserID
              const assignedStaff = staff.find(
                  (member) => member.UserID === response.data.UserID
              );
              setAssignee(assignedStaff ? assignedStaff.Username : "Chưa giao");

              setLoading(false);
          } catch (err) {
              console.error("Failed to fetch order:", err);
              setError("Đơn hàng không tồn tại.");
              setLoading(false);
          }
      };

      fetchOrderDetails();
  }, [orderId, staff]);

  // Fetch staff list when component mounts
  useEffect(() => {
      dispatch(fetchStaff());
  }, [dispatch]);

  // Handle assigning order to a staff member
  const handleAssign = async (userId) => {
      const assignedStaff = staff.find((member) => member.UserID === userId);
      const username = assignedStaff ? assignedStaff.Username : "Chưa giao";

      dispatch(assignOrder(orderId, userId, username));

      // Update local state to reflect changes immediately
      setAssignee(username);
      setOrder((prevOrder) => ({
          ...prevOrder,
          UserID: userId,
      }));
  };

  if (loading) {
      return <Spin size="large" className="loading-spinner"/>;
  }

  if (error) {
      return <Alert message="Error" description={error} type="error" showIcon/>;
  }

  return (
      <Layout>
          <Content className="admin-content">
              <Card className="order-details-card">
                  <Title level={3} className="title">
                      Chi Tiết Đơn Hàng: {order.OrderID}
                  </Title>
                  <Divider/>
                  <Descriptions
                      title="Thông Tin Đơn Hàng"
                      bordered
                      layout="vertical"
                      column={2}
                      size="middle"
                  >
                      <Descriptions.Item label="Mã Số Đơn Hàng">
                          {order.TrackingNumber || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Ngày Đặt Hàng">
                          {new Date(order.OrderDate).toLocaleDateString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Giá">
                          {order.TotalAmount.toLocaleString()} VND
                      </Descriptions.Item>

                      <Descriptions.Item label="Sản Phẩm Đã Mua">
                          <List
                              size="small"
                              dataSource={orderDetails}
                              renderItem={item => (
                                  <List.Item>
                                      {item.ProductName} - Số lượng: {item.Quantity}
                                  </List.Item>
                              )}
                          />
                      </Descriptions.Item>

                      <Descriptions.Item label="Trạng Thái">
                          <Tag color={statusColors[order.OrderStatus]}>
                              {order.OrderStatus}
                          </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Địa Chỉ Giao Hàng" span={2}>
                          {order.ShippingAddress}
                      </Descriptions.Item>
                      <Descriptions.Item label="Phương Thức Thanh Toán">
                          {order.PaymentMethod}
                      </Descriptions.Item>


                      <Descriptions.Item label="Nhân Viên Phụ Trách">
                          {order.OrderStatus === "Pending" ? (
                              <Select
                                  value={assignee}
                                  onChange={(userId) => handleAssign(userId)}
                                  style={{width: "100%"}}
                              >
                                  {staff.map((member) => (
                                      <Option key={member.UserID} value={member.UserID}>
                                          {member.Username}
                                      </Option>
                                  ))}
                              </Select>
                          ) : (
                              <Typography.Text>{assignee}</Typography.Text>
                          )}
                      </Descriptions.Item>


                  </Descriptions>
                  <Divider/>
                  <Row justify="end">
                      <Button
                          type="primary"
                          onClick={() => navigate("/admin/manage-orders")}
                          className="back-button"
                      >
                          Quay Lại Danh Sách Đơn Hàng
                      </Button>
                  </Row>
              </Card>
          </Content>
      </Layout>
  );
};

export default OrderDetails;