"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
    isLoaded,
  } = useCart();

  // console.log(cart)

  const delivery = subtotal > 0 ? 250 : 0;
  const total = subtotal + delivery;

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <p className="text-sm text-[var(--text-secondary)]">
          Loading cart...
        </p>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-5 py-24 text-center lg:px-8">

          <div className="flex h-20 w-20 items-center justify-center border border-[var(--border)]">
            <ShoppingBag
              size={30}
              strokeWidth={1.5}
              className="text-[var(--text-secondary)]"
            />
          </div>

          <h1 className="mt-7 text-3xl font-semibold text-[var(--text-primary)]">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
            Looks like you haven't added any watches to your cart yet.
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
            Continue Shopping
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* Header */}
      <section className="border-b border-[var(--border)] bg-[var(--section-bg)]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
            Shopping Bag
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Your Cart
          </h1>

          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>

        </div>
      </section>

      {/* Cart */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* Items */}
            <div>

              <div className="border-t border-[var(--border)]">

                {cart.map((item) => {
                  const price = item.discountPrice || item.price;

                  return (
                    <div
                      key={item._id}
                      className="
                        flex
                        gap-5
                        border-b
                        border-[var(--border)]
                        py-6
                      "
                    >

                      {/* Image */}
                      <Link
                        href={`/product/${item.slug}`}
                        className="
                          relative
                          h-28
                          w-24
                          shrink-0
                          overflow-hidden
                          bg-[var(--section-bg)]
                          sm:h-32
                          sm:w-28
                        "
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-[var(--text-secondary)]">
                            No image
                          </div>
                        )}
                      </Link>

                      {/* Info */}
                      <div className="flex min-w-0 flex-1 flex-col">

                        <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                          {item.brand}
                        </p>

                        <Link
                          href={`/product/${item.slug}`}
                          className="
                            mt-1
                            line-clamp-2
                            text-base
                            font-medium
                            text-[var(--text-primary)]
                            transition
                            hover:text-[var(--primary-hover)]
                          "
                        >
                          {item.name}
                        </Link>

                        <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                          Rs. {price.toLocaleString()}
                        </p>

                        {/* Controls */}
                        <div className="mt-auto flex items-center gap-4 pt-4">

                          <div className="flex h-9 border border-[var(--border)]">

                            <button
                              type="button"
                              onClick={() =>
                                item.quantity > 1
                                  ? updateQuantity(
                                      item._id,
                                      item.quantity - 1
                                    )
                                  : removeFromCart(item._id)
                              }
                              className="
                                flex
                                w-9
                                items-center
                                justify-center
                                text-[var(--text-primary)]
                                transition
                                hover:text-[var(--primary-hover)]
                              "
                            >
                              <Minus size={14} />
                            </button>

                            <div className="flex w-9 items-center justify-center border-x border-[var(--border)] text-xs font-medium">
                              {item.quantity}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.quantity + 1
                                )
                              }
                              className="
                                flex
                                w-9
                                items-center
                                justify-center
                                text-[var(--text-primary)]
                                transition
                                hover:text-[var(--primary-hover)]
                              "
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item._id)}
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              text-[var(--text-secondary)]
                              transition
                              hover:text-red-500
                            "
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>

                        </div>

                      </div>

                      {/* Item total */}
                      <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          Rs. {(price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>

              <div className="pt-6">
                <Link
                  href="/shop"
                  className="
                    text-sm
                    font-medium
                    text-[var(--text-primary)]
                    underline
                    underline-offset-4
                    transition
                    hover:text-[var(--primary-hover)]
                  "
                >
                  ← Continue Shopping
                </Link>
              </div>

            </div>

            {/* Summary */}
            <aside className="h-fit border border-[var(--border)] p-6 lg:p-7">

              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Order Summary
              </h2>

              <div className="mt-7 space-y-4 border-b border-[var(--border)] pb-6">

                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    Subtotal
                  </span>

                  <span className="font-medium text-[var(--text-primary)]">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">
                    Delivery
                  </span>

                  <span className="font-medium text-[var(--text-primary)]">
                    Rs. {delivery.toLocaleString()}
                  </span>
                </div>

              </div>

              <div className="flex items-center justify-between py-6">

                <span className="font-semibold text-[var(--text-primary)]">
                  Total
                </span>

                <span className="text-xl font-semibold text-[var(--text-primary)]">
                  Rs. {total.toLocaleString()}
                </span>

              </div>

              <Link
                href="/checkout"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  bg-[var(--primary)]
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-black
                  transition
                  hover:bg-[var(--primary-hover)]
                "
              >
                Proceed to Checkout
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-[var(--text-secondary)]">
                Secure checkout. Your order details are protected.
              </p>

            </aside>

          </div>

        </div>
      </section>

    </main>
  );
}