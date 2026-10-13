import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  // {
  //   id: 1,
  //   name: "Classic Chronograph",
  //   slug: "classic-chronograph",
  //   category: "Men's",
  //   price: 12500,
  //   discountPrice: 9999,
  //   discount: 20,
  //   image: "/watches/watch1.png",
  // },
  // {
  //   id: 2,
  //   name: "Élan Classic",
  //   slug: "elan-classic",
  //   category: "Women's",
  //   price: 9500,
  //   discountPrice: 7999,
  //   discount: 16,
  //   image: "/watches/watch2.png",
  // },
  // {
  //   id: 3,
  //   name: "Prestige Automatic",
  //   slug: "prestige-automatic",
  //   category: "Luxury",
  //   price: 28500,
  //   image: "/watches/watch3.jpg",
  // },
  // {
  //   id: 4,
  //   name: "Urban Smart Pro",
  //   slug: "urban-smart-pro",
  //   category: "Smart",
  //   price: 18999,
  //   discountPrice: 15999,
  //   discount: 15,
  //   image: "/watches/watch4.jpg",
  // },
];

export default function FeaturedWatches() {
  return (
    <section className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
              Curated For You
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Featured Shawls
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
              Explore our most-loved shawls, thoughtfully selected for their timeless elegance, luxurious softness, and exceptional craftsmanship.
            </p>
          </div>

          <Link
            href="/shop"
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
            View All
            <ArrowUpRight size={17} />
          </Link>

        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}