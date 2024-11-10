import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.scss";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/home");
    window.location.reload();
  };

  const handleCheckOrderStatus = () => {
    navigate("/order-status");
  };

  return (
    <div className="order-success-container">
      <Result
        className="order-result"
        status="success"
        title="Thanh toán thành công"
        subTitle="Đơn hàng của bạn sẽ sớm được giao đến"
        extra={[
          // <Button
          //   key="status"
          //   onClick={handleCheckOrderStatus}
          //   className="ant-btn"
          // >
          //   Kiểm tra đơn hàng
          // </Button>,
          <Button
            type="primary"
            key="home"
            onClick={handleReturnHome}
            className="ant-btn ant-btn-primary"
          >
            Trở về trang chủ
          </Button>,
        ]}
      />
    </div>
  );
};

export default OrderSuccess;
