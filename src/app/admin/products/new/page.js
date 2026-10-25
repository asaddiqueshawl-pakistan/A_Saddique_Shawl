"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


import {
  ArrowLeft,
  ImagePlus,
  X,
  Loader2,
} from "lucide-react";
import axios from "axios";

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
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

  const [images, setImages] = useState([]);

  // Normal inputs
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

  // Select images
  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(
      e.target.files || []
    );

    if (!selectedFiles.length) return;

    setImages((prev) => [
      ...prev,
      ...selectedFiles,
    ]);

    e.target.value = "";
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (!formData.name.trim()) {
      setError("Product name is required.");
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
        "Please enter a valid product price."
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

    if (images.length === 0) {
      setError(
        "Please select at least one image."
      );
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // Basic information
      data.append(
        "name",
        formData.name
      );

      data.append(
        "slug",
        formData.slug
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "brand",
        formData.brand
      );

      data.append(
        "category",
        formData.category
      );

      // Pricing
      data.append(
        "price",
        formData.price
      );

      if (formData.discountPrice) {
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

      // Images
      images.forEach((image) => {
        data.append(
          "images",
          image
        );
      });

      const response = await fetch(
        "/api/products",
        {
          method: "POST",
          body: data,
          credentials: "include",
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
          "Failed to create product."
        );
      }

      setSuccess(
        "Product created successfully."
      );

      setTimeout(() => {
        router.push(
          "/admin/products"
        );

        router.refresh();
      }, 800);
    } catch (error) {
      console.error(
        "Create product error:",
        error
      );

      setError(
        error.message ||
        "Something went wrong while creating the product."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin/products"
              className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Link>

            <h1 className="text-3xl font-semibold">
              Add Product
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Add a new watch to your store.
            </p>
          </div>
        </div>

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
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

            {/* Main Information */}
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
                      placeholder="e.g. Chronova Classic"
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
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. Rolex"
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
                      onChange={
                        handleChange
                      }
                      placeholder="chronova-classic"
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                      This will be used in the product URL.
                    </p>
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
                      onChange={
                        handleChange
                      }
                      rows={6}
                      placeholder="Write product description..."
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
                      onChange={
                        handleChange
                      }
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

                  {/* Price */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      value={
                        formData.price
                      }
                      onChange={
                        handleChange
                      }
                      min="0"
                      step="0.01"
                      placeholder="25000"
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />
                  </div>

                  {/* Discount */}
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
                      onChange={
                        handleChange
                      }
                      min="0"
                      step="0.01"
                      placeholder="22000"
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stock"
                      value={
                        formData.stock
                      }
                      onChange={
                        handleChange
                      }
                      min="0"
                      step="1"
                      placeholder="10"
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

                  {/* Movement */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Made By
                    </label>

                    <input
                      type="text"
                      name="movement"
                      value={
                        formData.movement
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. Automatic"
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />
                  </div>

                  {/* Case Material */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Wool Type
                    </label>

                    <input
                      type="text"
                      name="caseMaterial"
                      value={
                        formData.caseMaterial
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. Stainless Steel"
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />
                  </div>

                  {/* Strap Material */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Gurantee
                    </label>

                    <input
                      type="text"
                      name="strapMaterial"
                      value={
                        formData.strapMaterial
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. Leather"
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />
                  </div>

                  {/* Dial Color */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Color
                    </label>

                    <input
                      type="text"
                      name="dialColor"
                      value={
                        formData.dialColor
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. Black"
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />
                  </div>

                  {/* Water Resistance */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Weight
                    </label>

                    <input
                      type="text"
                      name="waterResistance"
                      value={
                        formData.waterResistance
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. 50M"
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />
                  </div>

                  {/* Warranty */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Warranty
                    </label>

                    <input
                      type="text"
                      name="warranty"
                      value={
                        formData.warranty
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. 2 Years"
                      className="h-12 w-full border border-[var(--border)] px-4 text-sm outline-none focus:border-black"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Right Side */}
            <div className="space-y-6">

              {/* Images */}
              <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
                <h2 className="text-lg font-semibold">
                  Product Images
                </h2>

                <p className="mt-2 text-xs text-gray-500">
                  Add one or more product images.
                </p>

                {/* Upload */}
                <label
                  htmlFor="product-images"
                  className="mt-5 flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[var(--border)] px-5 py-8 text-center transition hover:bg-gray-50"
                >
                  <ImagePlus
                    size={30}
                    className="text-gray-400"
                  />

                  <span className="mt-3 text-sm font-medium">
                    Click to upload images
                  </span>

                  <span className="mt-1 text-xs text-gray-500">
                    PNG, JPG, JPEG, WEBP
                  </span>

                  <input
                    id="product-images"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    multiple
                    onChange={
                      handleImagesChange
                    }
                    className="hidden"
                  />
                </label>

                {/* Preview */}
                {images.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {images.map(
                      (
                        image,
                        index
                      ) => (
                        <div
                          key={`${image.name}-${index}`}
                          className="relative aspect-square overflow-hidden bg-gray-100"
                        >
                          <img
                            src={URL.createObjectURL(
                              image
                            )}
                            alt={`Product image ${index + 1
                              }`}
                            className="h-full w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeImage(
                                index
                              )
                            }
                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white"
                            aria-label="Remove image"
                          >
                            <X
                              size={15}
                            />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </section>

              {/* Status */}
              <section className="border border-[var(--border)] bg-white p-5 sm:p-6">
                <h2 className="text-lg font-semibold">
                  Status
                </h2>

                {/* Active */}
                <label className="mt-5 flex cursor-pointer items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">
                      Active Product
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Customers can see this product.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="isActive"
                    checked={
                      formData.isActive
                    }
                    onChange={
                      handleChange
                    }
                    className="h-5 w-5 accent-black"
                  />
                </label>

                {/* Featured */}
                <label className="mt-5 flex cursor-pointer items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">
                      Featured Product
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Show this product in featured products.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="featured"
                    checked={
                      formData.featured
                    }
                    onChange={
                      handleChange
                    }
                    className="h-5 w-5 accent-black"
                  />
                </label>
              </section>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 bg-[var(--primary)] px-5 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Creating Product...
                  </>
                ) : (
                  "Create Product"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}