import { Typography } from "antd";
import React from "react";
import "./KoiPackageHeader.scss";

const { Title, Paragraph } = Typography;

const KoiPackageHeader = () => {
  return (
    <div className="koi-package-header">
      <Typography>
        <Title level={2}>Danh Sách Gói Cá Koi</Title>
        <Paragraph>
          Khám phá bộ sưu tập gói cá Koi đa dạng với nhiều màu sắc và kích thước
          khác nhau. Mỗi gói cá Koi được chăm sóc kỹ lưỡng để đảm bảo sức khỏe và vẻ
          đẹp tuyệt vời nhất cho hồ cá của bạn.
        </Paragraph>
      </Typography>
    </div>
  );
};

export default KoiPackageHeader;
