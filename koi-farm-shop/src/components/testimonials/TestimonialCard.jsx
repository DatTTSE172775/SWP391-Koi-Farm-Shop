import React from "react";
import "./TestimonialCard.scss"; // Add SCSS for the styling

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <p className="testimonial-message">"{testimonial.message}"</p>
      <h3 className="testimonial-author">- {testimonial.author}</h3>
    </div>
  );
};

export default TestimonialCard;
