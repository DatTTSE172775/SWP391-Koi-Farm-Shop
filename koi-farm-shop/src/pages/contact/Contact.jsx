import React, { useState } from "react";
import "./Contact.scss";
import Koiimage from "../../assets/images/Koiimage.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faComment } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="contact-container">
        <div className="success-message">
          <div className="check-mark">✓</div>
          <h2>Thank you for your message!</h2>
          <p>We'll get back to you as soon as possible.</p>
          <div className="social-links">
  <button onClick={() => window.open('https://www.facebook.com', '_blank')} className="link-button">Facebook</button>
  <button onClick={() => window.open('https://www.instagram.com', '_blank')} className="link-button">Instagram</button>
  <button onClick={() => window.open('https://www.twitter.com', '_blank')} className="link-button">Twitter</button>
</div>

        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <img className="koi-banner" src={Koiimage} alt="Beautiful Koi Pond" />
      <h1>Contact Us</h1>
      <p>We'd love to hear from you. Please fill out the form below!</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="First Name*"
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email*"
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faComment} className="icon" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="What can we help you with?*"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <span className="loading-spinner" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
