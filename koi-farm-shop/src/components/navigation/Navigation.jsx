import { BellOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Menu } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { CartContext } from "../order/cart-context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Navigation.scss";


const { SubMenu } = Menu;

const Navigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");
  
  // New state for scroll direction
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  const { cartItems } = useContext(CartContext);

  // Xác định tab được chọn dựa trên đường dẫn hiện tại
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

  // Track scroll direction to show/hide navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const direction = prevScrollPos > currentScrollPos ? "up" : "down";
      setScrollDirection(direction);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const username = localStorage.getItem("username"); //Display username on the navigation bar
  // Get auth state from redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    window.location.reload();
  };

  // Menu cho Dropdown khi click vào avatar
const accountMenu = (
  <Menu>
    <Menu.Item key="view-info">
      <Link to="/account">Xem Thông Tin</Link>
    </Menu.Item>
    <Menu.Item key="order-history">
      <Link to="/order-history">Lịch sử đơn hàng</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout" onClick={handleLogout}>
      Đăng xuất
    </Menu.Item>
  </Menu>
);


  return (
    <div className={`navigation ${scrollDirection === "down" ? "hide" : ""}`}>
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
              <Link to="/koi-varieties/13">Butterfly Koi</Link>
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
          <Menu.Item key="koi-sold">
            <Link to="/koi-sold">Cá koi đã bán</Link>
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
        {/* Chuông thông báo chỉ hiển thị khi đã đăng nhập */}
  {isAuthenticated && (
    <Badge count={5} offset={[10, 0]} showZero>
      <BellOutlined className="notification-bell" />
    </Badge>
  )}
        {isAuthenticated ? (
          <>
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
                <span className="username">{username}</span>
              </div>
            </Dropdown>
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