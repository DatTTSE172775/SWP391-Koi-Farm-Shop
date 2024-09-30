import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./NewLetters.scss";

const latestNews = [
  {
    id: 1,
    title: "Cách Chăm Sóc Cá Koi Đúng Cách",
    image: "/images/news/news1.jpg",
    date: "12/09/2024",
    excerpt:
      "Khám phá các bí quyết chăm sóc cá Koi để chúng luôn khỏe mạnh và sắc màu rực rỡ.",
    link: "/news/1",
  },
  {
    id: 2,
    title: "Tin Tức Ngành Cá Koi 2024",
    image: "/images/news/news2.jpg",
    date: "25/08/2024",
    excerpt: "Cập nhật những xu hướng mới nhất trong ngành cá Koi năm 2024.",
    link: "/news/2",
  },
  {
    id: 3,
    title: "Sự Kiện Hội Thảo Chăm Sóc Cá Koi",
    image: "/images/news/news3.jpg",
    date: "05/07/2024",
    excerpt:
      "Tham gia hội thảo về chăm sóc cá Koi cùng các chuyên gia hàng đầu.",
    link: "/news/3",
  },
  {
    id: 4,
    title: "Mẹo Vặt Cho Người Mới Bắt Đầu Nuôi Cá Koi",
    image: "/images/news/news4.jpg",
    date: "18/06/2024",
    excerpt:
      "Những lời khuyên hữu ích dành cho những ai mới bắt đầu nuôi cá Koi.",
    link: "/news/4",
  },
  {
    id: 5,
    title: "Lợi Ích Khi Nuôi Cá Koi",
    image: "/images/news/news5.jpg",
    date: "30/05/2024",
    excerpt: "Tìm hiểu những lợi ích sức khỏe và tinh thần khi nuôi cá Koi.",
    link: "/news/5",
  },
  {
    id: 6,
    title: "Cá Koi - Nghệ Thuật và Sự Tinh Tế",
    image: "/images/news/news6.jpg",
    date: "15/04/2024",
    excerpt:
      "Khám phá vẻ đẹp nghệ thuật và sự tinh tế của cá Koi trong từng con ao.",
    link: "/news/6",
  },
];

const Newletters = () => {
  return (
    <Box className="latest-news-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="latest-news-title"
      >
        Tin Tức Mới Nhất
      </Typography>
      <Grid container spacing={4} className="latest-news-grid">
        {latestNews.map((news) => (
          <Grid item xs={12} sm={6} md={4} key={news.id}>
            <Card className="news-card">
              <CardMedia
                component="img"
                height="180"
                image={news.image}
                alt={news.title}
                className="news-image"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className="news-title"
                >
                  {news.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="news-date"
                >
                  {news.date}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="news-excerpt"
                >
                  {news.excerpt}
                </Typography>
              </CardContent>
              <Box className="news-button-container">
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={news.link}
                  className="news-button"
                >
                  Đọc Thêm
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Newletters;
