// src/components/home/Navigation.jsx

import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Flex, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import "./Navigation.scss";

const { SubMenu } = Menu;

const Navigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [current, setCurrent] = useState("home");

  // Xác định tab được chọn dựa trên đường dẫn hiện tại
  useEffect(() => {
    const path = location.pathname;
    if (path === "/home") {
      setCurrent("home");
    } else if (path === "/about") {
      setCurrent("about");
    } else if (path.startsWith("/koi")) {
      setCurrent("koi");
    } else if (path.startsWith("/product")) {
      setCurrent("product");
    } else if (path === "/consignment") {
      setCurrent("consignment");
    } else if (path === "/blog") {
      setCurrent("blog");
    } else if (path === "/contact") {
      setCurrent("contact");
    } else {
      setCurrent("");
    }
  }, [location.pathname]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  // Get auth state from redux store
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div className="navigation">
      {/* Logo */}
      <div className="logo">
        <Link to="/home">
          <img
            src="koi-farm-shop.png"
            alt="Koi Farm Shop"
            className="logo-image"
          />
        </Link>
      </div>

      {/* Menu */}
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="nav-menu"
      >
        <Menu.Item key="home">
          <Link to="/home">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">Giới thiệu</Link>
        </Menu.Item>

        {/* Tìm kiếm cá Koi SubMenu */}
        <SubMenu key="koi" title="Tìm kiếm cá Koi">
          <Menu.Item key="koi-list">
            <Link to="/koi-list">Tất cả cá Koi đang bán</Link>
          </Menu.Item>
          <Menu.Item key="koi-high-quality">
            <Link to="/koi-high-quality">Cá Koi chất lượng cao</Link>
          </Menu.Item>
          <SubMenu key="koi-varieties" title="Các giống cá Koi">
            <Menu.Item key="koi-varieties-1">
              <Link to="/koi-varieties/1">Kohaku Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-2">
              <Link to="/koi-varieties/2">Showa Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-3">
              <Link to="/koi-varieties/3">Taisho Sanke Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-4">
              <Link to="/koi-varieties/4">Shiro Utsuri Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-5">
              <Link to="/koi-varieties/5">Hi Utsuri Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-6">
              <Link to="/koi-varieties/6">Goshiki Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-7">
              <Link to="/koi-varieties/7">Kujyaku Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-8">
              <Link to="/koi-varieties/8">Shusui Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-9">
              <Link to="/koi-varieties/9">Asagi Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-10">
              <Link to="/koi-varieties/10">Ginrin Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-11">
              <Link to="/koi-varieties/11">Tancho Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-12">
              <Link to="/koi-varieties/12">Doitsu Koi</Link>
            </Menu.Item>
            <Menu.Item key="koi-varieties-13">
              <Link to="/koi-varieties/13">Buffterfly Koi</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="koi-breeders">
            <Link to="/koi-breeders">Người nuôi cá Koi</Link>
          </Menu.Item>
          <Menu.Item key="koi-package">
            <Link to="/koi-package">Lô cá Koi</Link>
          </Menu.Item>
          <Menu.Item key="koi-collection">
            <Link to="/koi-collection">Bộ sưu tập cá Koi</Link>
          </Menu.Item>
          <Menu.Item key="koi-request">
            <Link to="/koi-request">Đề xuất cá Koi</Link>
          </Menu.Item>
        </SubMenu>

        {/* Sản phẩm SubMenu */}
        <SubMenu key="product" title="Sản phẩm">
          <Menu.Item key="product-details-1">
            <Link to="/product-details/1">Cám cá Koi</Link>
          </Menu.Item>
          <Menu.Item key="product-details-2">
            <Link to="/product-details/2">Hệ thống lọc hồ cá Koi</Link>
          </Menu.Item>
          <Menu.Item key="product-details-3">
            <Link to="/product-details/3">Phụ kiện hồ cá Koi</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="consign">
          <Link to="/consign">Ký gửi</Link>
        </Menu.Item>
        <Menu.Item key="blog">
          <Link to="/blog">Tin tức</Link>
        </Menu.Item>
        <Menu.Item key="contact">
          <Link to="/contact">Liên hệ</Link>
        </Menu.Item>
      </Menu>

      {/* Icons bên phải */}
      <div className="nav-icons">
        {isAuthenticated ? (
          <>
            <Avatar
              className="user-avatar"
              src="/images/users/avatar.jpg"
              icon={<UserOutlined />}
            />
            <span className="username">{user}</span>
            <Link to="/cart">
              <Badge count={3} showZero>
                <ShoppingCartOutlined className="cart-icon" />
              </Badge>
            </Link>
            <Button
              type="text"
              onClick={handleLogout}
              className="logout-button"
            >
              Đăng xuất
            </Button>
          </>
        ) : (
          <Flex gap="large" wrap>
            <Button type="default" className="register-button">
              <Link to="/register">Đăng ký</Link>
            </Button>
            <Button type="primary" className="login-button">
              <Link to="/login">Đăng nhập</Link>
            </Button>
          </Flex>
        )}
      </div>
    </div>
  );
};

export default Navigation;
