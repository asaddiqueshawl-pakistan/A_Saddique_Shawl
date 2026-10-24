// // "use client";
// // import Link from "next/link";
// // import ProductCard from "@/components/ProductCard";
// // import Navbar from "@/components/Navbar";
// // import Footer from "@/components/Footer";

// // async function getProducts() {
// //   try {
// //     const response = await fetch(
// //       `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/products`,
// //       {
// //         cache: "no-store",
// //       }
// //     );

// //     if (!response.ok) {
// //       throw new Error("Failed to fetch products");
// //     }

// //     const data = await response.json();

// //     return data.products || [];
// //   } catch (error) {
// //     console.error("Shop products error:", error);
// //     return [];
// //   }
// // }

// // export default async function ShopPage() {
// //   const products = await getProducts();


// //   return (
// //     <main className="min-h-screen bg-[var(--background)]">
// //     <Navbar/>

// //       {/* Header */}
// //       <section className="border-b border-[var(--border)] bg-[var(--section-bg)]">
// //         <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

// //           <p className="text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
// //             Our Collection
// //           </p>

// //           <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
// //             Shawls Shop
// //           </h1>

// //           <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
// //             Explore our collection of carefully selected timepieces designed
// //             for every style and occasion.
// //           </p>

// //         </div>
// //       </section>

// //       {/* Products */}
// //       <section>
// //         <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

// //           {/* Top bar */}
// //           <div className="mb-8 flex items-center justify-between border-b border-[var(--border)] pb-5">

// //             <p className="text-sm text-[var(--text-secondary)]">
// //               {products.length}{" "}
// //               {products.length === 1 ? "Shawl" : "Shawls"}
// //             </p>

// //             <select
// //               defaultValue="newest"
// //               className="
// //                 border
// //                 border-[var(--border)]
// //                 bg-white
// //                 px-4
// //                 py-2.5
// //                 text-sm
// //                 text-[var(--text-primary)]
// //                 outline-none
// //                 focus:border-[var(--primary)]
// //               "
// //             >
// //               <option value="newest">Newest</option>
// //               <option value="price-low">Price: Low to High</option>
// //               <option value="price-high">Price: High to Low</option>
// //             </select>

// //           </div>

// //           {/* Product grid */}
// //           {products.length > 0 ? (
// //             <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
// //               {products.map((product) => (
// //                 <ProductCard
// //                   key={product._id}
// //                   product={{
// //                     ...product,
// //                     image: product.images?.[0]?.url,
// //                   }}
// //                 />
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="py-24 text-center">

// //               <h2 className="text-xl font-semibold text-[var(--text-primary)]">
// //                 No Shawls available
// //               </h2>

// //               <p className="mt-2 text-sm text-[var(--text-secondary)]">
// //                 Check back soon for new arrivals.
// //               </p>

// //               <Link
// //                 href="/"
// //                 className="
// //                   mt-6
// //                   inline-flex
// //                   bg-[var(--primary)]
// //                   px-6
// //                   py-3
// //                   text-sm
// //                   font-semibold
// //                   text-black
// //                   transition
// //                   hover:bg-[var(--primary-hover)]
// //                 "
// //               >
// //                 Back to Home
// //               </Link>

// //             </div>
// //           )}

// //         </div>
// //       </section>

// //       <Footer/>

// //     </main>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import ProductCard from "@/components/ProductCard";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useSearchParams } from "next/navigation";

// export default function ShopPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortBy, setSortBy] = useState("newest");
//   const [error, setError] = useState("");

//   const params = useSearchParams();
//   const searchParams = params.get("category");

//   const category = searchParams
//     ? searchParams.charAt(0).toUpperCase() + searchParams.slice(1)
//     : "";


//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         let response;

//         if (searchParams) {
//           // Get products by category
//           response = await axios.get("/api/products/category", {
//             params: {
//               category: searchParams,
//             },
//           });
//         } else {
//           // Get all products
//           response = await axios.get("/api/products");
//         }

//         setProducts(response.data.products || []);
//       } catch (error) {
//         console.error(
//           "Products error:",
//           error.response?.data || error.message
//         );

//         setError("Unable to load shawls. Please try again.");
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProducts();
//   }, [searchParams]);



//   // useEffect(() => {
//   //   const getProducts = async () => {
//   //     try {
//   //       setLoading(true);
//   //       setError("");

//   //       const response = await axios.get("/api/products", {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       });

//   //       setProducts(response.data.products || []);
//   //     } catch (error) {
//   //       console.error(
//   //         "Shop products error:",
//   //         error.response?.data || error.message
//   //       );

//   //       setError("Unable to load shawls. Please try again.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   const getProductsByCategory = async (category) => {
//   //     try {
//   //       const response = await axios.get(
//   //         "/api/products/category",
//   //         {
//   //           params: {
//   //             category: category,
//   //           },
//   //         }
//   //       );

//   //       console.log(response.data.products);
//   //     } catch (error) {
//   //       console.error(
//   //         error.response?.data?.message || error.message
//   //       );
//   //     }
//   //   };


//   //   if (category !== "") {
//   //     getProducts();
//   //   } else {
//   //     getProductsByCategory(category);
//   //   }


//   // }, []);

