// src/contexts/CartContext.js
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(null); // Initialize cart with no item

  const addToCart = (quantity) => {
    setCartItem({ quantity });
  };

  const clearCart = () => {
    setCartItem(null);
  };

  const updateQuantity = (newQuantity) => {
    if (cartItem) {
      setCartItem({ ...cartItem, quantity: newQuantity });
    }
  };

  return (
    <CartContext.Provider value={{ cartItem, addToCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
