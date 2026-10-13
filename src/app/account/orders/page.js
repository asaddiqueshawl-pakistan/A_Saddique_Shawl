"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/orders", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to fetch orders");
        return;
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Get orders error:", error);
      setError("Something went wrong while loading your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";

      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "confirmed":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <div className="h-8 w-48 animate-pulse bg-gray-100" />

          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse border border-[var(--border)] bg-gray-50"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">

        {/* Back */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--primary-hover)]"
        >
          <ArrowLeft size={17} />
          Back to Account
        </Link>

        {/* Heading */}
        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary-hover)]">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
            My Orders
          </h1>

          <p className="mt-2 text-[var(--text-secondary)]">
            View and track your watch orders.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Empty */}
        {!error && orders.length === 0 && (
          <div className="mt-10 flex flex-col items-center justify-center border border-[var(--border)] bg-white px-5 py-16 text-center">
            <Package
              size={46}
              strokeWidth={1.4}
              className="text-[var(--text-secondary)]"
            />

            <h2 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">
              No orders yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-[var(--text-secondary)]">
              You haven't placed any orders yet. Explore our collection and
              find your perfect watch.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--primary-hover)]"
            >
              Shop Watches
              <ChevronRight size={17} />
            </Link>
          </div>
        )}

        {/* Orders */}
        {orders.length > 0 && (
          <div className="mt-10 space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-[var(--border)] bg-white"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-[var(--border)] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                      Order Number
                    </p>

                    <p className="mt-1 font-semibold text-[var(--text-primary)]">
                      {order.orderNumber}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`border px-3 py-1 text-xs font-medium capitalize ${getStatusClasses(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>

                    <span className="border border-[var(--border)] px-3 py-1 text-xs font-medium capitalize text-[var(--text-secondary)]">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-5">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                    {/* Date */}
                    <div className="flex items-center gap-3">
                      <CalendarDays
                        size={19}
                        className="text-[var(--primary-hover)]"
                      />

                      <div>
                        <p className="text-xs text-[var(--text-secondary)]">
                          Order Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="flex items-center gap-3">
                      <Package
                        size={19}
                        className="text-[var(--primary-hover)]"
                      />

                      <div>
                        <p className="text-xs text-[var(--text-secondary)]">
                          Items
                        </p>

                        <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                          {order.items.length}{" "}
                          {order.items.length === 1
                            ? "item"
                            : "items"}
                        </p>
                      </div>
                    </div>

                    {/* Total */}
                    <div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        Total
                      </p>

                      <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                        Rs. {order.total.toLocaleString()}
                      </p>
                    </div>

                    {/* View */}
                    <Link
                      href={`/account/orders/${order._id}`}
                      className="inline-flex items-center justify-center gap-2 border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--primary)] hover:text-[var(--primary-hover)]"
                    >
                      View Details
                      <ChevronRight size={17} />
                    </Link>
                  </div>

                  {/* Products */}
                  <div className="mt-6 border-t border-[var(--border)] pt-5">
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 4).map((item) => (
                        <div
                          key={`${order._id}-${item.productId}`}
                          className="border border-[var(--border)] px-3 py-2 text-xs text-[var(--text-secondary)]"
                        >
                          {item.name} × {item.quantity}
                        </div>
                      ))}

                      {order.items.length > 4 && (
                        <div className="border border-[var(--border)] px-3 py-2 text-xs text-[var(--text-secondary)]">
                          +{order.items.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}