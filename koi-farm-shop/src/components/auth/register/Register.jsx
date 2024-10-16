import { Google as GoogleIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../store/actions/authActions";
import "./Register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading, error } = auth;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(register(username, email, password, fullname, phone));
  };

  // Redirect nếu đã đăng nhập
  if (isAuthenticated) {
    navigate("/home");
  }

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
            {error && (
              <Grid item xs={12}>
                <Typography color="error" align="center">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
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
                // Bạn có thể thêm chức năng đăng ký với Google ở đây
                onClick={() => {
                  // Thêm logic đăng ký với Google
                  console.log("Đăng ký với Google");
                }}
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
