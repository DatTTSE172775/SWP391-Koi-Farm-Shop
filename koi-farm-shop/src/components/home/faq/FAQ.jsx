// src/components/home/FAQ.jsx

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import "./FAQ.scss";

const faqs = [
  {
    id: 1,
    question: "Cách thức đặt hàng sản phẩm như thế nào?",
    answer:
      "Bạn có thể đặt hàng trực tiếp qua website của chúng tôi bằng cách thêm sản phẩm vào giỏ hàng và tiến hành thanh toán theo hướng dẫn.",
  },
  {
    id: 2,
    question: "Chính sách vận chuyển của cửa hàng như thế nào?",
    answer:
      "Chúng tôi cung cấp dịch vụ vận chuyển nhanh chóng đến mọi địa điểm trong nước với chi phí hợp lý. Đơn hàng trên 500,000 VND được miễn phí vận chuyển.",
  },
  {
    id: 3,
    question: "Có chính sách đổi trả sản phẩm không?",
    answer:
      "Có, nếu sản phẩm gặp lỗi kỹ thuật hoặc không đúng như mô tả, bạn có thể đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.",
  },
  {
    id: 4,
    question: "Làm thế nào để chăm sóc cá Koi đúng cách?",
    answer:
      "Bạn có thể tham khảo các bài viết và video hướng dẫn chăm sóc cá Koi trên trang tin tức của chúng tôi hoặc liên hệ trực tiếp để được tư vấn chi tiết.",
  },
  {
    id: 5,
    question: "Cửa hàng có cung cấp dịch vụ lắp đặt ao cá không?",
    answer:
      "Có, chúng tôi cung cấp dịch vụ lắp đặt ao cá chuyên nghiệp. Vui lòng liên hệ qua số điện thoại hoặc email để được tư vấn và báo giá cụ thể.",
  },
  {
    id: 6,
    question: "Có chương trình khuyến mãi nào đang diễn ra không?",
    answer:
      "Vui lòng xem phần Ưu Đãi và Khuyến Mãi trên trang chủ để cập nhật các chương trình khuyến mãi mới nhất từ chúng tôi.",
  },
];

const FAQ = () => {
  return (
    <Box className="faq-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="faq-title"
      >
        Câu Hỏi Thường Gặp
      </Typography>
      <Box className="faq-accordion">
        {faqs.map((faq) => (
          <Accordion key={faq.id} className="faq-item">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${faq.id}-content`}
              id={`panel${faq.id}-header`}
            >
              <Typography className="faq-question">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="faq-answer">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQ;
