import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.scss";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <h2>Order Successful!</h2>
      <p>
        Your order has been placed successfully. Thank you for shopping with us!
      </p>
      <div className="order-success-buttons">
        <button onClick={() => navigate("/homepage")}>
          Return to Homepage
        </button>
        <button onClick={() => navigate("/check-order")}>
          Check Your Order
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
