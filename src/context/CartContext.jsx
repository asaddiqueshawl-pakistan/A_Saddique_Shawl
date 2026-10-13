"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("watch-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("watch-cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  // Add product
  const addToCart = (product, quantity = 1, selectedImage) => {

    setCart((currentCart) => {

      let cartImage;
      if(selectedImage){
        cartImage = product.images?.[selectedImage]?.url
      }else{
        cartImage =  product.images?.[0]?.url
      };

      // const existingProduct = currentCart.find(
      //   (item) => item._id === product._id
      // );

      // if (existingProduct) {
      //   return currentCart.map((item) =>
      //     item._id === product._id
      //       ? {
      //           ...item,
      //           quantity: item.quantity + quantity,
      //           image: cartImage,
      //         }
      //       : item
      //   );
      // }

      return [
        ...currentCart,
        {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          brand: product.brand,
          price: product.price,
          discountPrice: product.discountPrice,
          // image: imageIndex || product.images?.[0]?.url || "",
          image: cartImage,
          quantity,
        },
      ];
    });
  };

  // Remove product
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== productId)
    );
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // Clear cart
  // const clearCart = () => {
  //   setCart([]);
  // };

  

  const clearCart = useCallback(() => {
  setCart([]);
}, []);

  // Total items
  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Subtotal
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.discountPrice || item.price;

      return total + price * item.quantity;
    }, 0);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    isLoaded,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}