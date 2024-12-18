/* eslint-disable react/prop-types */
import { useState } from "react";
import { CartContext } from "../context";

export default function CartProvider({ children }) {
  const [cartList, setCartList] = useState([]);
  const handleCart = (data) => {
    const item = cartList.find((i) => i.id === data.id);
    if (!item) {
      setCartList([...cartList, data]);
    } else {
      setCartList(cartList.filter((i) => i.id !== data.id));
    }
  };

  const cartData = { cartList, handleCart };

  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
}
