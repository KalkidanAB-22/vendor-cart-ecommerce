import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/client";

const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // keep localStorage updated

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Get cart from backend

  async function fetchCart() {
    try {
      const data = await api("/cart");

      if (Array.isArray(data)) {
        setCart(data);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  // Add item

  async function addToCart(product) {
    try {
      await api("/cart", {
        method: "POST",

        body: JSON.stringify({
          product_id: product.id,

          quantity: 1,
        }),
      });

      await fetchCart();
    } catch (error) {
      console.error("Add cart error:", error);

      // local fallback

      setCart((prev) => [
        ...prev,

        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }

  // Remove item

  async function removeFromCart(id) {
    console.log("Removing item:", id);

    try {
      await api(`/cart/${id}`, {
        method: "DELETE",
      });

      // instantly update UI

      setCart((prev) => prev.filter((item) => item.id !== id));

      // sync with backend

      await fetchCart();
    } catch (error) {
      console.error("Remove cart error:", error);
    }
  }

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 1),

    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,

        addToCart,

        removeFromCart,

        cartCount,

        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
