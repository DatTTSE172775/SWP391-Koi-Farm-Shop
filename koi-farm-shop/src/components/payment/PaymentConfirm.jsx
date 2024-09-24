import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentConfirm.scss";

const PaymentConfirm = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    // Basic validation to ensure payment method and address are filled
    if (paymentMethod && address) {
      navigate("/order-success");
    } else {
      alert("Please provide both address and payment method.");
    }
  };

  return (
    <div className="payment-confirm-container">
      <h2>Payment and Confirm</h2>
      <div className="payment-details">
        <label htmlFor="address">Shipping Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your shipping address"
        />

        <label htmlFor="payment-method">Payment Method:</label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        <button onClick={handlePayment}>Confirm Order</button>
      </div>
    </div>
  );
};

export default PaymentConfirm;
