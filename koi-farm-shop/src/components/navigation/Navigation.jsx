import { ShoppingCartOutlined, UserOutlined, BellOutlined } from "@ant-design/icons"; // Import Bell icon
import { Avatar, Badge, Button, Dropdown, Menu } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { CartContext } from "../order/cart-context/CartContext";
import "./Navigation.scss";

const { SubMenu } = Menu;

const Navigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("home");

  const { cartItems } = useContext(CartContext);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Thông báo 1", read: false },
    { id: 2, message: "Thông báo 2", read: true },
    { id: 3, message: "Thông báo 3", read: false },
  ]);

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  useEffect(() => {
    const path = location.pathname;
    if (path === "/home") {
      setCurrent("home");
    } else if (path === "/about") {
      setCurrent("about");
    } else if (path.startsWith("/koi-list")) {
      setCurrent("koi-list");
    } else if (path.startsWith("/product")) {
      const subPath = path.split("/product/")[1];
      switch (subPath) {
        case "koi-feed":
          setCurrent("/product/koi-feed");
          break;
        case "pond-filter-system":
          setCurrent("/product/pond-filter-system");
          break;
        case "pond-accessories":
          setCurrent("/product/pond-accessories");
          break;
        default:
          setCurrent("product");
      }
    } else if (path === "/consign") {
      setCurrent("consign");
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
  };

  // Handle marking a notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Notification Dropdown Menu
  const notificationMenu = (
    <Menu>
      {notifications.map((notif) => (
        <Menu.Item key={notif.id} onClick={() => markAsRead(notif.id)}>
          {notif.read ? (
            <span style={{ color: "#888" }}>{notif.message} (Đã đọc)</span>
          ) : (
            <span style={{ fontWeight: "bold" }}>{notif.message} (Chưa đọc)</span>
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  // Menu for account dropdown
  const accountMenu = (
    <Menu>
      <Menu.Item key="view-info">
        <Link to="/account">Xem Thông Tin</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navigation">
      {/* Logo */}
      <div className="logo">
        <Link to="/home">
          <img src="koi-farm-shop.png" alt="Koi Farm Shop" className="logo-image" />
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
            {/* Các giống cá Koi */}
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
          </SubMenu>
          <Menu.Item key="koi-package">
            <Link to="/koi-package">Lô cá Koi</Link>
          </Menu.Item>
        </SubMenu>

        {/* Sản phẩm SubMenu */}
        <SubMenu key="product" title="Sản phẩm">
          <Menu.Item key="product/koi-feed">
            <Link to="/product/koi-feed">Cám cá Koi</Link>
          </Menu.Item>
          <Menu.Item key="product/pond-filter-system">
            <Link to="/product/pond-filter-system">Hệ thống lọc hồ cá Koi</Link>
          </Menu.Item>
          <Menu.Item key="product/pond-accessories">
            <Link to="/product/pond-accessories">Phụ kiện hồ cá Koi</Link>
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
            {/* Notification Dropdown */}
            <Dropdown
              overlay={notificationMenu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="notification-dropdown">
                <Badge count={unreadCount}>
                  <BellOutlined className="notification-icon" />
                </Badge>
              </div>
            </Dropdown>

            {/* Account Dropdown */}
            <Dropdown
              overlay={accountMenu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="account-dropdown">
                <Avatar
                  className="user-avatar"
                  src="/images/users/avatar.jpg"
                  icon={<UserOutlined />}
                />
                <span className="username">{user}</span>
              </div>
            </Dropdown>

            {/* Cart */}
            <Link to="/cart" className="cart-link">
              <Badge count={cartItems.length} showZero>
                <ShoppingCartOutlined className="cart-icon" />
              </Badge>
              <span className="cart-text">Giỏ hàng</span>
            </Link>
          </>
        ) : (
          <div className="auth-buttons">
            <Button type="default" className="register-button">
              <Link to="/register">Đăng ký</Link>
            </Button>
            <Button type="primary" className="login-button">
              <Link to="/login">Đăng nhập</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
