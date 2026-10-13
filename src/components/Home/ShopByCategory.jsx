import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "Men's Shawls",
    description: "Timeless designs that bring confidence and elegance to every occasion.",
    href: "/shop?category=men",
  },
  {
    title: "Women's Shawls",
    description: "Elegant styles crafted to add beauty, warmth, and grace to your look.",
    href: "/shop?category=women",
  },
  {
    title: "Luxury Shawls",
    description: "Premium fabrics and exceptional craftsmanship for a truly luxurious feel.",
    href: "/shop?category=luxury",
  },
  {
    title: "Smart Shawls",
    description: "Modern designs that blend everyday comfort with contemporary style.",
    href: "/shop?category=smart",
  },
];

export default function ShopByCategory() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--section-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
              Collections
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Shop by Category
            </h2>
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
            View All Shawls
            <ArrowUpRight size={17} />
          </Link>

        </div>

        {/* Categories */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              // onClick={() => categoryName => ()}
              className="
                group
                relative
                min-h-[320px]
                overflow-hidden
                border
                border-[var(--border)]
                bg-white
                p-7
                transition
                duration-300
                hover:-translate-y-1
                hover:border-[var(--primary)]
                hover:shadow-lg
              "
            >

              {/* Decorative circle */}
              <div
                className="
                  absolute
                  -right-16
                  -top-16
                  h-48
                  w-48
                  rounded-full
                  border
                  border-[var(--border)]
                  transition
                  duration-500
                  group-hover:scale-125
                  group-hover:border-[var(--primary)]
                "
              />

              <div
                className="
                  absolute
                  -right-5
                  -top-5
                  h-28
                  w-28
                  rounded-full
                  bg-[var(--section-bg)]
                  transition
                  duration-500
                  group-hover:scale-110
                "
              />

              {/* Number */}
              <span className="relative text-xs font-medium tracking-widest text-[var(--text-secondary)]">
                0{categories.indexOf(category) + 1}
              </span>

              {/* Content */}
              <div className="absolute bottom-7 left-7 right-7">

                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  {category.title}
                </h3>

                <p className="mt-2 max-w-[220px] text-sm leading-6 text-[var(--text-secondary)]">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] transition group-hover:text-[var(--primary-hover)]">
                  Explore
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}