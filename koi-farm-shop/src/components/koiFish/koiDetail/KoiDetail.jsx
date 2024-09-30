import { Image, Modal, Typography } from "antd";
import React from "react";
import "./KoiDetail.scss";

const { Title, Paragraph } = Typography;

const KoiDetail = ({ visible, onClose, koi }) => {
  return (
    <Modal
      visible={visible}
      title={koi.name}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="koi-detail-modal">
        <Image src={koi.image} alt={koi.name} className="koi-detail-image" />
        <div className="koi-detail-info">
          <Title level={4}>Thông Tin Chi Tiết</Title>
          <Paragraph>
            <strong>Màu sắc:</strong> {koi.color}
          </Paragraph>
          <Paragraph>
            <strong>Kích thước:</strong> {koi.size}
          </Paragraph>
          <Paragraph>
            <strong>Giá:</strong> {koi.price}
          </Paragraph>
          <Paragraph>
            <strong>Mô tả:</strong> {koi.description || "Không có mô tả."}
          </Paragraph>
          {/* Thêm các thông tin khác nếu cần */}
        </div>
      </div>
    </Modal>
  );
};

export default KoiDetail;
