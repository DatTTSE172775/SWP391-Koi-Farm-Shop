import { Typography } from "antd";
import React from "react";
import "./KoiBreedersHeader.scss";

const { Title, Paragraph } = Typography;

const KoiBreedersHeader = () => {
  return (
    <div className="koi-breeders-header">
      <Typography>
        <Title level={2} className="koi-breeders-header__title">Những Nhà Lai Tạo Cá Koi Nổi Tiếng</Title>
        <Paragraph className="koi-breeders-header__description">
        Nếu bạn đang tìm kiếm những chú cá Koi đẹp và khỏe mạnh để thêm vào hồ cá của mình, mạng lưới các nhà lai tạo uy tín của chúng tôi cung cấp đa dạng các giống cá Koi cao cấp. Dù bạn đang tìm kiếm những chú cá Koi sặc sỡ, đạt chất lượng trình diễn hay những giống cá bền bỉ cho hồ cá riêng, các nhà lai tạo của chúng tôi đều mang đến những chú cá hàng đầu với màu sắc, kích thước và sức khỏe vượt trội.
        </Paragraph>
      </Typography>
    </div>
  );
};

export default KoiBreedersHeader;
