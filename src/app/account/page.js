"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Mail,
  Phone,
  Package,
  LogOut,
  ArrowRight,
} from "lucide-react";

export default function AccountPage() {
  const {
    user,
    loading,
    logout,
  } = useAuth();

  if (loading) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="h-8 w-48 animate-pulse bg-gray-100" />
          <div className="mt-8 h-64 animate-pulse bg-gray-100" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center px-5 py-20">
        <div className="w-full max-w-md border border-[var(--border)] p-8 text-center">
          <User
            size={42}
            strokeWidth={1.5}
            className="mx-auto text-[var(--primary)]"
          />

          <h1 className="mt-5 text-2xl font-semibold text-[var(--text-primary)]">
            Login Required
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Please login to access your account.
          </p>

          <Link
            href="/login"
            className="
              mt-6
              inline-flex
              items-center
              justify-center
              gap-2
              bg-[var(--primary)]
              px-6
              py-3
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-[var(--primary-hover)]
            "
          >
            Login
            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <main className="flex-1 bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">

        {/* Header */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--primary-hover)]">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
            Welcome, {user.name?.split(" ")[0]}
          </h1>

          <p className="mt-2 text-[var(--text-secondary)]">
            Manage your account and view your orders.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          {/* Profile */}
          <section className="border border-[var(--border)] bg-white p-6 lg:col-span-2">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-5">
              <div className="flex h-10 w-10 items-center justify-center bg-[var(--primary)] text-black">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-[var(--text-primary)]">
                  Personal Information
                </h2>

                <p className="text-sm text-[var(--text-secondary)]">
                  Your account details
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

              {/* Name */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                  Full Name
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <User
                    size={18}
                    className="text-[var(--primary-hover)]"
                  />

                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {user.name}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                  Email
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <Mail
                    size={18}
                    className="text-[var(--primary-hover)]"
                  />

                  <p className="break-all text-sm font-medium text-[var(--text-primary)]">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                  Phone
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <Phone
                    size={18}
                    className="text-[var(--primary-hover)]"
                  />

                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {user.phone || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Account Type */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                  Account Type
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <User
                    size={18}
                    className="text-[var(--primary-hover)]"
                  />

                  <p className="text-sm font-medium capitalize text-[var(--text-primary)]">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="border border-[var(--border)] bg-white p-6">
            <h2 className="font-semibold text-[var(--text-primary)]">
              Quick Actions
            </h2>

            <div className="mt-5 space-y-3">

              <Link
                href="/account/orders"
                className="
                  flex
                  items-center
                  justify-between
                  border
                  border-[var(--border)]
                  p-4
                  text-sm
                  font-medium
                  text-[var(--text-primary)]
                  transition
                  hover:border-[var(--primary)]
                  hover:text-[var(--primary-hover)]
                "
              >
                <span className="flex items-center gap-3">
                  <Package size={18} />
                  My Orders
                </span>

                <ArrowRight size={17} />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  border
                  border-[var(--border)]
                  p-4
                  text-left
                  text-sm
                  font-medium
                  text-[var(--text-secondary)]
                  transition
                  hover:border-red-300
                  hover:text-red-600
                "
              >
                <span className="flex items-center gap-3">
                  <LogOut size={18} />
                  Logout
                </span>

                <ArrowRight size={17} />
              </button>

            </div>
          </section>
        </div>

        {/* Orders Preview */}
        <section className="mt-6 border border-[var(--border)] bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-[var(--text-primary)]">
                My Orders
              </h2>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                View and track your watch orders.
              </p>
            </div>

            <Link
              href="/account/orders"
              className="
                hidden
                items-center
                gap-2
                text-sm
                font-medium
                text-[var(--primary-hover)]
                hover:text-[var(--text-primary)]
                sm:flex
              "
            >
              View Orders
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center border-t border-[var(--border)] py-12 text-center">
            <Package
              size={40}
              strokeWidth={1.4}
              className="text-[var(--text-secondary)]"
            />

            <h3 className="mt-4 font-medium text-[var(--text-primary)]">
              No orders yet
            </h3>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Your orders will appear here after you make a purchase.
            </p>

            <Link
              href="/shop"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                bg-[var(--primary)]
                px-5
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-[var(--primary-hover)]
              "
            >
              Shop Watches
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}