import { Typography } from "antd";
import React from "react";
import "./KoiPackageHeader.scss";

const { Title, Paragraph } = Typography;

const KoiPackageHeader = () => {
  return (
    <div className="koi-package-header">
      <Typography>
        <Title level={2} className="koi-package-header__title">Danh Sách Gói Cá Koi</Title>
        <Paragraph className="koi-package-header__description">
          Chọn từ các gói Koi được chúng tôi lựa chọn thủ công, mỗi gói được thiết kế để cung cấp dịch vụ chăm sóc và chất lượng tốt nhất cho ao của bạn.
        </Paragraph>
      </Typography>
    </div>
  );
};

export default KoiPackageHeader;
