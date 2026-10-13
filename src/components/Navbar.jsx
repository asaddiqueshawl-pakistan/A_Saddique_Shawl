// "use client";


// import { useWishlist } from "@/context/WishlistContext";
// import { useCart } from "@/context/CartContext";
// import Link from "next/link";
// import { Menu, Search, ShoppingBag, User, X, Heart } from "lucide-react";
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";


// const navLinks = [
//   {
//     label: "Home",
//     href: "/",
//   },
//   {
//     label: "Shop",
//     href: "/shop",
//   },
//   {
//     label: "Men",
//     href: "/shop?category=men",
//   },
//   {
//     label: "Women",
//     href: "/shop?category=women",
//   },
//   {
//     label: "Luxury",
//     href: "/shop?category=luxury",
//   },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const { totalItems } = useCart();
//   const { totalWishlistItems } = useWishlist();

//   const {
//     user,
//     loading: authLoading,
//     logout,
//     isAuthenticated,
//   } = useAuth();

//   return (
//     <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]">
//       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

//         {/* Logo */}
//         <Link
//           href="/"
//           className="text-xl font-bold tracking-[0.25em] text-[var(--text-primary)]"
//         >
//           CHRONOVA
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden items-center gap-8 md:flex">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="
//                 relative
//                 text-sm
//                 font-medium
//                 text-[var(--text-primary)]
//                 transition-colors
//                 hover:text-[var(--primary-hover)]
//                 after:absolute
//                 after:-bottom-2
//                 after:left-0
//                 after:h-px
//                 after:w-0
//                 after:bg-[var(--primary)]
//                 after:transition-all
//                 hover:after:w-full
//               "
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Actions */}
//         <div className="flex items-center gap-4">

//           {/* Search */}
//           <button
//             type="button"
//             aria-label="Search"
//             className="
//               text-[var(--text-primary)]
//               hover:text-[var(--primary-hover)]
//             "
//           >
//             <Search size={20} strokeWidth={1.7} />
//           </button>

//           {/* Account */}
//           <Link
//             href="/account"
//             aria-label="Account"
//             className="
//               hidden
//               sm:block
//               text-[var(--text-primary)]
//               hover:text-[var(--primary-hover)]
//             "
//           >
//             <User size={20} strokeWidth={1.7} />
//           </Link>

//           {/* Cart */}
//           <Link
//             href="/cart"
//             aria-label={`Shopping cart with ${totalItems} items`}
//             className="
//     relative
//     flex
//     h-10
//     w-10
//     items-center
//     justify-center
//     text-[var(--text-primary)]
//     transition
//     hover:text-[var(--primary-hover)]
//   "
//           >
//             <ShoppingBag size={21} strokeWidth={1.7} />

//             {totalItems > 0 && (
//               <span
//                 className="
//         absolute
//         -right-0.5
//         -top-0.5
//         flex
//         h-5
//         min-w-5
//         items-center
//         justify-center
//         rounded-full
//         bg-[var(--primary)]
//         px-1
//         text-[10px]
//         font-bold
//         leading-none
//         text-black
//       "
//               >
//                 {totalItems > 99 ? "99+" : totalItems}
//               </span>
//             )}
//           </Link>

//           <Link
//             href="/wishlist"
//             aria-label={`Wishlist with ${totalWishlistItems} items`}
//             className="
//     relative
//     flex
//     h-10
//     w-10
//     items-center
//     justify-center
//     text-[var(--text-primary)]
//     transition
//     hover:text-[var(--primary-hover)]
//   "
//           >
//             <Heart
//               size={21}
//               strokeWidth={1.7}
//             />

//             {totalWishlistItems > 0 && (
//               <span
//                 className="
//         absolute
//         -right-0.5
//         -top-0.5
//         flex
//         h-5
//         min-w-5
//         items-center
//         justify-center
//         rounded-full
//         bg-[var(--primary)]
//         px-1
//         text-[10px]
//         font-bold
//         leading-none
//         text-black
//       "
//               >
//                 {totalWishlistItems > 99
//                   ? "99+"
//                   : totalWishlistItems}
//               </span>
//             )}
//           </Link>

//           {/* Mobile Menu Button */}
//           <button
//             type="button"
//             aria-label="Toggle menu"
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="
//               text-[var(--text-primary)]
//               hover:text-[var(--primary-hover)]
//               md:hidden
//             "
//           >
//             {menuOpen ? (
//               <X size={23} strokeWidth={1.7} />
//             ) : (
//               <Menu size={23} strokeWidth={1.7} />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {menuOpen && (
//         <div className="border-t border-[var(--border)] bg-[var(--background)] md:hidden">
//           <nav className="mx-auto max-w-7xl px-5 py-5">
//             <div className="flex flex-col">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   onClick={() => setMenuOpen(false)}
//                   className="
//                     border-b
//                     border-[var(--border)]
//                     py-4
//                     text-sm
//                     font-medium
//                     text-[var(--text-primary)]
//                     hover:text-[var(--primary-hover)]
//                   "
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               {/* Mobile Account */}
//               <Link
//                 href="/account"
//                 onClick={() => setMenuOpen(false)}
//                 className="
//                   py-4
//                   text-sm
//                   font-medium
//                   text-[var(--text-primary)]
//                   hover:text-[var(--primary-hover)]
//                 "
//               >
//                 My Account
//               </Link>
//             </div>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }


