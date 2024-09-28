import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";

const Cart = () => {
  // Sample cart data, you would replace this with actual state management like Redux or Context
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Koi Fish 1", price: 100, quantity: 1 },
    { id: 2, name: "Koi Fish 2", price: 150, quantity: 2 },
    { id: 3, name: "Pond Decoration", price: 50, quantity: 1 },
  ]);

  const navigate = useNavigate();

  // Function to handle removing an item from the cart
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <h3>Total: ${calculateTotalPrice()}</h3>
      </div>
      <button
        className="checkout-button"
        onClick={() => navigate("/payment-confirm")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
