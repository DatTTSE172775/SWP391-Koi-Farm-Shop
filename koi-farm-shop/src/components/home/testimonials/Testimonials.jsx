import React from "react";
import TestimonialCard from "./TestimonialCard";
import "./Testimonials.scss";

const Testimonials = () => {
  const dummyTestimonials = [
    {
      message: "Koi Farm Shop has the best Koi fish selection!",
      author: "John Doe",
    },
    {
      message: "Excellent service and beautiful Koi fish.",
      author: "Jane Smith",
    },
    { message: "I love the Koi I got from Koi Farm!", author: "Mike Johnson" },
  ];

  return (
    <div className="testimonials-container">
      <h2>Customer Testimonials</h2>
      <div className="testimonials-list">
        {dummyTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
