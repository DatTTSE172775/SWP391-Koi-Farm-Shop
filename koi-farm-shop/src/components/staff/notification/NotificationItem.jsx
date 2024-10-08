import { CheckOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import React from "react";
import "./NotificationItem.scss";

const { Text } = Typography;

const NotificationItem = ({ notification, onAcknowledge }) => {
  return (
    <Card className="notification-item-card">
      <div className="notification-content">
        <Text strong>{notification.title}</Text>
        <Text>{notification.message}</Text>
        <Text type="secondary">{notification.date}</Text>
      </div>
      <Button
        type="primary"
        icon={<CheckOutlined />}
        onClick={() => onAcknowledge(notification.id)}
      >
        Đã hiểu
      </Button>
    </Card>
  );
};

export default NotificationItem;
