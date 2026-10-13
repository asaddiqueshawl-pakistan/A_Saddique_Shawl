"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Users,
  Mail,
  Phone,
  CalendarDays,
  Eye,
  UserRound,
  Loader2,
} from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getCustomers = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/admin/customers", {
        withCredentials: true,
      });

      if (response.data.success) {
        setCustomers(response.data.customers);
        setFilteredCustomers(response.data.customers);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(value) ||
        customer.email?.toLowerCase().includes(value) ||
        customer.phone?.toLowerCase().includes(value)
    );

    setFilteredCustomers(filtered);
  }, [search, customers]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Customers
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage and view all registered customers.
            </p>
          </div>

          {/* Total Customers */}
          <div className="flex w-fit items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Users className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Total Customers</p>
              <p className="text-lg font-bold text-gray-900">
                {customers.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Customers */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Joined
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <Loader2 className="mx-auto h-7 w-7 animate-spin text-blue-600" />

                    <p className="mt-3 text-sm text-gray-500">
                      Loading customers...
                    </p>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <Users className="mx-auto h-10 w-10 text-gray-300" />

                    <p className="mt-3 font-medium text-gray-700">
                      No customers found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Try changing your search.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          {customer.image ? (
                            <img
                              src={customer.image}
                              alt={customer.name || "Customer"}
                              className="h-11 w-11 rounded-full object-cover"
                            />
                          ) : (
                            <UserRound className="h-5 w-5" />
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {customer.name || "Unknown Customer"}
                          </p>

                          <p className="text-xs text-gray-400">
                            ID: {customer._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {customer.email || "N/A"}
                        </div>

                        {customer.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays className="h-4 w-4 text-gray-400" />
                        {formatDate(customer.createdAt)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        Active
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          (window.location.href = `/admin/customers/${customer._id}`)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-gray-100 md:hidden">
          {loading ? (
            <div className="px-5 py-16 text-center">
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-blue-600" />

              <p className="mt-3 text-sm text-gray-500">
                Loading customers...
              </p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <Users className="mx-auto h-10 w-10 text-gray-300" />

              <p className="mt-3 font-medium text-gray-700">
                No customers found
              </p>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <div key={customer._id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      {customer.image ? (
                        <img
                          src={customer.image}
                          alt={customer.name || "Customer"}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <UserRound className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {customer.name || "Unknown Customer"}
                      </p>

                      <p className="text-xs text-gray-400">
                        ID: {customer._id}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="break-all">
                      {customer.email || "N/A"}
                    </span>
                  </div>

                  {customer.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {customer.phone}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays className="h-4 w-4 text-gray-400" />
                    Joined {formatDate(customer.createdAt)}
                  </div>
                </div>

                <button
                  onClick={() =>
                    (window.location.href = `/admin/customers/${customer._id}`)
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Eye className="h-4 w-4" />
                  View Customer
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
