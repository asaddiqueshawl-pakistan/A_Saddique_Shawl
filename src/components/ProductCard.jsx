import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  console.log("this is from porduct card",product)
  return (
    <article className="group">

      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden border border-[var(--border)] bg-[var(--section-bg)]">

        {/* <Link href={`/product/${product.slug}`} className="block h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link> */}
        <div className="relative aspect-[4/5] overflow-hidden border border-[var(--border)] bg-[var(--section-bg)]">
          <Link
            href={`/product/${product.slug}`}
            className="relative block h-full w-full"
          >
            <Image
              src={product.images?.[0].url}
              alt={product.name}
              fill
              className="object-cover rounded-md transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          {/* rest of your buttons/badges */}
        </div>

        {/* Discount */}
        {product.discount && (
          <span className="absolute left-3 top-3 bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-black">
            {product.discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        {/* <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white
            text-[var(--text-primary)]
            shadow-sm
            transition
            hover:bg-[var(--primary)]
          "
        >
          <Heart size={17} strokeWidth={1.7} />
        </button> */}

        {/* Add to Cart */}
        {/* <button
          type="button"
          className="
            absolute
            bottom-3
            left-3
            right-3
            flex
            translate-y-2
            items-center
            justify-center
            gap-2
            bg-white
            py-3
            text-sm
            font-medium
            text-[var(--text-primary)]
            opacity-0
            shadow-sm
            transition
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
            hover:bg-[var(--primary)]
          "
        >
          <ShoppingBag size={17} />
          Add to Cart
        </button> */}

      </div>

      {/* Product Information */}
      <div className="pt-4">

        <p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
          {product.category}
        </p>

        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 text-base font-medium text-[var(--text-primary)] transition hover:text-[var(--primary-hover)]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">

          {product.discountPrice ? (
            <>
              <span className="font-semibold text-[var(--text-primary)]">
                Rs. {product.discountPrice.toLocaleString()}
              </span>

              <span className="text-sm text-[var(--text-secondary)] line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-semibold text-[var(--text-primary)]">
              Rs. {product.price.toLocaleString()}
            </span>
          )}

        </div>

      </div>
    </article>
  );
}