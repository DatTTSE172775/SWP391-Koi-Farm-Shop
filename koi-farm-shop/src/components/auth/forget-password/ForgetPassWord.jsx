import {
  Box,
  Button,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosPublic from "../../../api/axiosPublic";
import "./ForgetPassWord.scss";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading, error, forgetPasswordSuccess } = auth;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const openNotification = (type, message) => {
    notification[type]({
      message,
      duration: 3,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending request with:", { email, username });

      const response = await axiosPublic.post("forgot-password", {
        email,
        userName: username,
      });

      console.log("API Response:", response.data);
      openNotification("success", "Yêu cầu đặt lại mật khẩu đã được gửi.");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      openNotification("error", "Lỗi khi gửi yêu cầu đặt lại mật khẩu.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
    if (forgetPasswordSuccess) navigate("/login");
  }, [isAuthenticated, forgetPasswordSuccess, navigate]);

  return (
    <Box className="forget-password-container">
      <Box className="forget-password-form-container">
        <Typography variant="h4" gutterBottom align="center">
          Quên Mật Khẩu
        </Typography>
        <form onSubmit={handleSubmit} className="forget-password-form">
          <Box display="grid" gap={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập của bạn"
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
            />
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi Yêu Cầu"}
            </Button>
            <Typography variant="body2" align="center">
              Bạn đã nhớ mật khẩu?{" "}
              <MuiLink component={Link} to="/login">
                Đăng nhập ngay
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
