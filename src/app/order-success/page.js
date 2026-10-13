"use client";

import Link from "next/link";
import { Check, Package, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-[var(--background)]">

      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center lg:py-28">

        {/* Success Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)]">
          <Check
            size={38}
            strokeWidth={2}
            className="text-black"
          />
        </div>

        {/* Heading */}
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
          Order Confirmed
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Thank You For Your Order
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
          Your order has been successfully placed. We'll contact you shortly
          to confirm your order and delivery details.
        </p>

        {/* Order Number */}
        {orderNumber && (
          <div className="mt-8 border border-[var(--border)] px-8 py-5">

            <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              Order Number
            </p>

            <p className="mt-2 text-lg font-semibold tracking-wide text-[var(--text-primary)]">
              {orderNumber}
            </p>

          </div>
        )}

        {/* Benefits */}
        <div className="mt-12 grid w-full gap-5 sm:grid-cols-2">

          <div className="border border-[var(--border)] p-6 text-left">

            <div className="flex h-10 w-10 items-center justify-center bg-[var(--section-bg)]">
              <Package
                size={20}
                strokeWidth={1.5}
                className="text-[var(--primary-hover)]"
              />
            </div>

            <h2 className="mt-5 text-sm font-semibold text-[var(--text-primary)]">
              Order Processing
            </h2>

            <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)]">
              Your order is now being processed. We'll keep you updated about
              its delivery.
            </p>

          </div>

          <div className="border border-[var(--border)] p-6 text-left">

            <div className="flex h-10 w-10 items-center justify-center bg-[var(--section-bg)]">
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="text-[var(--primary-hover)]"
              />
            </div>

            <h2 className="mt-5 text-sm font-semibold text-[var(--text-primary)]">
              Cash on Delivery
            </h2>

            <p className="mt-2 text-xs leading-6 text-[var(--text-secondary)]">
              Please keep the order amount ready when your watch is delivered.
            </p>

          </div>

        </div>

        {/* Buttons */}
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

          <Link
            href="/shop"
            className="
              inline-flex
              items-center
              justify-center
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

          <Link
            href="/"
            className="
              inline-flex
              items-center
              justify-center
              border
              border-[var(--border)]
              px-7
              py-3.5
              text-sm
              font-semibold
              text-[var(--text-primary)]
              transition
              hover:border-[var(--primary)]
            "
          >
            Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}