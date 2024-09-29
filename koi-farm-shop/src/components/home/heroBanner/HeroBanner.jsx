// src/components/home/heroBanner/HeroBanner.jsx

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules"; // Đảm bảo import từ 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react";
import "./HeroBanner.scss";

import bannerImg1 from "../../../assets/homepage/hero-banner1.jpg";
import bannerImg2 from "../../../assets/homepage/hero-banner2.jpg";
import bannerImg3 from "../../../assets/homepage/hero-banner3.jpg";

const heroSlides = [
  {
    label: "Chào Mừng Đến Với Koi Farm Shop",
    imgPath: bannerImg1,
    ctaText: "Khám Phá Ngay",
    ctaLink: "/products",
  },
  {
    label: "Ưu Đãi Đặc Biệt Mùa Xuân",
    imgPath: bannerImg2,
    ctaText: "Xem Chi Tiết",
    ctaLink: "/promotions",
  },
  {
    label: "Sản Phẩm Mới Nhất Cho Ao Cá",
    imgPath: bannerImg3,
    ctaText: "Mua Ngay",
    ctaLink: "/new-products",
  },
];

const HeroBanner = () => {
  return (
    <Box className="hero-banner-container">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="hero-swiper"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              className="hero-slide"
              sx={{
                backgroundImage: `url(${slide.imgPath})`,
              }}
            >
              <Box className="hero-content">
                <Typography
                  variant="h3"
                  component="div"
                  gutterBottom
                  className="hero-title"
                >
                  {slide.label}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href={slide.ctaLink}
                  className="hero-cta-button"
                >
                  {slide.ctaText}
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroBanner;
