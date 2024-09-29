// src/components/home/Testimonials.jsx

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./Testimonials.scss";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "/images/testimonials/avatar1.jpg",
    rating: 5,
    comment:
      "Koi Farm Shop cung cấp những sản phẩm chất lượng cao. Cá Koi của tôi khỏe mạnh và đẹp mắt hơn bao giờ hết!",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/images/testimonials/avatar2.jpg",
    rating: 4.5,
    comment:
      "Ao cá và thiết bị lọc nước mua từ Koi Farm Shop rất dễ dàng lắp đặt. Dịch vụ khách hàng thân thiện và chuyên nghiệp.",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "/images/testimonials/avatar3.jpg",
    rating: 4,
    comment:
      "Thức ăn cá Koi tại đây rất tốt, cá tôi ăn ngon và có màu sắc sống động. Cảm ơn Koi Farm Shop!",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    avatar: "/images/testimonials/avatar4.jpg",
    rating: 5,
    comment:
      "Giá cả hợp lý và sản phẩm đa dạng. Tôi rất hài lòng với những gì tôi đã mua từ Koi Farm Shop.",
  },
  {
    id: 5,
    name: "Vũ Văn E",
    avatar: "/images/testimonials/avatar5.jpg",
    rating: 4.5,
    comment:
      "Hỗ trợ tư vấn chăm sóc cá rất tốt. Tôi đã học được nhiều điều từ đội ngũ Koi Farm Shop.",
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    avatar: "/images/testimonials/avatar6.jpg",
    rating: 5,
    comment:
      "Koi Farm Shop luôn cập nhật những sản phẩm mới và hữu ích. Tôi sẽ tiếp tục ủng hộ cửa hàng!",
  },
];

const Testimonials = () => {
  return (
    <Box className="testimonials-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="testimonials-title"
      >
        Đánh Giá & Phản Hồi Khách Hàng
      </Typography>
      <Grid container spacing={4} className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
            <Card className="testimonial-card">
              <CardContent>
                <Box className="testimonial-header">
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    className="testimonial-name"
                  >
                    {testimonial.name}
                  </Typography>
                </Box>
                <Rating
                  name="read-only"
                  value={testimonial.rating}
                  precision={0.5}
                  readOnly
                  className="testimonial-rating"
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="testimonial-comment"
                >
                  "{testimonial.comment}"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
