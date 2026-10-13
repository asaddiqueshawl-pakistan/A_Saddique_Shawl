"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Clock3,
  Package,
  Truck,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const statusSteps = [
  {
    key: "pending",
    label: "Order Placed",
    description: "Your order has been received.",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    description: "Your order has been confirmed.",
  },
  {
    key: "processing",
    label: "Processing",
    description: "Your order is being prepared.",
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order is on its way.",
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Your order has been delivered.",
  },
];

const statusOrder = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

export default function OrderDetailsPage() {
  const params = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.orderId) return;

    const getOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/orders/${params.orderId}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(
            data.message || "Failed to fetch order"
          );
          return;
        }

        setOrder(data.order);
      } catch (error) {
        console.error(
          "Get order details error:",
          error
        );

        setError(
          "Something went wrong while loading the order."
        );
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [params?.orderId]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusIndex = (status) => {
    return statusOrder.indexOf(status);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "delivered":
        return "border-green-200 bg-green-50 text-green-700";

      case "shipped":
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "processing":
        return "border-yellow-200 bg-yellow-50 text-yellow-700";

      case "confirmed":
        return "border-purple-200 bg-purple-50 text-purple-700";

      case "cancelled":
        return "border-red-200 bg-red-50 text-red-700";

      default:
        return "border-gray-200 bg-gray-50 text-gray-700";
    }
  };

  if (loading) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <div className="h-5 w-32 animate-pulse bg-gray-100" />

          <div className="mt-8 h-10 w-72 animate-pulse bg-gray-100" />

          <div className="mt-10 h-72 animate-pulse bg-gray-100" />
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex flex-1 items-center justify-center px-5 py-20">
        <div className="w-full max-w-md border border-[var(--border)] bg-white p-8 text-center">
          <Package
            size={42}
            strokeWidth={1.4}
            className="mx-auto text-[var(--text-secondary)]"
          />

          <h1 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">
            Order Not Found
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {error || "We couldn't find this order."}
          </p>

          <Link
            href="/account/orders"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              bg-[var(--primary)]
              px-5
              py-3
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-[var(--primary-hover)]
            "
          >
            <ArrowLeft size={17} />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const currentStatusIndex = getStatusIndex(
    order.orderStatus
  );

  return (
    <main className="flex-1 bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">

        {/* Back */}
        <Link
          href="/account/orders"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-[var(--text-secondary)]
            transition
            hover:text-[var(--primary-hover)]
          "
        >
          <ArrowLeft size={17} />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col gap-5 border-b border-[var(--border)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary-hover)]">
              Order Details
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
              {order.orderNumber}
            </h1>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>

          <span
            className={`w-fit border px-4 py-2 text-sm font-medium capitalize ${getStatusClasses(
              order.orderStatus
            )}`}
          >
            {order.orderStatus}
          </span>
        </div>

        {/* Tracking */}
        {order.orderStatus !== "cancelled" && (
          <section className="mt-8 border border-[var(--border)] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Truck
                size={21}
                className="text-[var(--primary-hover)]"
              />

              <div>
                <h2 className="font-semibold text-[var(--text-primary)]">
                  Order Tracking
                </h2>

                <p className="text-sm text-[var(--text-secondary)]">
                  Track the progress of your order.
                </p>
              </div>
            </div>

            <div className="mt-8">
              {statusSteps.map((step, index) => {
                const completed =
                  index <= currentStatusIndex;

                const active =
                  index === currentStatusIndex;

                return (
                  <div
                    key={step.key}
                    className="relative flex gap-4"
                  >
                    {index !== statusSteps.length - 1 && (
                      <div
                        className={`absolute left-[15px] top-8 h-[calc(100%-8px)] w-px ${
                          index < currentStatusIndex
                            ? "bg-[var(--primary)]"
                            : "bg-[var(--border)]"
                        }`}
                      />
                    )}

                    <div
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                        completed
                          ? "border-[var(--primary)] bg-[var(--primary)] text-black"
                          : "border-[var(--border)] bg-white text-[var(--text-secondary)]"
                      }`}
                    >
                      {completed ? (
                        <Check size={16} />
                      ) : (
                        <Clock3 size={15} />
                      )}
                    </div>

                    <div className="pb-8">
                      <p
                        className={`text-sm font-semibold ${
                          active
                            ? "text-[var(--primary-hover)]"
                            : "text-[var(--text-primary)]"
                        }`}
                      >
                        {step.label}
                      </p>

                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Cancelled */}
        {order.orderStatus === "cancelled" && (
          <section className="mt-8 border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-700">
              Order Cancelled
            </h2>

            <p className="mt-1 text-sm text-red-600">
              This order has been cancelled.
            </p>
          </section>
        )}

        {/* Main Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Items */}
          <section className="border border-[var(--border)] bg-white p-6 lg:col-span-2">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-5">
              <Package
                size={21}
                className="text-[var(--primary-hover)]"
              />

              <div>
                <h2 className="font-semibold text-[var(--text-primary)]">
                  Ordered Items
                </h2>

                <p className="text-sm text-[var(--text-secondary)]">
                  {order.items.length}{" "}
                  {order.items.length === 1
                    ? "item"
                    : "items"}
                </p>
              </div>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {order.items.map((item) => (
                <div
                  key={`${item.productId}-${item.quantity}`}
                  className="flex gap-4 py-5"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-[var(--border)] bg-gray-50">
                    <Package
                      size={28}
                      strokeWidth={1.3}
                      className="text-[var(--text-secondary)]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-[var(--text-primary)]">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 text-sm font-medium text-[var(--primary-hover)]">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      Rs.{" "}
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="h-fit border border-[var(--border)] bg-white p-6">
            <h2 className="font-semibold text-[var(--text-primary)]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-[var(--text-secondary)]">
                  Subtotal
                </span>

                <span className="font-medium text-[var(--text-primary)]">
                  Rs. {order.subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[var(--text-secondary)]">
                  Delivery
                </span>

                <span className="font-medium text-[var(--text-primary)]">
                  Rs. {order.deliveryFee.toLocaleString()}
                </span>
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-semibold text-[var(--text-primary)]">
                    Total
                  </span>

                  <span className="text-lg font-semibold text-[var(--primary-hover)]">
                    Rs. {order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-5">
              <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                Payment Method
              </p>

              <p className="mt-2 text-sm font-medium capitalize text-[var(--text-primary)]">
                {order.paymentMethod}
              </p>

              <p className="mt-4 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                Payment Status
              </p>

              <p className="mt-2 text-sm font-medium capitalize text-[var(--text-primary)]">
                {order.paymentStatus}
              </p>
            </div>
          </section>
        </div>

        {/* Customer Information */}
        <section className="mt-6 border border-[var(--border)] bg-white p-6">
          <h2 className="font-semibold text-[var(--text-primary)]">
            Delivery Information
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <div className="flex gap-3">
              <MapPin
                size={19}
                className="mt-0.5 shrink-0 text-[var(--primary-hover)]"
              />

              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  Address
                </p>

                <p className="mt-1 text-sm leading-6 text-[var(--text-primary)]">
                  {order.customer.address}
                  <br />
                  {order.customer.city}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone
                size={19}
                className="mt-0.5 shrink-0 text-[var(--primary-hover)]"
              />

              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  Phone
                </p>

                <p className="mt-1 text-sm text-[var(--text-primary)]">
                  {order.customer.phone}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail
                size={19}
                className="mt-0.5 shrink-0 text-[var(--primary-hover)]"
              />

              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-[var(--text-primary)]">
                  {order.customer.email}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-[var(--border)] pt-5">
            <p className="text-xs text-[var(--text-secondary)]">
              Order created
            </p>

            <p className="mt-1 text-sm text-[var(--text-primary)]">
              {formatDateTime(order.createdAt)}
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}