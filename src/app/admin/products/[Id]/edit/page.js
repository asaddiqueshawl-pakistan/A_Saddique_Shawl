"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const {Id} = params;

  

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    brand: "",
    category: "",

    price: "",
    discountPrice: "",
    stock: "",

    movement: "",
    caseMaterial: "",
    strapMaterial: "",
    dialColor: "",
    waterResistance: "",
    warranty: "",

    featured: false,
    isActive: true,
  });

  

  // Get product
  useEffect(() => {
    if (!Id) return;

    console.log(Id);

    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `/api/admin/products/${Id}`,
          {
            withCredentials: true,
          }
        );

        console.log(response.data);

        const product =
          response.data.product;

        setFormData({
          name: product.name || "",
          slug: product.slug || "",
          description:
            product.description || "",
          brand: product.brand || "",
          category: product.category || "",

          price: product.price ?? "",
          discountPrice:
            product.discountPrice ?? "",
          stock: product.stock ?? "",

          movement:
            product.specifications?.movement ||
            "",

          caseMaterial:
            product.specifications
              ?.caseMaterial || "",

          strapMaterial:
            product.specifications
              ?.strapMaterial || "",

          dialColor:
            product.specifications
              ?.dialColor || "",

          waterResistance:
            product.specifications
              ?.waterResistance || "",

          warranty:
            product.specifications
              ?.warranty || "",

          featured:
            product.featured || false,

          isActive:
            product.isActive ?? true,
        });
      } catch (error) {
        console.log(
          "Get product error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [Id]);

  // Handle inputs
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // Generate slug
  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  };

  // Product name
  const handleNameChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,

      name: value,

      slug: generateSlug(value),
    }));
  };

  // Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (!formData.name.trim()) {
      setError(
        "Product name is required."
      );
      return;
    }

    if (!formData.brand.trim()) {
      setError("Brand is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError(
        "Product description is required."
      );
      return;
    }

    if (!formData.category) {
      setError(
        "Please select a category."
      );
      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {
      setError(
        "Please enter a valid price."
      );
      return;
    }

    if (
      formData.discountPrice !== "" &&
      Number(formData.discountPrice) >
        Number(formData.price)
    ) {
      setError(
        "Discount price cannot be greater than regular price."
      );
      return;
    }

    if (formData.stock === "") {
      setError("Stock is required.");
      return;
    }

    if (Number(formData.stock) < 0) {
      setError(
        "Stock cannot be negative."
      );
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("slug", formData.slug);

      data.append(
        "description",
        formData.description
      );

      data.append("brand", formData.brand);

      data.append(
        "category",
        formData.category
      );

      data.append(
        "price",
        formData.price
      );

      if (formData.discountPrice !== "") {
        data.append(
          "discountPrice",
          formData.discountPrice
        );
      }

      data.append(
        "stock",
        formData.stock
      );

      // Specifications
      data.append(
        "movement",
        formData.movement
      );

      data.append(
        "caseMaterial",
        formData.caseMaterial
      );

      data.append(
        "strapMaterial",
        formData.strapMaterial
      );

      data.append(
        "dialColor",
        formData.dialColor
      );

      data.append(
        "waterResistance",
        formData.waterResistance
      );

      data.append(
        "warranty",
        formData.warranty
      );

      // Status
      data.append(
        "featured",
        String(formData.featured)
      );

      data.append(
        "isActive",
        String(formData.isActive)
      );

      const response = await axios.put(
        `/api/admin/products/${Id}`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      setSuccess(
        "Product updated successfully."
      );

      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2
          size={30}
          className="animate-spin"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8">

        {/* Header */}

        <Link
          href="/admin/products"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <h1 className="text-3xl font-semibold">
          Edit Product
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Update your watch product.
        </p>

        {/* Error */}

        {error && (
          <div className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}

        {success && (
          <div className="mt-6 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >
          <div className="space-y-6">

            {/* Product Information */}

            <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold">
                Product Information
              </h2>

              <div className="mt-6 space-y-5">

                {/* Name */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={
                      handleNameChange
                    }
                    className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                  />
                </div>

                {/* Brand */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Brand
                  </label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                  />
                </div>

                {/* Slug */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Slug
                  </label>

                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                  />
                </div>

                {/* Description */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={handleChange}
                    rows={6}
                    className="w-full resize-none border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>

                {/* Category */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Category
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={handleChange}
                    className="h-12 w-full border border-[var(--border)] bg-white px-4 text-sm outline-none focus:border-black"
                  >
                    <option value="">
                      Select category
                    </option>

                    <option value="Men">
                      Men
                    </option>

                    <option value="Women">
                      Women
                    </option>

                    <option value="Luxury">
                      Luxury
                    </option>

                    <option value="Smart">
                      Smart
                    </option>
                  </select>
                </div>

              </div>
            </section>

            {/* Pricing */}

            <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold">
                Pricing & Stock
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Discount Price
                  </label>

                  <input
                    type="number"
                    name="discountPrice"
                    value={
                      formData.discountPrice
                    }
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                  />
                </div>

              </div>
            </section>

            {/* Specifications */}

            <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold">
                Specifications
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                {[
                  [
                    "movement",
                    "Movement",
                  ],
                  [
                    "caseMaterial",
                    "Case Material",
                  ],
                  [
                    "strapMaterial",
                    "Strap Material",
                  ],
                  [
                    "dialColor",
                    "Dial Color",
                  ],
                  [
                    "waterResistance",
                    "Water Resistance",
                  ],
                  [
                    "warranty",
                    "Warranty",
                  ],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="mb-2 block text-sm font-medium">
                      {label}
                    </label>

                    <input
                      type="text"
                      name={name}
                      value={
                        formData[name]
                      }
                      onChange={handleChange}
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />
                  </div>
                ))}

              </div>
            </section>

            {/* Status */}

            <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold">
                Status
              </h2>

              <div className="space-y-5">

                <label className="mt-5 flex cursor-pointer items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">
                      Active Product
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Customers can see this
                      product.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="isActive"
                    checked={
                      formData.isActive
                    }
                    onChange={handleChange}
                    className="h-5 w-5 accent-black"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">
                      Featured Product
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Show this product in
                      featured products.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="featured"
                    checked={
                      formData.featured
                    }
                    onChange={handleChange}
                    className="h-5 w-5 accent-black"
                  />
                </label>

              </div>
            </section>

            {/* Submit */}

            <button
              type="submit"
              disabled={saving}
              className="flex h-12 w-full items-center justify-center gap-2 bg-[var(--primary)] px-5 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Updating Product...
                </>
              ) : (
                "Update Product"
              )}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}