import { useState, useContext, createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
const {t} = useTranslation();
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
