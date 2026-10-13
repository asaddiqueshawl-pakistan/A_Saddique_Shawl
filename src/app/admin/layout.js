"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="lg:pl-64">

        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-[var(--border)] bg-[var(--background)] px-5 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Open admin menu"
          >
            <Menu size={23} />
          </button>

          <span className="ml-4 text-sm font-semibold tracking-[0.15em]">
            ADMIN PANEL
          </span>
        </header>

        {/* Page */}
        {children}
      </div>
    </div>
  );
}