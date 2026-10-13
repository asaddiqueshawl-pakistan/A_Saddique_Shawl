import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const shopLinks = [
  { label: "All Shawls", href: "/shop" },
  { label: "Men's Shawls", href: "/shop?category=men" },
  { label: "Women's Shawls", href: "/shop?category=women" },
  { label: "Luxury Shawls", href: "/shop?category=luxury" },
  { label: "Smart Shawls", href: "/shop?category=smart" },
];

const customerLinks = [
  { label: "My Account", href: "/account" },
  { label: "My Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Return Policy", href: "/return-policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--text-primary)] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="text-2xl font-bold tracking-[0.25em]"
            >
              A Saddique Shawl
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Timeless shawls for every occasion. Discover beautifully crafted shawls designed to complement your style with elegance, warmth, and luxury.
            </p>

            {/* Contact */}
            <div className="mt-7 space-y-4">

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={17} strokeWidth={1.5} />
                <span>support@chronova.com</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={17} strokeWidth={1.5} />
                <span>+92 300 1234567</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin size={17} strokeWidth={1.5} />
                <span>Lahore, Pakistan</span>
              </div>

            </div>

            {/* Social */}
            <div className="mt-7 flex items-center gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  border
                  border-gray-700
                  text-gray-400
                  transition
                  hover:border-[var(--primary)]
                  hover:bg-[var(--primary)]
                  hover:text-black
                "
              >
                <FaFacebookF size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  border
                  border-gray-700
                  text-gray-400
                  transition
                  hover:border-[var(--primary)]
                  hover:bg-[var(--primary)]
                  hover:text-black
                "
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  border
                  border-gray-700
                  text-gray-400
                  transition
                  hover:border-[var(--primary)]
                  hover:bg-[var(--primary)]
                  hover:text-black
                "
              >
                <FaXTwitter size={17} />
              </a>

            </div>

          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>

            <ul className="mt-6 space-y-4">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-[var(--primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Customer
            </h3>

            <ul className="mt-6 space-y-4">
              {customerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-[var(--primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="mt-6 space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-[var(--primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Chronova. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Crafted with precision.
          </p>

        </div>
      </div>

    </footer>
  );
}