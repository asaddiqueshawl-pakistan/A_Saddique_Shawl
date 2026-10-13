import { ArrowRight, Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--section-bg)]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-3xl text-center">

          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--primary-hover)]">
            <Mail size={22} strokeWidth={1.5} />
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
            Stay in the Loop
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Get the latest from Chronova
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
            Subscribe to receive updates about new arrivals, exclusive offers,
            and special collections.
          </p>

          {/* Form */}
          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email address"
                className="
                  h-14
                  w-full
                  border
                  border-[var(--border)]
                  bg-white
                  px-5
                  pr-5
                  text-sm
                  text-[var(--text-primary)]
                  outline-none
                  placeholder:text-[var(--text-secondary)]
                  focus:border-[var(--primary)]
                "
              />
            </div>

            <button
              type="submit"
              className="
                inline-flex
                h-14
                items-center
                justify-center
                gap-2
                bg-[var(--primary)]
                px-7
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-[var(--primary-hover)]
              "
            >
              Subscribe
              <ArrowRight size={17} />
            </button>

          </form>

          <p className="mt-4 text-xs text-[var(--text-secondary)]">
            By subscribing, you agree to receive emails from Chronova.
          </p>

        </div>
      </div>
    </section>
  );
}