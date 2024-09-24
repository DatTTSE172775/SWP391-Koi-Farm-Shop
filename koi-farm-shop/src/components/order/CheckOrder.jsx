import React from "react";
import "./CheckOrder.scss";

const CheckOrder = () => {
  // Sample order data. In a real-world app, you'd retrieve this data from an API or state
  const orderData = {
    orderId: "12345",
    items: [
      { name: "Koi Fish 1", price: 100, quantity: 1 },
      { name: "Koi Fish 2", price: 150, quantity: 2 },
    ],
    total: 400,
    status: "Processing",
  };

  return (
    <div className="check-order-container">
      <h2>Order #{orderData.orderId}</h2>
      <h3>Items:</h3>
      <ul>
        {orderData.items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${orderData.total}</h3>
      <h3>Status: {orderData.status}</h3>
    </div>
  );
};

export default CheckOrder;
