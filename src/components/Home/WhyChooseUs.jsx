import {
  Award,
  Clock3,
  ShieldCheck,
  Truck,
} from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Every shawl is carefully selected for its quality, softness, and beautiful craftsmanship.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Shop with confidence with shawls chosen to meet our quality standards.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Reliable delivery to your doorstep with every shawl carefully packaged.",
  },
  {
    icon: Clock3,
    title: "Timeless Elegance",
    description:
      "Beautiful shawls designed to bring warmth, comfort, and elegance to every occasion.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
            The A Saddique Difference
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Designed Around You
          </h2>

          <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
            From the moment you discover your perfect shawl to the moment it arrives at your doorstep, we focus on premium quality, timeless elegance, and a beautiful shopping experience.
          </p>

        </div>

        {/* Benefits */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="
                  group
                  border
                  border-[var(--border)]
                  bg-white
                  p-7
                  text-center
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-[var(--primary)]
                  hover:shadow-md
                "
              >

                {/* Icon */}
                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    border
                    border-[var(--border)]
                    bg-[var(--section-bg)]
                    text-[var(--primary-hover)]
                    transition
                    duration-300
                    group-hover:border-[var(--primary)]
                    group-hover:bg-[var(--primary)]
                    group-hover:text-black
                  "
                >
                  <Icon size={25} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-base font-semibold text-[var(--text-primary)]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {benefit.description}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}