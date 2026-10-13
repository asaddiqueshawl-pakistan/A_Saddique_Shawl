"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  Clock,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const getDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/dashboard",
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Failed to load dashboard"
        );
        router.back("/");
        return;
      }

      setDashboard(data);
    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );

      setError(
        "Something went wrong while loading dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  const formatPrice = (value) => {
    return Number(value || 0).toLocaleString(
      "en-PK"
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="h-8 w-64 animate-pulse bg-gray-100" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse border border-[var(--border)] bg-gray-50"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>

          <button
            onClick={getDashboard}
            className="mt-5 inline-flex items-center gap-2 border border-[var(--border)] px-4 py-2.5 text-sm"
          >
            <RefreshCw size={17} />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const stats = dashboard?.stats || {};

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--primary-hover)]">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Overview of your watch store.
            </p>
          </div>

          <button
            onClick={getDashboard}
            className="inline-flex w-fit items-center gap-2 border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition hover:border-[var(--primary)]"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Orders */}

          <div className="border border-[var(--border)] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
                <ShoppingBag size={20} />
              </div>

              <span className="text-xs text-gray-500">
                Orders
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold">
              {stats.totalOrders || 0}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Total orders
            </p>
          </div>

          {/* Revenue */}

          <div className="border border-[var(--border)] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
                <DollarSign size={20} />
              </div>

              <span className="text-xs text-gray-500">
                Revenue
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold">
              Rs. {formatPrice(stats.totalRevenue)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Total revenue
            </p>
          </div>

          {/* Customers */}

          <div className="border border-[var(--border)] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
                <Users size={20} />
              </div>

              <span className="text-xs text-gray-500">
                Customers
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold">
              {stats.totalCustomers || 0}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Registered customers
            </p>
          </div>

          {/* Products */}

          <div className="border border-[var(--border)] bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
                <Package size={20} />
              </div>

              <span className="text-xs text-gray-500">
                Products
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold">
              {stats.totalProducts || 0}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Total products
            </p>
          </div>
        </div>

        {/* Pending Orders */}

        <div className="mt-6 border border-[var(--border)] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Pending Orders
              </p>

              <p className="mt-2 text-3xl font-semibold">
                {stats.pendingOrders || 0}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center bg-gray-100">
              <Clock size={22} />
            </div>
          </div>

          <Link
            href="/admin/orders"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            View Orders
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Bottom Grid */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Recent Orders */}

          <section className="border border-[var(--border)] bg-white">
            <div className="flex items-center justify-between border-b border-[var(--border)] p-6">
              <div>
                <h2 className="font-semibold">
                  Recent Orders
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Latest customer orders
                </p>
              </div>

              <Link
                href="/admin/orders"
                className="text-sm font-medium hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="divide-y">
              {dashboard?.recentOrders?.length ? (
                dashboard.recentOrders.map(
                  (order) => (
                    <Link
                      key={order._id}
                      href={`/admin/orders/${order._id}`}
                      className="flex items-center justify-between gap-4 p-5 transition hover:bg-gray-50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {order.orderNumber}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {order.customer?.name}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          Rs.{" "}
                          {formatPrice(
                            order.total
                          )}
                        </p>

                        <p className="mt-1 text-xs capitalize text-gray-500">
                          {order.orderStatus}
                        </p>
                      </div>
                    </Link>
                  )
                )
              ) : (
                <div className="p-8 text-center text-sm text-gray-500">
                  No orders yet.
                </div>
              )}
            </div>
          </section>

          {/* Low Stock */}

          <section className="border border-[var(--border)] bg-white">
            <div className="flex items-center justify-between border-b border-[var(--border)] p-6">
              <div>
                <h2 className="font-semibold">
                  Low Stock
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Products with 5 or fewer items
                </p>
              </div>

              <AlertTriangle size={20} />
            </div>

            <div className="divide-y">
              {dashboard?.lowStockProducts
                ?.length ? (
                dashboard.lowStockProducts.map(
                  (product) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between gap-4 p-5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Rs.{" "}
                          {formatPrice(
                            product.price
                          )}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm font-semibold">
                        {product.stock} left
                      </span>
                    </div>
                  )
                )
              ) : (
                <div className="p-8 text-center text-sm text-gray-500">
                  No low-stock products.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}