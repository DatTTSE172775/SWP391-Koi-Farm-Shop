import { ExpandMore, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  const location = useLocation();

  // Xác định tab được chọn dựa trên đường dẫn hiện tại
  const getSelectedTab = () => {
    switch (location.pathname) {
      case "/home":
        return 0;
      case "/about":
        return 1;
      case "/consignment":
        return 4;
      case "/blog":
        return 5;
      case "/contact":
        return 6;
      default:
        return false;
    }
  };

  const [value, setValue] = useState(getSelectedTab());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // State cho dropdown menu
  const [anchorElKoi, setAnchorElKoi] = useState(null);
  const [anchorElProduct, setAnchorElProduct] = useState(null);

  const handleClickKoi = (event) => {
    setAnchorElKoi(event.currentTarget);
  };

  const handleCloseKoi = () => {
    setAnchorElKoi(null);
  };

  const handleClickProduct = (event) => {
    setAnchorElProduct(event.currentTarget);
  };

  const handleCloseProduct = () => {
    setAnchorElProduct(null);
  };

  return (
    <AppBar position="static" color="default" className="navigation">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component={Link} to="/home" className="logo">
          <img
            src="koi-farm-shop.png"
            alt="Koi Farm Shop"
            className="logo-image"
          />
          Koi Farm Shop
        </Typography>

        {/* Tabs */}
        <Tabs
          value={value}
          onChange={handleChange}
          className="nav-tabs"
          indicatorColor="primary"
          textColor="inherit"
        >
          <Tab label="Trang chủ" component={Link} to="/home" />
          <Tab label="Giới thiệu" component={Link} to="/about" />

          {/* Cá Koi Nhật Tab với submenu */}
          <Tab
            label={
              <Box display="flex" alignItems="center">
                Cá Koi Nhật
                <ExpandMore fontSize="small" />
              </Box>
            }
            onClick={handleClickKoi}
            aria-controls="koi-menu"
            aria-haspopup="true"
          />

          {/* Sản phẩm Tab với submenu */}
          <Tab
            label={
              <Box display="flex" alignItems="center">
                Sản phẩm
                <ExpandMore fontSize="small" />
              </Box>
            }
            onClick={handleClickProduct}
            aria-controls="product-menu"
            aria-haspopup="true"
          />

          <Tab label="Ký gửi" component={Link} to="/consignment" />
          <Tab label="Tin tức" component={Link} to="/blog" />
          <Tab label="Liên hệ" component={Link} to="/contact" />
        </Tabs>

        {/* Khoảng trống để đẩy icon sang bên phải */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Icons bên phải */}
        <Button
          component={Link}
          to="/cart"
          color="inherit"
          className="cart-button"
        >
          <Badge badgeContent={3} color="secondary">
            <ShoppingCart />
          </Badge>
          <span className="cart-text">Giỏ hàng</span>
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          className="login-button"
        >
          Đăng nhập
        </Button>

        {/* Menu cho Cá Koi Nhật */}
        <Menu
          id="koi-menu"
          anchorEl={anchorElKoi}
          open={Boolean(anchorElKoi)}
          onClose={handleCloseKoi}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            component={Link}
            to="/koi-details/1"
            onClick={() => {
              handleCloseKoi();
              setValue(false);
            }}
          >
            Cá Koi Nhật 1
          </MenuItem>
          <MenuItem
            component={Link}
            to="/koi-details/2"
            onClick={() => {
              handleCloseKoi();
              setValue(false);
            }}
          >
            Cá Koi Nhật 2
          </MenuItem>
          <MenuItem
            component={Link}
            to="/koi-details/3"
            onClick={() => {
              handleCloseKoi();
              setValue(false);
            }}
          >
            Cá Koi Nhật 3
          </MenuItem>
          <MenuItem
            component={Link}
            to="/koi-details/4"
            onClick={() => {
              handleCloseKoi();
              setValue(false);
            }}
          >
            Cá Koi Nhật 4
          </MenuItem>
        </Menu>

        {/* Menu cho Sản phẩm */}
        <Menu
          id="product-menu"
          anchorEl={anchorElProduct}
          open={Boolean(anchorElProduct)}
          onClose={handleCloseProduct}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            component={Link}
            to="/product-details/1"
            onClick={() => {
              handleCloseProduct();
              setValue(false);
            }}
          >
            Sản phẩm 1
          </MenuItem>
          <MenuItem
            component={Link}
            to="/product-details/2"
            onClick={() => {
              handleCloseProduct();
              setValue(false);
            }}
          >
            Sản phẩm 2
          </MenuItem>
          <MenuItem
            component={Link}
            to="/product-details/3"
            onClick={() => {
              handleCloseProduct();
              setValue(false);
            }}
          >
            Sản phẩm 3
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
