"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [delProduct, setDelProdduct] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/products",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [delProduct]);

  const filteredProducts = products.filter(
    (product) => {
      const value = search.toLowerCase();

      return (
        product.name
          ?.toLowerCase()
          .includes(value) ||
        product.category
          ?.toLowerCase()
          .includes(value)
      );
    }
  );

  const deleteProduct = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`/api/products/${id}`);
      console.log(response.data);
      setError(response.data.message);
      setDelProdduct(!delProduct);
    } catch (error) {
      console.log("This error from delete funtion on product page")
    }
  }

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-PK");

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">

        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Store
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Products
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your watch products.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-black"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>

        {/* Search */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="h-12 w-full border border-[var(--border)] bg-white pl-11 pr-4 text-sm outline-none focus:border-black"
            />
          </div>

          <button
            type="button"
            onClick={getProducts}
            className="flex h-12 items-center justify-center gap-2 border border-[var(--border)] px-5 text-sm"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="mt-8 border border-[var(--border)] p-10 text-center text-sm text-gray-500">
            Loading products...
          </div>
        ) : (
          <div className="mt-8 overflow-hidden border border-[var(--border)] bg-white">

            {/* Desktop Table */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-5 py-4">
                      Product
                    </th>

                    <th className="px-5 py-4">
                      Category
                    </th>

                    <th className="px-5 py-4">
                      Price
                    </th>

                    <th className="px-5 py-4">
                      Stock
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map(
                    (product) => (
                      <tr
                        key={product._id}
                        className="border-b border-[var(--border)] last:border-0"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center overflow-hidden bg-gray-100">
                              {product.images?.[0]
                                ?.url ? (
                                <img
                                  src={
                                    product.images[0]
                                      .url
                                  }
                                  alt={
                                    product.name
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <Package
                                  size={20}
                                  className="text-gray-400"
                                />
                              )}
                            </div>

                            <div>
                              <p className="font-medium">
                                {product.name}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {product.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm">
                          {product.category}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium">
                          Rs.{" "}
                          {formatPrice(
                            product.discountPrice ||
                              product.price
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm">
                          {product.stock}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`text-xs font-medium ${
                              product.isActive
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {product.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/admin/products/${product._id}/edit`}
                              className="flex h-9 w-9 items-center justify-center border border-[var(--border)] hover:bg-gray-100"
                            >
                              <Pencil size={16} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => deleteProduct(product._id)}
                              className="flex h-9 w-9 items-center justify-center border border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile */}

            <div className="divide-y md:hidden">
              {filteredProducts.map(
                (product) => (
                  <div
                    key={product._id}
                    className="p-5"
                  >
                    <div className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden bg-gray-100">
                        {product.images?.[0]
                          ?.url && (
                          <img
                            src={
                              product.images[0]
                                .url
                            }
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {product.category}
                        </p>

                        <p className="mt-3 text-sm font-medium">
                          Rs.{" "}
                          {formatPrice(
                            product.discountPrice ||
                              product.price
                          )}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Stock: {product.stock}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="flex flex-1 items-center justify-center gap-2 border border-[var(--border)] py-2 text-sm"
                      >
                        <Pencil size={15} />
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="flex flex-1 items-center justify-center gap-2 border border-red-200 py-2 text-sm text-red-600"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            {!filteredProducts.length && (
              <div className="p-12 text-center text-sm text-gray-500">
                No products found.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}