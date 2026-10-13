"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Package,
    MapPin,
    Phone,
    Mail,
    CreditCard,
} from "lucide-react";
import Image from "next/image";

const statuses = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
];

export default function AdminOrderDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const updateOrderStatus = async (newStatus) => {
        try {
            setUpdatingStatus(true);

            const response = await fetch(
                `/api/admin/orders/${params.orderId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        orderStatus: newStatus,
                    }),
                }
            );


            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(data.message || "Failed to update status");
                return;
            }

            setOrder((prev) => ({
                ...prev,
                orderStatus: data.order.orderStatus,
            }));
        } catch (error) {
            console.error("Update status error:", error);
            alert("Something went wrong.");
        } finally {
            setUpdatingStatus(false);
        }
    };

    const getOrder = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `/api/admin/orders/${params.orderId}`,
                {
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            console.log(data)

            if (!response.ok || !data.success) {
                setError(data.message || "Failed to fetch order");
                return;
            }

            setOrder(data.order);
        } catch (error) {
            console.error(error);
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params?.orderId) {
            getOrder();
        }
    }, [params?.orderId]);

    if (loading) {
        return (
            <main className="min-h-screen p-8">
                <div className="mx-auto max-w-6xl">
                    <div className="h-8 w-64 animate-pulse bg-gray-100" />
                    <div className="mt-8 h-80 animate-pulse bg-gray-100" />
                </div>
            </main>
        );
    }

    if (error || !order) {
        return (
            <main className="flex min-h-screen items-center justify-center p-5">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">
                        Order Not Found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        {error}
                    </p>

                    <Link
                        href="/admin/orders"
                        className="mt-5 inline-flex items-center gap-2 border px-5 py-3 text-sm"
                    >
                        <ArrowLeft size={17} />
                        Back to Orders
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--background)]">
            <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">

                <Link
                    href="/admin/orders"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
                >
                    <ArrowLeft size={17} />
                    Back to Orders
                </Link>

                {/* Header */}
                <div className="mt-8 flex flex-col gap-4 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--primary-hover)]">
                            Admin
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold">
                            {order.orderNumber}
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString("en-PK")}
                        </p>
                    </div>

                    <span className="w-fit border px-4 py-2 text-sm capitalize">
                        {order.orderStatus}
                    </span>
                </div>

                <section className="mt-6 border bg-white p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">
                                Update Order Status
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Change the current status of this order.
                            </p>
                        </div>

                        <select
                            value={order.orderStatus}
                            disabled={updatingStatus}
                            onChange={(e) => updateOrderStatus(e.target.value)}
                            className="border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
                        >
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() +
                                        status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                {/* Order Information */}
                <div className="mt-8 grid gap-6 lg:grid-cols-3">

                    {/* Customer */}
                    <section className="border bg-white p-6">
                        <h2 className="font-semibold">
                            Customer
                        </h2>

                        <div className="mt-5 space-y-4">

                            <div>
                                <p className="text-xs text-gray-500">
                                    Name
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {order.customer.name}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Mail size={18} />

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Email
                                    </p>

                                    <p className="mt-1 break-all text-sm">
                                        {order.userEmail}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Phone size={18} />

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm">
                                        {order.customer.phone}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Delivery */}
                    <section className="border bg-white p-6">
                        <h2 className="font-semibold">
                            Delivery Address
                        </h2>

                        <div className="mt-5 flex gap-3">
                            <MapPin size={19} />

                            <p className="text-sm leading-6">
                                {order.customer.address}
                                <br />
                                {order.customer.city}
                            </p>
                        </div>
                    </section>

                    {/* Payment */}
                    <section className="border bg-white p-6">
                        <h2 className="font-semibold">
                            Payment
                        </h2>

                        <div className="mt-5 space-y-4">

                            <div className="flex gap-3">
                                <CreditCard size={19} />

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Method
                                    </p>

                                    <p className="mt-1 text-sm capitalize">
                                        {order.paymentMethod}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Payment Status
                                </p>

                                <p className="mt-1 text-sm capitalize">
                                    {order.paymentStatus}
                                </p>
                            </div>

                        </div>
                    </section>
                </div>

                {/* Products */}
                <section className="mt-6 border bg-white p-6">
                    <div className="flex items-center gap-3 border-b pb-5">
                        <Package size={20} />

                        <h2 className="font-semibold">
                            Ordered Products
                        </h2>
                    </div>

                    <div className="divide-y">
                        {order.items.map((item) => (
                            <div
                                key={`${item.productId}-${item.quantity}`}
                                className="flex items-center justify-between gap-5 py-5"
                            >
                                <div className="flex justify-center items-center gap-5">
                                <Image
                                    src={item.image}
                                    height={100}
                                    width={100}
                                />
                                <div>
                                     <h3 className="font-medium">
                                        {item.name} 
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">
                                        Rs.{" "}
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString()}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Rs. {item.price.toLocaleString()} each
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Summary */}
                <section className="mt-6 ml-auto max-w-md border bg-white p-6">
                    <h2 className="font-semibold">
                        Order Summary
                    </h2>

                    <div className="mt-5 space-y-4 text-sm">

                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Subtotal
                            </span>

                            <span>
                                Rs. {order.subtotal.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Delivery
                            </span>

                            <span>
                                Rs. {order.deliveryFee.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between border-t pt-4">
                            <span className="font-semibold">
                                Total
                            </span>

                            <span className="text-lg font-semibold">
                                Rs. {order.total.toLocaleString()}
                            </span>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
}