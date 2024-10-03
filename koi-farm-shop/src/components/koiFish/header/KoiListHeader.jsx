import { Typography } from "antd";
import React from "react";
import "./KoiListHeader.scss";

const { Title, Paragraph } = Typography;

const KoiListHeader = () => {
  return (
    <div className="koi-list-header">
      <Typography>
        <Title level={2}>Danh Sách Cá Koi</Title>
        <Paragraph>
          Khám phá bộ sưu tập cá Koi đa dạng với nhiều màu sắc và kích thước
          khác nhau. Mỗi cá Koi được chăm sóc kỹ lưỡng để đảm bảo sức khỏe và vẻ
          đẹp tuyệt vời nhất cho hồ cá của bạn.
        </Paragraph>
      </Typography>
    </div>
  );
};

export default KoiListHeader;
