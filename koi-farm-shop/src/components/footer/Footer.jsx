// src/components/footer/Footer.jsx

import {
  FacebookFilled,
  InstagramFilled,
  TwitterSquareFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section about">
          <h1 className="logo-text">Koi Farm Shop</h1>
          <p>
            Welcome to Koi Farm Shop, your number one source for all things Koi.
            We're dedicated to giving you the very best of Koi fish, with a
            focus on quality, customer service, and uniqueness.
          </p>
        </div>

        {/* Quick Links Section */}
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

        {/* Contact Section */}
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>
            Email:{" "}
            <a href="mailto:info@koifarmshop.com">info@koifarmshop.com</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+123 456 7890</a>
          </p>
          <p>Address: 123 Koi Street, Fish City, FK 12345</p>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section newsletter">
          <h2>Newsletter</h2>
          <p>
            Subscribe to our newsletter to receive the latest updates and
            offers.
          </p>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
          <p className="privacy-text">We respect your privacy. No spam ever.</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookFilled />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterSquareFilled />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramFilled />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeFilled />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Koi Farm Shop | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
