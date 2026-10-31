// "use client";

// import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
// import { useDebugValue, useEffect, useState } from "react";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import Link from "next/link";

// export default function ProductActions({ product, selectedImage }) {
//   const { addToCart, cart } = useCart();

//   console.log("from pA", product)

//   const {
//     toggleWishlist,
//     isInWishlist,
//   } = useWishlist();

//   const [quantity, setQuantity] = useState(1);
//   const [added, setAdded] = useState(false);
//   const [productExist, setProductExist] = useState(false);



//   const liked = isInWishlist(product._id);

//   const increaseQuantity = () => {
//     if (quantity < product.stock) {
//       setQuantity((value) => value + 1);
//     }
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity((value) => value - 1);
//     }
//   };

//   const handleAddToCart = () => {
//     addToCart(product, quantity, selectedImage);

//     setAdded(true);

//     setTimeout(() => {
//       setAdded(false);
//     }, 1500);
//   };

//   const isOutOfStock = product.stock <= 0;

//   useEffect(() => {
//     if (cart.length >= 0) {
//       for (let i = 0; i < cart.length; i++) {
//         console.log("loop", cart[i]);
//         if (cart[i]._id === product._id) {
//           setProductExist(true);
//         }
//       };
//     }
//   })

//   return (
//     <>
//       {/* Quantity + Cart */}
//       <div className="mt-7 sm:flex gap-3">

//         {/* Quantity */}
//         <div className="flex mb-5 sm:mb-0 justify-around h-14 border border-[var(--border)]">

//           <button
//             type="button"
//             onClick={decreaseQuantity}
//             disabled={quantity <= 1 || isOutOfStock}
//             className="
//               flex
//               w-1/3
//               sm:w-11
//               items-center
//               justify-center
//               text-[var(--text-primary)]
//               transition
//               hover:text-[var(--primary-hover)]
//               disabled:cursor-not-allowed
//               disabled:opacity-40
//             "
//           >
//             <Minus size={16} />
//           </button>

//           <div className="flex w-1/3 sm:w-10 items-center justify-center border-x border-[var(--border)] text-sm font-medium">
//             {quantity}
//           </div>

//           <button
//             type="button"
//             onClick={increaseQuantity}
//             disabled={quantity >= product.stock || isOutOfStock}
//             className="
//               flex
//               w-1/3
//               sm:w-11
//               items-center
//               justify-center
//               text-[var(--text-primary)]
//               transition
//               hover:text-[var(--primary-hover)]
//               disabled:cursor-not-allowed
//               disabled:opacity-40
//             "
//           >
//             <Plus size={16} />
//           </button>

//         </div>


//         <div className=" flex items-center gap-5 w-full">

//           {/* Add to Cart */}
//           <button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={isOutOfStock}
//             className={`
//             flex
//             flex-1
//             items-center
//             justify-center
//             gap-2
//             bg-[var(--primary)]
//             px-6
//             py-4
//             text-sm
//             font-semibold
//             text-black
//             transition
//             hover:bg-[var(--primary-hover)]
//             disabled:cursor-not-allowed
//             disabled:opacity-50
//             w-1/2
//           `}
//           >
//             <ShoppingBag size={18} />

//             {/* {isOutOfStock
//             ? "Out of Stock"
//             : added
//               ? "Adding to Cart..."
//               :productExist ? <Link>Checkout</Link>
//               : "Add to Cart"}
//         </button> */}


//             {isOutOfStock ? (
//               <button disabled className="w-full rounded-lg bg-gray-400 py-3 text-white cursor-not-allowed">
//                 Out of Stock
//               </button>
//             ) : productExist ? (
//               <Link
//                 href="/checkout"
//                 className="block w-full rounded-lg bg-[#B58A52] py-3 text-center font-semibold text-white hover:bg-[#96703F] transition"
//               >
//                 Checkout
//               </Link>
//             ) : (
//               <button
//                 onClick={handleAddToCart}
//                 disabled={added}
//                 className="w-full rounded-lg bg-[#B58A52] py-3 text-white font-semibold hover:bg-[#96703F] transition disabled:opacity-50"
//               >
//                 {added ? "Adding to Cart..." : "Add to Cart"}
//               </button>
//             )}


