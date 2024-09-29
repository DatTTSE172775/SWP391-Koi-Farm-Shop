// src/components/home/Promotions.jsx

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import "./Promotions.scss";

const promotions = [
  {
    id: 1,
    title: "Giảm Giá 20% Cho Sản Phẩm Mới",
    image: "/images/promotions/promo1.jpg",
    description:
      "Nhận ngay ưu đãi giảm giá 20% cho các sản phẩm mới nhất của chúng tôi.",
    buttonText: "Mua Ngay",
    buttonLink: "/products/new",
  },
  {
    id: 2,
    title: "Bundle Ao Cá + Thiết Bị Lọc Nước",
    image: "/images/promotions/promo2.jpg",
    description:
      "Mua bundle Ao Cá 200L cùng thiết bị lọc nước AquaPro với giá ưu đãi.",
    buttonText: "Xem Chi Tiết",
    buttonLink: "/promotions/bundle",
  },
  {
    id: 3,
    title: "Mã Giảm Giá 10% Cho Đơn Hàng Đầu Tiên",
    image: "/images/promotions/promo3.jpg",
    description:
      "Sử dụng mã FIRST10 để nhận ngay giảm giá 10% cho đơn hàng đầu tiên của bạn.",
    buttonText: "Sử Dụng Mã",
    buttonLink: "/checkout",
  },
  {
    id: 4,
    title: "Miễn Phí Vận Chuyển",
    image: "/images/promotions/promo4.jpg",
    description: "Miễn phí vận chuyển cho tất cả đơn hàng trên 500,000 VND.",
    buttonText: "Mua Ngay",
    buttonLink: "/products",
  },
];

const Promotions = () => {
  return (
    <Box className="promotions-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="promotions-title"
      >
        Ưu Đãi và Khuyến Mãi
      </Typography>
      <Grid container spacing={4} className="promotions-grid">
        {promotions.map((promo) => (
          <Grid item xs={12} sm={6} md={3} key={promo.id}>
            <Card className="promotion-card">
              <CardMedia
                component="img"
                height="160"
                image={promo.image}
                alt={promo.title}
                className="promotion-image"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className="promotion-title"
                >
                  {promo.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="promotion-description"
                >
                  {promo.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  href={promo.buttonLink}
                  className="promotion-button"
                >
                  {promo.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Promotions;
