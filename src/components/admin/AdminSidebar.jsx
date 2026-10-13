"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  X,
  Store,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (href) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-64
          flex-col
          border-r
          border-[var(--border)]
          bg-[var(--background)]
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-[var(--border)] px-6">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <Store size={22} />

            <span className="text-lg font-bold tracking-[0.18em]">
              CHRONOVA
            </span>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    text-sm
                    font-medium
                    transition
                    ${
                      active
                        ? "bg-[var(--primary)] text-black"
                        : "text-[var(--text-primary)] hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-[var(--border)] p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:bg-gray-100"
          >
            <LogOut size={19} strokeWidth={1.8} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}