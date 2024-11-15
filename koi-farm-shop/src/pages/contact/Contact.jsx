import React from "react";
import "./Contact.scss";
import Koiimage from "../../assets/images/Koiimage.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const contactInfo = {
    phone: "+84 123 456 789",
    email: "koifarmshop@gmail.com",
    address: "Đại Học FPT, Thành Phố Hồ Chí Minh, Việt Nam",
    businessHours: "Thứ Hai - Chủ Nhật: 8:00 AM - 6:00 PM"
  };

  return (
    <div className="contact-container">
      <img className="koi-banner" src={Koiimage} alt="Beautiful Koi Pond" />
      <h1>Liên Hệ Với Chúng Tôi</h1>
      <p>Liên hệ với chúng tôi qua bất kỳ kênh nào sau đây:</p>

      <div className="contact-info">
        <div className="info-item">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <div className="info-content">
            <h3>Điện Thoại</h3>
            <p>{contactInfo.phone}</p>
          </div>
        </div>

        <div className="info-item">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <div className="info-content">
            <h3>Email</h3>
            <p>{contactInfo.email}</p>
          </div>
        </div>

        <div className="info-item">
          <FontAwesomeIcon icon={faLocationDot} className="icon" />
          <div className="info-content">
            <h3>Địa Chỉ</h3>
            <p>{contactInfo.address}</p>
          </div>
        </div>

        <div className="info-item">
          <FontAwesomeIcon icon={faClock} className="icon" />
          <div className="info-content">
            <h3>Giờ Làm Việc</h3>
            <p>{contactInfo.businessHours}</p>
          </div>
        </div>
      </div>

      <div className="social-links">
        <button onClick={() => window.open('https://www.facebook.com', '_blank')} className="link-button">Facebook</button>
        <button onClick={() => window.open('https://www.instagram.com', '_blank')} className="link-button">Instagram</button>
        <button onClick={() => window.open('https://www.twitter.com', '_blank')} className="link-button">Twitter</button>
      </div>
    </div>
  );
};

export default Contact;
