import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
        extra={
          <Link to="/home">
            <Button type="primary">Quay lại Trang Chủ</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
