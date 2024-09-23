import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/homepage">
            <img
              src="koi-farm-shop.png"
              alt="Koi Farm Shop Logo"
              className="navbar-logo"
            />
          </a>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/homepage" className="nav-link">
              Trang chủ
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              Giới thiệu
            </a>
          </li>
          <li className="nav-item dropdown">
            <a href="/ProductList" className="nav-link">
              Cá Koi Nhật
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="/japanese-koi/showa">Showa</a>
              </li>
              <li>
                <a href="/japanese-koi/kohaku">Kohaku</a>
              </li>
              <li>
                <a href="/japanese-koi/sanke">Sanke</a>
              </li>
              <li>
                <a href="/japanese-koi/tancho">Tancho</a>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a href="/products" className="nav-link">
              Sản phẩm
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="/products/food">Thức ăn cho cá</a>
              </li>
              <li>
                <a href="/products/tanks">Hồ thi công</a>
              </li>
              <li>
                <a href="/products/decorations">Đồ trang trí</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="/consignment" className="nav-link">
              Ký gửi
            </a>
          </li>
          <li className="nav-item">
            <a href="/blog" className="nav-link">
              Tin tức
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">
              Liên hệ
            </a>
          </li>
        </ul>
        <div className="navbar-icons">
          <a href="/cart" className="cart-icon">
            <span className="cart-count">9</span> My Cart
          </a>
          <a href="/account" className="account-icon">
            My Account
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
