import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../store/actions/authActions";
import { Google as GoogleIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { notification } from "antd";
import "./Register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { loading } = auth;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    phone: "",
  });

  const { username, email, password, fullname, phone } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(register(username, email, password, fullname, phone));
      if (response.message === "Đăng ký thành công") {
        notification.success({
          message: "Đăng ký thành công",
          description: "Bạn đã đăng ký thành công. Vui lòng đăng nhập.",
        });
        navigate("/login");
      }
    } catch (err) {
      notification.error({
        message: "Đăng ký thất bại",
        description: err.message || "Đã xảy ra lỗi. Vui lòng thử lại.",
      });
    }
  };

  return (
      <Box className="register-container">
        <Box className="register-form-container">
          <Typography variant="h4" gutterBottom align="center">
            Đăng Ký
          </Typography>
          <form onSubmit={handleSubmit} className="register-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    label="Tên tài khoản"
                    variant="outlined"
                    fullWidth
                    required
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Nhập tên tài khoản"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Mật khẩu"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Họ và tên"
                    variant="outlined"
                    fullWidth
                    required
                    name="fullname"
                    value={fullname}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Số điện thoại"
                    variant="outlined"
                    fullWidth
                    required
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? "Đang đăng ký..." : "Đăng Ký"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider>HOẶC</Divider>
              </Grid>
              <Grid item xs={12}>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<GoogleIcon />}
                    onClick={() => console.log("Đăng ký với Google")}
                >
                  Đăng ký với Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Bạn đã có tài khoản?{" "}
                  <MuiLink component={Link} to="/login">
                    Đăng nhập ngay
                  </MuiLink>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
  );
};

export default Register;
