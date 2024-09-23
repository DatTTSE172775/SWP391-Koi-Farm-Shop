import React from "react";
import "./Header.css"; // Make sure to create a corresponding CSS file for styling

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">Koi Farm Shop</a>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/home" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/products" className="nav-link">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
