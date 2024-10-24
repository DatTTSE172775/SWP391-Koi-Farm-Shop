import { notification } from "antd";
import PropTypes from "prop-types";
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find((cartItem) => 
      cartItem.id === item.id && cartItem.type === item.type
    );
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      updatedCartItems.push({
        ...item,
        key: `${item.type}-${item.id}`,
        quantity: 1,
        total: item.price,
      });
    }
    setCartItems(updatedCartItems);
    notification.success({
      message: "Thêm giỏ hàng thành công",
      description: `${item.name} đã được thêm vào giỏ hàng.`,
      placement: "bottomRight",
    });
  };

  const handleRemoveFromCart = (key) => {
    const updatedCartItems = cartItems.filter((item) => item.key !== key);
    setCartItems(updatedCartItems);
    notification.success({
      message: "Sản phẩm đã được xóa khỏi giỏ hàng",
      placement: "bottomRight",
    });
  };

  const handleUpdateQuantity = (key, quantity) => {
    const updatedCartItems = [...cartItems];
    const item = updatedCartItems.find((item) => item.key === key);
    if (item) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      setCartItems(updatedCartItems);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
