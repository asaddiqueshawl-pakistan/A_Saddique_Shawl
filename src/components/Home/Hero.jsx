import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)]">
      <div className="relative sm:h-[85vh] h-[30vh] w-[100vw]">
        <Image
          src="/banners/a_saddique.jpg"
          alt="Image"
          fill
          className="object-fit"
        />
      </div>

    </section>
  );
}




// <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">

//       {/* Content */}
//       <div className="max-w-xl">

//         <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary-hover)]">
//           Premium Timepieces
//         </p>

//         <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
//           Time,
//           <br />
//           <span className="font-normal">refined.</span>
//         </h1>

//         <p className="mt-7 max-w-lg text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
//           Discover thoughtfully designed watches that combine timeless
//           elegance, precision, and modern craftsmanship.
//         </p>

//         {/* Buttons */}
//         <div className="mt-9 flex flex-wrap items-center gap-4">

//           <Link
//             href="/shop"
//             className="
//               inline-flex
//               items-center
//               gap-2
//               bg-[var(--primary)]
//               px-7
//               py-4
//               text-sm
//               font-semibold
//               text-black
//               transition
//               hover:bg-[var(--primary-hover)]
//             "
//           >
//             Shop Collection
//             <ArrowRight size={17} />
//           </Link>

//           <Link
//             href="/shop?category=luxury"
//             className="
//               border
//               border-[var(--border)]
//               px-7
//               py-4
//               text-sm
//               font-semibold
//               text-[var(--text-primary)]
//               transition
//               hover:border-[var(--primary)]
//               hover:text-[var(--primary-hover)]
//             "
//           >
//             Explore Luxury
//           </Link>

//         </div>

//         {/* Trust points */}
//         <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--border)] pt-6">

//           <div>
//             <p className="text-lg font-semibold text-[var(--text-primary)]">
//               100%
//             </p>
//             <p className="mt-1 text-xs text-[var(--text-secondary)]">
//               Authentic Products
//             </p>
//           </div>

//           <div>
//             <p className="text-lg font-semibold text-[var(--text-primary)]">
//               1 Year
//             </p>
//             <p className="mt-1 text-xs text-[var(--text-secondary)]">
//               Warranty
//             </p>
//           </div>

//           <div>
//             <p className="text-lg font-semibold text-[var(--text-primary)]">
//               Fast
//             </p>
//             <p className="mt-1 text-xs text-[var(--text-secondary)]">
//               Nationwide Delivery
//             </p>
//           </div>

//         </div>
//       </div>
//       {/* Watch Image */}
//       <div className="relative flex min-h-[450px] items-center justify-center lg:min-h-[600px]">

//         {/* Background circle */}
//         <div className="absolute h-[350px] w-[350px] rounded-full bg-[var(--section-bg)] sm:h-[450px] sm:w-[450px] lg:h-[520px] lg:w-[520px]" />

//         {/* Gold accent */}
//         <div className="absolute right-[10%] top-[10%] h-24 w-24 rounded-full border border-[var(--primary)] opacity-40" />

//         {/* Image placeholder */}
//         <div className="relative z-10 flex h-[360px] w-[260px] items-center justify-center border border-[var(--border)] bg-white shadow-xl sm:h-[430px] sm:w-[310px]">

//           <div className="text-center">
//             <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
//               Chronova
//             </p>

//             <p className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">
//               WATCH
//             </p>

//             <p className="mt-2 text-xs text-[var(--text-secondary)]">
//               Image coming soon
//             </p>
//           </div>

//         </div>

//       </div>
//     </div>