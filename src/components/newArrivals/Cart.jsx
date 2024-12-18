import { useContext } from "react";
import { CartContext } from "../../context";
import ShoppingBag from "../ShoppingBag";

export default function Cart() {
  const { cartList } = useContext(CartContext);

  return (
    <div className="flow-root">
      <a href="#" className="group -m-2 flex items-center p-2">
        <ShoppingBag />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {cartList.length}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </a>
    </div>
  );
}
