import { notification } from "antd";
import PropTypes from "prop-types";
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find(
        (cartItem) => cartItem.id === item.id && cartItem.type === item.type
    );

    if (existingItem) {
      // Chỉ tăng số lượng nếu item là "lô cá koi" hoặc "koi package"
      if (item.type === "package") {
        existingItem.quantity += 1;
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        // Nếu là loại khác thì thông báo sản phẩm đã tồn tại trong giỏ hàng
        notification.warning({
          message: "Sản phẩm đã tồn tại trong giỏ hàng",
          description: `${item.name} đã có trong giỏ hàng.`,
          placement: "bottomRight",
        });
        return;
      }
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

    if (item && item.type === 'package') {
      item.quantity = quantity > 0 ? quantity : 1; // Đảm bảo số lượng không dưới 1
      item.total = item.price * item.quantity;
      setCartItems(updatedCartItems);
    }
  };


  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        clearCart,
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
