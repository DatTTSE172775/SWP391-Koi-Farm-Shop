import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">Koi Farm Shop</h1>
          <p>
            Welcome to Koi Farm Shop, your number one source for all things Koi.
            We're dedicated to giving you the very best of Koi fish, with a
            focus on quality, customer service, and uniqueness.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: info@koifarmshop.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Koi Street, Fish City, FK 12345</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Koi Farm Shop | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
