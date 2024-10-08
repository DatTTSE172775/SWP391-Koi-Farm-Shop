import { Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import StaffHeader from "../../../components/staff/header/StaffHeader";
import NotificationItem from "../../../components/staff/notification/NotificationItem";
import Sidebar from "../../../components/staff/sidebar/StaffSidebar";
import "./StaffNotificationPage.scss";

const { Title } = Typography;

const StaffNotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Dữ liệu mẫu thông báo cho staff
    const sampleNotifications = [
      {
        id: "NOTIF001",
        title: "Nhiệm Vụ Mới: Kiểm Tra Ký Gửi",
        message:
          "Bạn đã được giao nhiệm vụ kiểm tra yêu cầu ký gửi từ khách hàng về Kohaku Koi.",
        date: "2024-10-15",
      },
      {
        id: "NOTIF002",
        title: "Yêu Cầu Mới: Xác Nhận Cá Koi",
        message: "Bạn cần xác nhận yêu cầu ký gửi cá Koi loại Showa Koi.",
        date: "2024-10-16",
      },
    ];
    setNotifications(sampleNotifications);
  }, []);

  const handleAcknowledge = (notificationId) => {
    // Xử lý logic sau khi nhân viên xác nhận thông báo
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );
    setNotifications(updatedNotifications);
    console.log(`Notification ${notificationId} has been acknowledged.`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <StaffHeader />
        <Content className="staff-notification-content">
          <div className="staff-notification-page">
            <Title level={2}>Thông Báo Nhiệm Vụ Của Bạn</Title>
            <div className="notifications-list">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onAcknowledge={handleAcknowledge}
                  />
                ))
              ) : (
                <Title level={4} type="secondary">
                  Không có thông báo mới.
                </Title>
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StaffNotificationPage;
