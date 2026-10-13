import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="bg-[var(--section-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">

        <div className="relative overflow-hidden border border-[var(--border)] bg-[var(--text-primary)] px-7 py-14 sm:px-12 lg:px-16 lg:py-20">

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

          <div className="absolute -bottom-32 right-20 h-80 w-80 rounded-full border border-[var(--primary)]/20" />

          <div className="absolute right-10 top-10 h-20 w-20 rounded-full border border-[var(--primary)]/40" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">

            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
              Make Every Second Count
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Your time.
              <br />
              <span className="font-normal text-gray-300">
                Your statement.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
              Find a timepiece that reflects your personality. Explore our
              curated collection of watches designed for those who value
              timeless style.
            </p>

            <Link
              href="/shop"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                bg-[var(--primary)]
                px-7
                py-4
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-[var(--primary-hover)]
              "
            >
              Explore Collection
              <ArrowRight size={17} />
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}