//             {/* Wishlist */}
//             {/* <button
//           type="button"
//           aria-label="Add to wishlist"
//           className="
//             flex
//             h-14
//             w-14
//             shrink-0
//             items-center
//             justify-center
//             border
//             border-[var(--border)]
//             text-[var(--text-primary)]
//             transition
//             hover:border-[var(--primary)]
//             hover:text-[var(--primary-hover)]
//           "
//         >
//           <Heart size={20} strokeWidth={1.5} />
//         </button> */}
//             <button
//               type="button"
//               onClick={() => toggleWishlist(product)}
//               aria-label={
//                 liked
//                   ? "Remove from wishlist"
//                   : "Add to wishlist"
//               }
//               className={`
//     flex
//     h-14
//     w-14
//     shrink-0
//     items-center
//     justify-center
//     border
//     transition
//     ${liked
//                   ? "border-[var(--primary)] text-[var(--primary-hover)]"
//                   : "border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary-hover)]"
//                 }
//   `}
//             >
//               <Heart
//                 size={20}
//                 strokeWidth={1.5}
//                 fill={liked ? "currentColor" : "none"}
//               />
//             </button>

//         </div>

//       </div>
//     </>
//   );
// }




"use client";

import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

export default function ProductActions({ product, selectedImage }) {
  const { addToCart, cart } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check whether product already exists in cart
  const productExist = mounted && cart.some(
    (item) => item._id === product._id
  );

  // Wishlist
  const liked = mounted && isInWishlist(product._id);

  // Stock
  const isOutOfStock = product.stock <= 0;

  // Increase quantity
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    if (isOutOfStock || added || productExist) return;

    addToCart(product, quantity, selectedImage);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <>
      {/* Quantity + Cart */}
      <div className="mt-7 sm:flex gap-3">

        {/* Quantity */}
        <div className="flex mb-5 sm:mb-0 justify-around h-14 border border-[var(--border)]">

          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1 || isOutOfStock}
            className="flex w-1/3 sm:w-11 items-center justify-center text-[var(--text-primary)] transition hover:text-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={16} />
          </button>

          <div className="flex w-1/3 sm:w-10 items-center justify-center border-x border-[var(--border)] text-sm font-medium">
            {quantity}
          </div>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={quantity >= product.stock || isOutOfStock}
            className="flex w-1/3 sm:w-11 items-center justify-center text-[var(--text-primary)] transition hover:text-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} />
          </button>

        </div>

        <div className="flex items-center gap-5 w-full">

          {/* Add to Cart / Checkout */}
          {!mounted ? (
            <button
              type="button"
              disabled
              className="flex-1 bg-[var(--primary)] px-6 py-4 opacity-50"
            >
              Loading...
            </button>
          ) : isOutOfStock ? (
            <button
              type="button"
              disabled
              className="flex-1 bg-gray-400 px-6 py-4 text-white cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : productExist ? (
            <Link
              href="/checkout"
              className="flex flex-1 items-center justify-center gap-2 bg-[#9c6e32] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#96703F]"
            >
              <ShoppingBag size={18} />
              Checkout
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={added}
              className="flex flex-1 items-center justify-center gap-2 bg-[var(--primary)] px-6 py-4 text-sm font-semibold text-black transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={18} />
              {added ? "Adding to Cart..." : "Add to Cart"}
            </button>
          )}

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={
              liked ? "Remove from wishlist" : "Add to wishlist"
            }
            className={`flex h-14 w-14 shrink-0 items-center justify-center border transition ${
              liked
                ? "border-[var(--primary)] text-[var(--primary-hover)]"
                : "border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary-hover)]"
            }`}
          >
            <Heart
              size={20}
              strokeWidth={1.5}
              fill={liked ? "currentColor" : "none"}
            />
          </button>

        </div>
      </div>
    </>
  );
}
