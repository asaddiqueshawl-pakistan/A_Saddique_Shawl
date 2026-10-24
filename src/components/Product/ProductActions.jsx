"use client";

import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useDebugValue, useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductActions({ product, selectedImage }) {
  const { addToCart, cart } = useCart();

  console.log("from pA", product)

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [productExist, setProductExist] = useState(false);



  const liked = isInWishlist(product._id);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((value) => value + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((value) => value - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedImage);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const isOutOfStock = product.stock <= 0;

  useEffect(() => {
    if (cart.length >= 0) {
      for (let i = 0; i < cart.length; i++) {
        console.log("loop", cart[i]);
        if (cart[i]._id === product._id) {
          setProductExist(true);
        }
      };
    }
  })

  return (
    <>
      {/* Quantity + Cart */}
      <div className="mt-7 flex gap-3">

        {/* Quantity */}
        <div className="flex h-14 border border-[var(--border)]">

          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isOutOfStock}
            className="
              flex
              w-11
              items-center
              justify-center
              text-[var(--text-primary)]
              transition
              hover:text-[var(--primary-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Minus size={16} />
          </button>

          <div className="flex w-10 items-center justify-center border-x border-[var(--border)] text-sm font-medium">
            {quantity}
          </div>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={quantity >= product.stock || isOutOfStock}
            className="
              flex
              w-11
              items-center
              justify-center
              text-[var(--text-primary)]
              transition
              hover:text-[var(--primary-hover)]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Plus size={16} />
          </button>

        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock || productExist}
          className={`
            flex
            flex-1
            items-center
            justify-center
            gap-2
            bg-[var(--primary)]
            px-6
            py-4
            text-sm
            font-semibold
            text-black
            transition
            hover:bg-[var(--primary-hover)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          `}
        >
          <ShoppingBag size={18} />

          {isOutOfStock
            ? "Out of Stock"
            : added
              ? "Adding to Cart..."
              :productExist ? "Added To Cart"
              : "Add to Cart"}
        </button>

        {/* Wishlist */}
        {/* <button
          type="button"
          aria-label="Add to wishlist"
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            border
            border-[var(--border)]
            text-[var(--text-primary)]
            transition
            hover:border-[var(--primary)]
            hover:text-[var(--primary-hover)]
          "
        >
          <Heart size={20} strokeWidth={1.5} />
        </button> */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            liked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`
    flex
    h-14
    w-14
    shrink-0
    items-center
    justify-center
    border
    transition
    ${liked
              ? "border-[var(--primary)] text-[var(--primary-hover)]"
              : "border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary-hover)]"
            }
  `}
        >
          <Heart
            size={20}
            strokeWidth={1.5}
            fill={liked ? "currentColor" : "none"}
          />
        </button>

      </div>
    </>
  );
}