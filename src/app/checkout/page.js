"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const { cart, subtotal, totalItems, isLoaded } = useCart();

    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
    });

    const delivery = subtotal > 0 ? 250 : 0;
    const total = subtotal + delivery;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     console.log("Checkout data:", {
    //         customer: formData,
    //         items: cart,
    //         subtotal,
    //         delivery,
    //         total,
    //     });
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer: formData,

                    items: cart.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity,
                    })),

                    paymentMethod: "cod",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to place order"
                );
            }

            console.log("Order created:", data.order);

            router.push(
                `/order-success?order=${data.order.orderNumber}`
            );
        } catch (error) {
            console.error("Checkout error:", error);

            setError(
                error.message || "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[var(--background)]">
                <p className="text-sm text-[var(--text-secondary)]">
                    Loading checkout...
                </p>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5">
                <div className="text-center">

                    <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
                        Your cart is empty
                    </h1>

                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        Add a watch before proceeding to checkout.
                    </p>

                    <Link
                        href="/shop"
                        className="
              mt-6
              inline-flex
              bg-[var(--primary)]
              px-6
              py-3
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-[var(--primary-hover)]
            "
                    >
                        Go to Shop
                    </Link>

                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--background)]">

            {/* Header */}
            <section className="border-b border-[var(--border)] bg-[var(--section-bg)]">
                <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

                    <Link
                        href="/cart"
                        className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-[var(--text-secondary)]
              transition
              hover:text-[var(--text-primary)]
            "
                    >
                        <ArrowLeft size={16} />
                        Back to Cart
                    </Link>

                    <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
                        Checkout
                    </h1>

                </div>
            </section>

            {/* Checkout */}
            <section>
                <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

                    {error && (
                        <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-10 lg:grid-cols-[1fr_380px]"
                    >

                        {/* Customer Information */}
                        <div>

                            <div className="border border-[var(--border)] p-6 sm:p-8">

                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                                    Delivery Information
                                </h2>

                                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                    Enter the details where you'd like your order delivered.
                                </p>

                                <div className="mt-7 grid gap-5 sm:grid-cols-2">

                                    {/* Name */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Muhammad Bilal"
                                            className="
                        h-12
                        w-full
                        border
                        border-[var(--border)]
                        bg-white
                        px-4
                        text-sm
                        text-[var(--text-primary)]
                        outline-none
                        placeholder:text-gray-400
                        focus:border-[var(--primary)]
                      "
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="
                        h-12
                        w-full
                        border
                        border-[var(--border)]
                        bg-white
                        px-4
                        text-sm
                        text-[var(--text-primary)]
                        outline-none
                        placeholder:text-gray-400
                        focus:border-[var(--primary)]
                      "
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="03XX XXXXXXX"
                                            className="
                        h-12
                        w-full
                        border
                        border-[var(--border)]
                        bg-white
                        px-4
                        text-sm
                        text-[var(--text-primary)]
                        outline-none
                        placeholder:text-gray-400
                        focus:border-[var(--primary)]
                      "
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="address"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            Complete Address
                                        </label>

                                        <textarea
                                            id="address"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="House number, street, area..."
                                            className="
                        w-full
                        resize-none
                        border
                        border-[var(--border)]
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-[var(--text-primary)]
                        outline-none
                        placeholder:text-gray-400
                        focus:border-[var(--primary)]
                      "
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                                        >
                                            City
                                        </label>

                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Lahore"
                                            className="
                        h-12
                        w-full
                        border
                        border-[var(--border)]
                        bg-white
                        px-4
                        text-sm
                        text-[var(--text-primary)]
                        outline-none
                        placeholder:text-gray-400
                        focus:border-[var(--primary)]
                      "
                                        />
                                    </div>

                                </div>

                            </div>

                            {/* Payment */}
                            <div className="mt-6 border border-[var(--border)] p-6 sm:p-8">

                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                                    Payment Method
                                </h2>

                                <div className="mt-6 border border-[var(--primary)] bg-[#fffdf5] p-5">

                                    <div className="flex items-start gap-3">

                                        <input
                                            id="cod"
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            defaultChecked
                                            className="mt-1 accent-[var(--primary)]"
                                        />

                                        <label htmlFor="cod">
                                            <p className="text-sm font-semibold text-[var(--text-primary)]">
                                                Cash on Delivery
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                                Pay when your watch is delivered to your doorstep.
                                            </p>
                                        </label>

                                    </div>
                                    <div className="flex items-start gap-3">

                                        <input
                                            id="cod"
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            defaultChecked
                                            className="mt-1 accent-[var(--primary)]"
                                        />

                                        <label htmlFor="cod">
                                            <p className="text-sm font-semibold text-[var(--text-primary)]">
                                                EasyPaisa
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                                Pay when your watch is delivered to your doorstep.
                                            </p>
                                        </label>

                                    </div>
                                    <div className="flex items-start gap-3">

                                        <input
                                            id="cod"
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            defaultChecked
                                            className="mt-1 accent-[var(--primary)]"
                                        />

                                        <label htmlFor="cod">
                                            <p className="text-sm font-semibold text-[var(--text-primary)]">
                                                JazzCash
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                                Pay when your watch is delivered to your doorstep.
                                            </p>
                                        </label>

                                    </div>
                                    <div className="flex items-start gap-3">

                                        <input
                                            id="cod"
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            defaultChecked
                                            className="mt-1 accent-[var(--primary)]"
                                        />

                                        <label htmlFor="cod">
                                            <p className="text-sm font-semibold text-[var(--text-primary)]">
                                                Bank Transfer
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                                                Pay when your watch is delivered to your doorstep.
                                            </p>
                                        </label>

                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Order Summary */}
                        <aside className="h-fit border border-[var(--border)] p-6 lg:p-7">

                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                Your Order
                            </h2>

                            <div className="mt-6 space-y-5">

                                {cart.map((item) => {
                                    const price = item.discountPrice || item.price;

                                    return (
                                        <div
                                            key={item._id}
                                            className="flex gap-4"
                                        >
                                            <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[var(--section-bg)]">
                                                {item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                                    {item.name}
                                                </p>

                                                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="text-sm font-medium text-[var(--text-primary)]">
                                                Rs. {(price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    );
                                })}

                            </div>

                            <div className="mt-7 space-y-4 border-t border-[var(--border)] pt-6">

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

                            <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-5">

                                <span className="font-semibold text-[var(--text-primary)]">
                                    Total
                                </span>

                                <span className="text-xl font-semibold text-[var(--text-primary)]">
                                    Rs. {total.toLocaleString()}
                                </span>

                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="
                  mt-7
                  flex
                  w-full
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
                "
                            >
                                <LockKeyhole size={17} />
                                {isSubmitting ? "Placing Order..." : "Place Order"}
                            </button>

                            <p className="mt-4 text-center text-xs leading-5 text-[var(--text-secondary)]">
                                By placing your order, you agree to our terms and conditions.
                            </p>

                        </aside>

                    </form>

                </div>
            </section>

        </main>
    );
}