"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("watch-wishlist");

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "watch-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist, isLoaded]);

  const addToWishlist = useCallback((product) => {
    setWishlist((current) => {
      if (current.some((item) => item._id === product._id)) {
        return current;
      }

      return [
        ...current,
        {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          brand: product.brand,
          price: product.price,
          discountPrice: product.discountPrice,
          image: product.images?.[0]?.url || "",
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((current) =>
      current.filter((item) => item._id !== productId)
    );
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((current) => {
      const exists = current.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return current.filter(
          (item) => item._id !== product._id
        );
      }

      return [
        ...current,
        {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          brand: product.brand,
          price: product.price,
          discountPrice: product.discountPrice,
          image: product.images?.[0]?.url || "",
        },
      ];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.some(
        (item) => item._id === productId
      );
    },
    [wishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const totalWishlistItems = useMemo(
    () => wishlist.length,
    [wishlist]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        totalWishlistItems,
        isLoaded,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}