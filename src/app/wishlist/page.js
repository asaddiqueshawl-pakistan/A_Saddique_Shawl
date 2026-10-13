"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
    isLoaded,
  } = useWishlist();

  const { addToCart } = useCart();

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <p className="text-sm text-[var(--text-secondary)]">
          Loading wishlist...
        </p>
      </main>
    );
  }

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--background)]">

        <div className="mx-auto flex max-w-7xl flex-col items-center px-5 py-24 text-center lg:px-8">

          <div className="flex h-20 w-20 items-center justify-center border border-[var(--border)]">
            <Heart
              size={30}
              strokeWidth={1.5}
              className="text-[var(--text-secondary)]"
            />
          </div>

          <h1 className="mt-7 text-3xl font-semibold text-[var(--text-primary)]">
            Your wishlist is empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
            Save your favorite watches here and come back to them anytime.
          </p>

          <Link
            href="/shop"
            className="
              mt-7
              inline-flex
              bg-[var(--primary)]
              px-7
              py-3.5
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-[var(--primary-hover)]
            "
          >
            Explore Watches
          </Link>

        </div>

      </main>
    );
  }

  const handleAddToCart = (item) => {
    addToCart({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      brand: item.brand,
      price: item.price,
      discountPrice: item.discountPrice,
      images: item.image
        ? [{ url: item.image }]
        : [],
    });
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* Header */}
      <section className="border-b border-[var(--border)] bg-[var(--section-bg)]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
            Saved For Later
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            My Wishlist
          </h1>

          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            {wishlist.length}{" "}
            {wishlist.length === 1 ? "watch" : "watches"} saved
          </p>

        </div>
      </section>

      {/* Products */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {wishlist.map((item) => {
              const price =
                item.discountPrice || item.price;

              return (
                <article
                  key={item._id}
                  className="group border border-[var(--border)] bg-white"
                >

                  {/* Image */}
                  <Link
                    href={`/product/${item.slug}`}
                    className="
                      relative
                      block
                      aspect-[4/5]
                      overflow-hidden
                      bg-[var(--section-bg)]
                    "
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[var(--text-secondary)]">
                        No image
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="p-5">

                    <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                      {item.brand}
                    </p>

                    <Link
                      href={`/product/${item.slug}`}
                      className="
                        mt-2
                        block
                        text-base
                        font-medium
                        text-[var(--text-primary)]
                        transition
                        hover:text-[var(--primary-hover)]
                      "
                    >
                      {item.name}
                    </Link>

                    <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                      Rs. {price.toLocaleString()}
                    </p>

                    {/* Actions */}
                    <div className="mt-5 flex gap-2">

                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          bg-[var(--primary)]
                          px-4
                          py-3
                          text-xs
                          font-semibold
                          text-black
                          transition
                          hover:bg-[var(--primary-hover)]
                        "
                      >
                        <ShoppingBag size={15} />
                        Add to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromWishlist(item._id)
                        }
                        aria-label="Remove from wishlist"
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          border
                          border-[var(--border)]
                          text-[var(--text-secondary)]
                          transition
                          hover:border-red-300
                          hover:text-red-500
                        "
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </div>
      </section>

    </main>
  );
}