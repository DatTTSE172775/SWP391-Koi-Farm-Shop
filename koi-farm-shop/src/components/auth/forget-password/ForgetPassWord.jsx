import {
  Box,
  Button,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./ForgetPassWord.scss";

const ForgetPassword = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading, error, forgetPasswordSuccess } = auth;

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gửi yêu cầu đặt lại mật khẩu với email: ", email);
    // dispatch(forgetPassword(email));
  };

  // Redirect nếu đã đăng nhập hoặc sau khi gửi yêu cầu thành công
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
    if (forgetPasswordSuccess) {
      alert("Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn.");
      navigate("/login");
    }
  }, [isAuthenticated, forgetPasswordSuccess, navigate]);

  return (
    <Box className="forget-password-container">
      <Box className="forget-password-form-container">
        <Typography variant="h4" gutterBottom align="center">
          Quên Mật Khẩu
        </Typography>
        <form onSubmit={handleSubmit} className="forget-password-form">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
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
                {loading ? "Đang gửi..." : "Gửi Yêu Cầu"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Bạn đã nhớ mật khẩu?{" "}
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

export default ForgetPassword;
