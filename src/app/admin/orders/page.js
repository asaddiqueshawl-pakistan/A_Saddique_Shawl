"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Eye,
  RefreshCw,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/orders", {
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
      console.error("Get admin orders error:", error);
      setError("Something went wrong.");
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

  const statusClasses = (status) => {
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

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--primary-hover)]">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
              Orders
            </h1>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Manage customer orders and order status.
            </p>
          </div>

          <button
            onClick={getOrders}
            disabled={loading}
            className="inline-flex w-fit items-center gap-2 border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--primary)]"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-8 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse border border-[var(--border)] bg-gray-50"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center border border-[var(--border)] bg-white px-5 py-16 text-center">
            <Package
              size={45}
              strokeWidth={1.4}
              className="text-[var(--text-secondary)]"
            />

            <h2 className="mt-5 text-xl font-semibold">
              No Orders
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              No customer orders have been placed yet.
            </p>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && orders.length > 0 && (
          <div className="mt-8 hidden overflow-hidden border border-[var(--border)] bg-white md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-gray-50">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Order
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Total
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Payment
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[var(--border)] last:border-b-0"
                    >
                      <td className="px-5 py-5">
                        <p className="font-semibold text-[var(--text-primary)]">
                          {order.orderNumber}
                        </p>

                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                          {order.items.length}{" "}
                          {order.items.length === 1
                            ? "item"
                            : "items"}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-medium">
                          {order.customer.name}
                        </p>

                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                          {order.userEmail}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-sm">
                        {formatDate(order.createdAt)}
                      </td>

                      <td className="px-5 py-5 font-semibold">
                        Rs. {order.total.toLocaleString()}
                      </td>

                      <td className="px-5 py-5">
                        <span className="text-sm capitalize">
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex border px-3 py-1 text-xs font-medium capitalize ${statusClasses(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-right">
                        <Link
                          href={`/admin/orders/${order._id}`}
                          className="inline-flex items-center gap-2 border border-[var(--border)] px-3 py-2 text-sm transition hover:border-[var(--primary)]"
                        >
                          <Eye size={16} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && orders.length > 0 && (
          <div className="mt-8 space-y-4 md:hidden">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-[var(--border)] bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">
                      {order.orderNumber}
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`border px-2.5 py-1 text-xs capitalize ${statusClasses(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="mt-5 space-y-3 border-t border-[var(--border)] pt-5">
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Customer
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {order.customer.name}
                    </p>

                    <p className="text-xs text-[var(--text-secondary)]">
                      {order.userEmail}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">
                      Total
                    </span>

                    <span className="font-semibold">
                      Rs. {order.total.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">
                      Payment
                    </span>

                    <span className="text-sm capitalize">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/admin/orders/${order._id}`}
                  className="mt-5 flex items-center justify-center gap-2 border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition hover:border-[var(--primary)]"
                >
                  <Eye size={16} />
                  View Order
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}