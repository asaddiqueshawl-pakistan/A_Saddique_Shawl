"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  Clock,
  Copy,
  Check,
  Loader2,
  ShoppingBag,
} from "lucide-react";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();

  const {Id} = params;

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getCustomer = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `/api/admin/customers/${Id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setCustomer(response.data.customer);
      }
    } catch (error) {
      console.error("Failed to fetch customer:", error);

      if (error.response?.status === 404) {
        setCustomer(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Id) {
      getCustomer();
    }
  }, [Id]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyCustomerId = async () => {
    if (!customer?._id) return;

    await navigator.clipboard.writeText(customer._id);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />

          <p className="mt-3 text-sm text-gray-500">
            Loading customer...
          </p>
        </div>
      </div>
    );
  }

  // Customer not found
  if (!customer) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <UserRound className="h-8 w-8 text-gray-400" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Customer Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The customer you are looking for does not exist.
          </p>

          <button
            onClick={() => router.push("/admin/customers")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/customers")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Customers
        </button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Customer Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View customer account information.
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
              customer.role === "admin"
                ? "bg-purple-50 text-purple-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {customer.role === "admin" ? "Admin" : "Active Customer"}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
              <UserRound className="h-11 w-11 text-blue-600" />
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {customer.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {customer.email}
            </p>

            <span className="mt-4 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
              {customer.role}
            </span>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Customer ID
            </p>

            <div className="mt-2 flex items-center gap-2">
              <p className="min-w-0 flex-1 truncate rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                {customer._id}
              </p>

              <button
                onClick={copyCustomerId}
                className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-blue-600"
                title="Copy customer ID"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="font-semibold text-gray-900">
                Account Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Customer's personal and account details.
              </p>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2">
              {/* Name */}
              <div>
                <div className="flex items-center gap-2 text-gray-400">
                  <UserRound className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Full Name
                  </span>
                </div>

                <p className="mt-2 font-medium text-gray-900">
                  {customer.name}
                </p>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Email Address
                  </span>
                </div>

                <p className="mt-2 break-all font-medium text-gray-900">
                  {customer.email}
                </p>
              </div>

              {/* Phone */}
              <div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Phone Number
                  </span>
                </div>

                <p className="mt-2 font-medium text-gray-900">
                  {customer.phone || "Not provided"}
                </p>
              </div>

              {/* Role */}
              <div>
                <div className="flex items-center gap-2 text-gray-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Account Role
                  </span>
                </div>

                <p className="mt-2 font-medium capitalize text-gray-900">
                  {customer.role}
                </p>
              </div>

              {/* Created */}
              <div>
                <div className="flex items-center gap-2 text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Registered
                  </span>
                </div>

                <p className="mt-2 font-medium text-gray-900">
                  {formatDate(customer.createdAt)}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formatDateTime(customer.createdAt)}
                </p>
              </div>

              {/* Updated */}
              <div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Last Updated
                  </span>
                </div>

                <p className="mt-2 font-medium text-gray-900">
                  {formatDate(customer.updatedAt)}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {formatDateTime(customer.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Orders Placeholder */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Customer Orders
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Orders placed by this customer.
                </p>
              </div>

              <ShoppingBag className="h-5 w-5 text-gray-400" />
            </div>

            <div className="px-6 py-10 text-center">
              <ShoppingBag className="mx-auto h-9 w-9 text-gray-300" />

              <p className="mt-3 text-sm font-medium text-gray-700">
                Orders section
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Customer orders can be displayed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

