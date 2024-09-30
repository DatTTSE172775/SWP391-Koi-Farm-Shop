// src/components/home/AboutUs.jsx

import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./AboutUs.scss";

import aboutUsImg from "../../../assets/homepage/aboutUs.webp";

const AboutUs = () => {
  return (
    <Box className="about-us-container">
      <Grid container spacing={4} alignItems="center">
        {/* Hình ảnh giới thiệu */}
        <Grid item xs={12} md={6}>
          <Box className="about-us-image">
            <img src={aboutUsImg} alt="About Koi Farm Shop" />
          </Box>
        </Grid>

        {/* Nội dung giới thiệu */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            className="about-us-title"
          >
            Về Chúng Tôi
          </Typography>
          <Typography variant="body1" className="about-us-text">
            Koi Farm Shop được thành lập với mục tiêu mang đến cho bạn những chú
            cá Koi đẹp nhất cùng các sản phẩm chăm sóc ao cá chất lượng. Với hơn
            10 năm kinh nghiệm trong ngành, chúng tôi cam kết cung cấp sản phẩm
            uy tín, dịch vụ tận tâm và kiến thức chuyên sâu để giúp bạn xây dựng
            và duy trì một ao cá khỏe mạnh và đẹp mắt.
          </Typography>
          <Typography variant="body1" className="about-us-text">
            Sứ mệnh của chúng tôi là tạo ra một cộng đồng yêu thích cá Koi, nơi
            bạn có thể tìm thấy mọi thứ cần thiết để nuôi dưỡng và thưởng thức
            vẻ đẹp của những sinh vật tuyệt vời này. Chúng tôi tin rằng mỗi chú
            cá Koi không chỉ là một thú cưng mà còn là một tác phẩm nghệ thuật,
            phản ánh sự tinh tế và tâm huyết của người nuôi.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/about"
            className="about-us-button"
          >
            Tìm Hiểu Thêm
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
