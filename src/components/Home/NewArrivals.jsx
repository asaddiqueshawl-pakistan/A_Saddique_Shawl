import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const newProducts = [
  // {
  //   id: 5,
  //   name: "Apex Chronograph",
  //   slug: "apex-chronograph",
  //   category: "Men's",
  //   price: 14999,
  //   discountPrice: 12999,
  //   discount: 13,
  //   image: "/watches/watch5.jpg",
  // },
  // {
  //   id: 6,
  //   name: "Luna Elegance",
  //   slug: "luna-elegance",
  //   category: "Women's",
  //   price: 10999,
  //   image: "/watches/watch6.jpg",
  // },
  // {
  //   id: 7,
  //   name: "Monarch Gold",
  //   slug: "monarch-gold",
  //   category: "Luxury",
  //   price: 32999,
  //   discountPrice: 28999,
  //   discount: 12,
  //   image: "/watches/watch7.jpg",
  // },
  // {
  //   id: 8,
  //   name: "Pulse Smart X",
  //   slug: "pulse-smart-x",
  //   category: "Smart",
  //   price: 21999,
  //   discountPrice: 18999,
  //   discount: 14,
  //   image: "/watches/watch8.jpg",
  // },
];

export default function NewArrivals() {
  return (
    <section className="bg-[var(--section-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
              Just Arrived
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
              Discover the latest additions to our shawl collection, crafted to bring timeless elegance, luxurious comfort, and sophistication to every occasion.
            </p>
          </div>

          <Link
            href="/shop?sort=newest"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[var(--text-primary)]
              transition
              hover:text-[var(--primary-hover)]
            "
          >
            Explore New Arrivals
            <ArrowUpRight size={17} />
          </Link>

        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}