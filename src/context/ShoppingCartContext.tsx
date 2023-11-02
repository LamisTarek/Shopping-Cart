import { useContext, createContext } from "react";
import { useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  incrementItemQuantity: (id: number) => void;
  decrementItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

//create context
const ShoppingCartContext = createContext({});

//create consumer
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

//create provider
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function incrementItemQuantity(id: number) {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === id);
      if (item) {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return [...prev, { id, quantity: 1 }];
    });
  }

  function decrementItemQuantity(id: number) {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === id);
      if (item) {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
      return [...prev, { id, quantity: 1 }];
    });
  }

  function removeItem(id: number) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  // function getCartTotal() {
  //   return cartItems.reduce((sum, item) => {
  //     const storeItem = storeItems.find(
  //       (storeItem) => storeItem.id === item.id
  //     );
  //     if (storeItem) {
  //       return sum + storeItem.price * item.quantity;
  //     }
  //     return sum;
  //   }, 0);
  // }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        incrementItemQuantity,
        decrementItemQuantity,
        removeItem,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  );
}
