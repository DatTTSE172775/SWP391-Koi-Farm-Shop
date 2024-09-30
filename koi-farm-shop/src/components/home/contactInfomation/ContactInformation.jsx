import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./ContactInformation.scss";

const ContactInformation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form tại đây (ví dụ: gửi tới backend)
    // Hiển thị thông báo thành công
    setOpenSnackbar(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box className="contact-information-container">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        className="contact-information-title"
      >
        Thông Tin Liên Hệ
      </Typography>
      <Grid container spacing={4} className="contact-information-grid">
        {/* Thông tin liên hệ */}
        <Grid item xs={12} md={6}>
          <Box className="contact-details">
            <Typography variant="h6" className="contact-detail-item">
              <strong>Địa Chỉ:</strong> 123 Đường Lý Thường Kiệt, Quận 1, TP. Hồ
              Chí Minh
            </Typography>
            <Typography variant="h6" className="contact-detail-item">
              <strong>Số Điện Thoại:</strong> (+84) 123 456 789
            </Typography>
            <Typography variant="h6" className="contact-detail-item">
              <strong>Email:</strong> contact@koifarmshop.com
            </Typography>
          </Box>
        </Grid>

        {/* Form liên hệ */}
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Tên của bạn"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-form-field"
            />
            <TextField
              label="Email của bạn"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-form-field"
            />
            <TextField
              label="Nội Dung"
              variant="outlined"
              fullWidth
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="contact-form-field"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="contact-form-button"
            >
              Gửi Liên Hệ
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Gửi liên hệ thành công! Chúng tôi sẽ liên hệ lại với bạn sớm nhất.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactInformation;