//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortBy === "price-low") {
//       return Number(a.price) - Number(b.price);
//     }

//     if (sortBy === "price-high") {
//       return Number(b.price) - Number(a.price);
//     }

//     return (
//       new Date(b.createdAt || 0).getTime() -
//       new Date(a.createdAt || 0).getTime()
//     );
//   });

//   return (
//     <main className="min-h-screen bg-[var(--background)]">
//       <Navbar />

//       <section className="border-b border-[var(--border)] bg-[var(--section-bg)]">
//         <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
//           <p className="text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
//             Our Collection
//           </p>

//           <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
//             Shawls Shop
//           </h1>

//           <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
//             Discover beautiful Kashmiri and Pashmina shawls,
//             carefully selected for warmth, elegance, and timeless style.
//           </p>
//         </div>
//       </section>

//       <section>
//         <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
//           <div className="mb-8 flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="text-xl font-semibold text-[var(--text-primary)]">
//                 All Shawls
//               </h2>

//               <p className="mt-1 text-sm text-[var(--text-secondary)]">
//                 {loading
//                   ? "Loading collection..."
//                   : `${sortedProducts.length} ${sortedProducts.length === 1 ? "shawl" : "shawls"
//                   } available`}
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <label
//                 htmlFor="sort"
//                 className="text-sm text-[var(--text-secondary)]"
//               >
//                 Sort by:
//               </label>

//               <select
//                 id="sort"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)]"
//               >
//                 <option value="newest">Newest</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//               </select>
//             </div>
//           </div>

//           {loading && (
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <div key={index} className="animate-pulse">
//                   <div className="aspect-[3/4] bg-gray-200" />
//                   <div className="mt-4 h-4 w-3/4 bg-gray-200" />
//                   <div className="mt-3 h-4 w-1/3 bg-gray-200" />
//                 </div>
//               ))}
//             </div>
//           )}

//           {!loading && error && (
//             <div className="py-20 text-center">
//               <p className="text-sm text-red-600">{error}</p>

//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-5 bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-black hover:bg-[var(--primary-hover)]"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}

//           {!loading && !error && sortedProducts.length > 0 && (
//             <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
//               {sortedProducts.map((product) => (
//                 <ProductCard
//                   key={product._id}
//                   product={{
//                     ...product,
//                     image:
//                       product.images?.[0]?.url ||
//                       product.image ||
//                       "",
//                   }}
//                 />
//               ))}
//             </div>
//           )}

//           {!loading && !error && sortedProducts.length === 0 && (
//             <div className="py-24 text-center">
//               <h2 className="text-xl font-semibold text-[var(--text-primary)]">
//                 No Shawls Available
//               </h2>

//               <p className="mt-3 text-sm text-[var(--text-secondary)]">
//                 Check back soon for new arrivals.
//               </p>

//               <Link
//                 href="/"
//                 className="mt-6 inline-flex bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-black hover:bg-[var(--primary-hover)]"
//               >
//                 Back to Home
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }



"use client";

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";

function ShopContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [error, setError] = useState("");

  const params = useSearchParams();
  const searchParams = params.get("category");

  useEffect(() => {
    let cancelled = false;

    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let response;

        if (searchParams) {
          response = await axios.get("/api/products/category", {
            params: { category: searchParams },
          });
        } else {
          response = await axios.get("/api/products");
        }

        if (!cancelled) {
          setProducts(response.data.products || []);
        }
      } catch (error) {
        console.error(
          "Products error:",
          error.response?.data || error.message
        );

        if (!cancelled) {
          setError("Unable to load shawls. Please try again.");
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") {
      return Number(a.price) - Number(b.price);
    }

    if (sortBy === "price-high") {
      return Number(b.price) - Number(a.price);
    }

    return (
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
    );
  });

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <section className="border-b border-[var(--border)] bg-[var(--section-bg)]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[var(--primary-hover)]">
            Our Collection
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Shawls Shop
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            Discover beautiful Kashmiri and Pashmina shawls,
            carefully selected for warmth, elegance, and timeless style.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                {searchParams
                  ? `${searchParams.charAt(0).toUpperCase()}${searchParams.slice(1)} Shawls`
                  : "All Shawls"}
              </h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {loading
                  ? "Loading collection..."
                  : `${sortedProducts.length} ${
                      sortedProducts.length === 1 ? "shawl" : "shawls"
                    } available`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="sort"
                className="text-sm text-[var(--text-secondary)]"
              >
                Sort by:
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)]"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200" />
                  <div className="mt-4 h-4 w-3/4 bg-gray-200" />
                  <div className="mt-3 h-4 w-1/3 bg-gray-200" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="py-20 text-center">
              <p className="text-sm text-red-600">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-5 bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-black hover:bg-[var(--primary-hover)]"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && sortedProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    ...product,
                    image:
                      product.images?.[0]?.url ||
                      product.image ||
                      "",
                  }}
                />
              ))}
            </div>
          )}

          {!loading && !error && sortedProducts.length === 0 && (
            <div className="py-24 text-center">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                No Shawls Available
              </h2>

              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                Check back soon for new arrivals.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-black hover:bg-[var(--primary-hover)]"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[var(--background)]" />
      }
    >
      <ShopContent />
    </Suspense>
  );
}
