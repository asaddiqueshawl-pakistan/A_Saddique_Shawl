"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart, ShieldCheck, Truck } from "lucide-react";
import ProductActions from "@/components/Product/ProductActions";
import axios from "axios";

/* =========================================================
GET PRODUCT
========================================================= */

async function getProduct(slug) {
  console.log(slug);

  try {
    const response = await axios.get(`/api/products/slug/${slug}`);

    const data = response.data;

    console.log(data);

    return data.product;
  } catch (error) {
    console.error(
      "Product fetch error:",
      error.response?.data || error.message
    );

    return null;
  }
}

/* =========================================================
PRODUCT PAGE
========================================================= */

export default function ProductPage({ params }) {
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

// Selected product image
const [selectedImage, setSelectedImage] = useState(0);

/* =========================================================
LOAD PRODUCT
========================================================= */

useEffect(() => {
const loadProduct = async () => {
try {
const { slug } = await params;

    const data = await getProduct(slug);
    console.log(data)

    setProduct(data);

    // Reset image when product changes
    setSelectedImage(0);
  } catch (error) {
    console.error("Product loading error:", error);
  } finally {
    setLoading(false);
  }
};

loadProduct();

}, [params]);

/* =========================================================
LOADING
========================================================= */

if (loading) {
return ( <main className="flex min-h-screen items-center justify-center bg-[var(--background)]"> <p className="text-sm text-[var(--text-secondary)]">
Loading product... </p> </main>
);
}

/* =========================================================
PRODUCT NOT FOUND
========================================================= */

if (!product) {
return ( <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5">

```
    <div className="text-center">

      <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
        Product not found
      </h1>

      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        The watch you're looking for doesn't exist.
      </p>

      <Link
        href="/shop"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          bg-[var(--primary)]
          px-6
          py-3
          text-sm
          font-semibold
          text-black
          transition
          hover:bg-[var(--primary-hover)]
        "
      >
        <ArrowLeft size={17} />
        Back to Shop
      </Link>

    </div>

  </main>
);

}

/* =========================================================
PRODUCT DATA
========================================================= */

const images = product.images || [];

const hasDiscount =
product.discountPrice &&
product.discountPrice < product.price;

const currentImage =
images[selectedImage]?.url || images[0]?.url;

/* =========================================================
PAGE
========================================================= */

return ( <main className="min-h-screen bg-[var(--background)]">

  {/* =====================================================
      BREADCRUMB
  ===================================================== */}

  <div className="border-b border-[var(--border)]">

    <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">

      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">

        <Link
          href="/"
          className="transition hover:text-[var(--primary-hover)]"
        >
          Home
        </Link>

        <span>/</span>

        <Link
          href="/shop"
          className="transition hover:text-[var(--primary-hover)]"
        >
          Shop
        </Link>

        <span>/</span>

        <span className="text-[var(--text-primary)]">
          {product.name}
        </span>

      </div>

    </div>

  </div>


  {/* =====================================================
      PRODUCT
  ===================================================== */}

  <section>

    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">


        {/* =================================================
            PRODUCT IMAGES
        ================================================= */}

        <div className="w-full">

          {/* ================= MAIN IMAGE ================= */}

          <div className="relative aspect-square overflow-hidden border border-[var(--border)] bg-[var(--section-bg)]">

            {currentImage ? (

              <>

                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />


                {/* SALE BADGE */}

                {hasDiscount && (
                  <span className="absolute left-4 top-4 z-10 bg-[var(--primary)] px-3 py-1.5 text-xs font-semibold text-black">
                    SALE
                  </span>
                )}

              </>

            ) : (

              <div className="flex h-full items-center justify-center text-sm text-[var(--text-secondary)]">
                No image available
              </div>

            )}

          </div>


          {/* =================================================
              THUMBNAILS
          ================================================= */}

          {images.length > 1 && (

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

              {images.map((img, index) => (

                <button
                  key={img._id || index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  className={`
                    relative
                    h-20
                    w-20
                    shrink-0
                    overflow-hidden
                    bg-[var(--section-bg)]
                    transition
                    ${
                      selectedImage === index
                        ? "border-2 border-[var(--primary)]"
                        : "border border-[var(--border)] hover:border-[var(--primary)]"
                    }
                  `}
                >

                  <Image
                    src={img.url}
                    alt={`${product.name} image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />

                </button>

              ))}

            </div>

          )}

        </div>


        {/* =================================================
            PRODUCT DETAILS
        ================================================= */}

        <div className="flex flex-col justify-center">


          {/* BRAND */}

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary-hover)]">
            {product.brand}
          </p>


          {/* PRODUCT NAME */}

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {product.name}
          </h1>


          {/* PRICE */}

          <div className="mt-6 flex items-center gap-3">

            <span className="text-2xl font-semibold text-[var(--text-primary)]">

              Rs.{" "}

              {(hasDiscount
                ? product.discountPrice
                : product.price
              ).toLocaleString()}

            </span>


            {hasDiscount && (

              <span className="text-base text-[var(--text-secondary)] line-through">

                Rs. {product.price.toLocaleString()}

              </span>

            )}

          </div>


          {/* DESCRIPTION */}

          <p className="mt-7 text-sm leading-7 text-[var(--text-secondary)]">
            {product.description}
          </p>


          {/* STOCK */}

          <div className="mt-6">

            {product.stock > 0 ? (

              <p className="text-sm font-medium text-green-600">
                In Stock
              </p>

            ) : (

              <p className="text-sm font-medium text-red-500">
                Out of Stock
              </p>

            )}

          </div>


          {/* PRODUCT ACTIONS */}

          <ProductActions product={product} selectedImage={selectedImage} />


          {/* =================================================
              BENEFITS
          ================================================= */}

          <div className="mt-8 border-t border-[var(--border)] pt-7">

            <div className="grid gap-5 sm:grid-cols-2">


              {/* DELIVERY */}

              <div className="flex gap-3">

                <Truck
                  size={21}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--primary-hover)]"
                />

                <div>

                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Fast Delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                    Reliable delivery to your doorstep.
                  </p>

                </div>

              </div>


              {/* WARRANTY */}

              <div className="flex gap-3">

                <ShieldCheck
                  size={21}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--primary-hover)]"
                />

                <div>

                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    1 Year Warranty
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                    Shop with confidence.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          SPECIFICATIONS
      ===================================================== */}

      <div className="mt-20 border-t border-[var(--border)] pt-12">

        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Specifications
        </h2>


        <div className="mt-7 grid border-l border-t border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">

          {[
            ["Movement", product.specifications?.movement],
            ["Case Material", product.specifications?.caseMaterial],
            ["Strap Material", product.specifications?.strapMaterial],
            ["Dial Color", product.specifications?.dialColor],
            ["Water Resistance", product.specifications?.waterResistance],
            ["Warranty", product.specifications?.warranty],
          ].map(([label, value]) => (

            <div
              key={label}
              className="border-b border-r border-[var(--border)] p-5"
            >

              <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                {label}
              </p>

              <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                {value || "—"}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  </section>

</main>
);
}