"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  Heart,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Men",
    href: "/shop?category=men",
  },
  {
    label: "Women",
    href: "/shop?category=women",
  },
  {
    label: "Luxury",
    href: "/shop?category=luxury",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();

  const {
    user,
    loading: authLoading,
    logout,
    isAuthenticated,
    getCurrentUser
  } = useAuth();

  useEffect( () => {
    
      getCurrentUser();

  },[isAuthenticated]);

 
  const handleLogout = async () => {
    setIsLoggingOut(true);

    const result = await logout();

    setIsLoggingOut(false);

    if (result.success) {
      setMenuOpen(false);
    } else {
      console.error(result.message);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-[0.25em] text-[var(--text-primary)]"
        >
          A Saddique
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                relative
                text-sm
                font-medium
                text-[var(--text-primary)]
                transition-colors
                hover:text-[var(--primary-hover)]
                after:absolute
                after:-bottom-2
                after:left-0
                after:h-px
                after:w-0
                after:bg-[var(--primary)]
                after:transition-all
                hover:after:w-full
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="
              text-[var(--text-primary)]
              transition-colors
              hover:text-[var(--primary-hover)]
            "
          >
            <Search
              size={20}
              strokeWidth={1.7}
            />
          </button>

          {/* Authentication */}
          {authLoading ? (
            <div className="hidden h-8 w-16 animate-pulse bg-gray-100 sm:block" />
          ) : isAuthenticated ? (
            <>
              {/* Account */}
              <Link
                href="/account"
                aria-label="My Account"
                className="
                  hidden
                  items-center
                  gap-2
                  text-[var(--text-primary)]
                  transition-colors
                  hover:text-[var(--primary-hover)]
                  sm:flex
                "
              >
                <User
                  size={20}
                  strokeWidth={1.7}
                />

                <span className="max-w-24 truncate text-sm font-medium">
                  {user?.name?.split(" ")[0] || "Account"}
                </span>
              </Link>

              {/* Desktop Logout */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label="Logout"
                className="
                  hidden
                  text-sm
                  font-medium
                  text-[var(--text-secondary)]
                  transition-colors
                  hover:text-[var(--primary-hover)]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:block
                "
              >
                {isLoggingOut ? "..." : "Logout"}
              </button>
            </>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/login"
                className="
                  text-sm
                  font-medium
                  text-[var(--text-primary)]
                  transition-colors
                  hover:text-[var(--primary-hover)]
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                  bg-[var(--primary)]
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-black
                  transition-colors
                  hover:bg-[var(--primary-hover)]
                "
              >
                Register
              </Link>
            </div>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart with ${totalItems} items`}
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              text-[var(--text-primary)]
              transition
              hover:text-[var(--primary-hover)]
            "
          >
            <ShoppingBag
              size={21}
              strokeWidth={1.7}
            />

            {totalItems > 0 && (
              <span
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  px-1
                  text-[10px]
                  font-bold
                  leading-none
                  text-black
                "
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label={`Wishlist with ${totalWishlistItems} items`}
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              text-[var(--text-primary)]
              transition
              hover:text-[var(--primary-hover)]
            "
          >
            <Heart
              size={21}
              strokeWidth={1.7}
            />

            {totalWishlistItems > 0 && (
              <span
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  px-1
                  text-[10px]
                  font-bold
                  leading-none
                  text-black
                "
              >
                {totalWishlistItems > 99
                  ? "99+"
                  : totalWishlistItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="
              text-[var(--text-primary)]
              transition-colors
              hover:text-[var(--primary-hover)]
              md:hidden
            "
          >
            {menuOpen ? (
              <X
                size={23}
                strokeWidth={1.7}
              />
            ) : (
              <Menu
                size={23}
                strokeWidth={1.7}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--background)] md:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-5">

            <div className="flex flex-col">

              {/* Main Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    border-b
                    border-[var(--border)]
                    py-4
                    text-sm
                    font-medium
                    text-[var(--text-primary)]
                    hover:text-[var(--primary-hover)]
                  "
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Authentication */}
              {authLoading ? (
                <div className="py-4">
                  <div className="h-5 w-24 animate-pulse bg-gray-100" />
                </div>
              ) : isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="
                      border-b
                      border-[var(--border)]
                      py-4
                      text-sm
                      font-medium
                      text-[var(--text-primary)]
                      hover:text-[var(--primary-hover)]
                    "
                  >
                    My Account
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="
                      flex
                      items-center
                      gap-2
                      py-4
                      text-left
                      text-sm
                      font-medium
                      text-[var(--text-secondary)]
                      hover:text-[var(--text-primary)]
                      disabled:opacity-50
                    "
                  >
                    <LogOut size={17} />

                    {isLoggingOut
                      ? "Logging out..."
                      : "Logout"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="
                      border-b
                      border-[var(--border)]
                      py-4
                      text-sm
                      font-medium
                      text-[var(--text-primary)]
                      hover:text-[var(--primary-hover)]
                    "
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="
                      mt-4
                      bg-[var(--primary)]
                      px-5
                      py-3
                      text-center
                      text-sm
                      font-semibold
                      text-black
                      transition
                      hover:bg-[var(--primary-hover)]
                    "
                  >
                    Create Account
                  </Link>
                </>
              )}

            </div>
          </nav>
        </div>
      )}
    </header>
  );
}