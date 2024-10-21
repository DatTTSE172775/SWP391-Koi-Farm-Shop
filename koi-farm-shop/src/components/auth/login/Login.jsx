import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { login } from "../../../store/actions/authActions";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, error } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(username, password)); // Dispatch login action with username & password
  };

  return (
    <Box className="auth-container">
      <Box className="login-form">
        <Typography variant="h4" gutterBottom align="center">
          Đăng nhập
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Tên tài khoản"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên tài khoản"
          />

          <TextField
            label="Mật khẩu"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />

          <Box className="login-options">
            <FormControlLabel
              control={<Checkbox color="primary" required />}
              label="Chấp nhận các điều khoản"
            />
            <Link component={RouterLink} to="/forget-password" variant="body2">
              Quên mật khẩu ?
            </Link>
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng nhập
          </Button>

          {error && <Typography className="message">{error}</Typography>}

          <Divider sx={{ my: 2 }}>HOẶC</Divider>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<GoogleIcon />}
          >
            Đăng nhập với Google
          </Button>

          <Typography variant="body2" align="center" className="register-text">
            Bạn chưa có tài khoản?{" "}
            <Link component={RouterLink} to="/register" variant="body2">
              Đăng ký ngay
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
