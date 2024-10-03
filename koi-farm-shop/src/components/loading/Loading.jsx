import { Spin } from "antd";
import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <Spin size="large" tip="Đang tải..." />
    </div>
  );
};

export default Loading;
