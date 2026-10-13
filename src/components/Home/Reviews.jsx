import { Quote, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ahmed Khan",
    location: "Lahore",
    rating: 5,
    review:
      "The watch looks even better in person. The quality, packaging, and overall experience were excellent.",
  },
  {
    id: 2,
    name: "Hamza Ali",
    location: "Islamabad",
    rating: 5,
    review:
      "Beautiful design and very comfortable to wear. Delivery was quick and the watch arrived perfectly packed.",
  },
  {
    id: 3,
    name: "Usman Malik",
    location: "Karachi",
    rating: 5,
    review:
      "I was impressed with the quality for the price. Definitely one of the best watch purchases I've made.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
            Customer Stories
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Loved by Watch Enthusiasts
          </h2>

          <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
            Discover what our customers have to say about their Chronova
            experience.
          </p>

        </div>

        {/* Reviews */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">

          {reviews.map((review) => (
            <article
              key={review.id}
              className="
                relative
                border
                border-[var(--border)]
                bg-white
                p-7
                transition
                duration-300
                hover:-translate-y-1
                hover:border-[var(--primary)]
                hover:shadow-md
              "
            >

              {/* Quote */}
              <Quote
                size={34}
                strokeWidth={1}
                className="absolute right-6 top-6 text-[var(--primary)]/40"
              />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill="currentColor"
                    strokeWidth={1.5}
                    className="text-[var(--primary)]"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-7 text-sm leading-7 text-[var(--text-secondary)]">
                "{review.review}"
              </p>

              {/* Customer */}
              <div className="mt-7 border-t border-[var(--border)] pt-5">

                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {review.name}
                </p>

                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {review.location}
                </p>

              </div>

            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
