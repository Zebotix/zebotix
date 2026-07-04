"use client";

import { Menu, X } from "lucide-react";

import { useAdminLayout } from "./AdminLayoutProvider";

export function AdminMobileMenuButton() {
  const { mobileNavOpen, toggleMobileNav } = useAdminLayout();

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground sm:hidden"
      onClick={toggleMobileNav}
      aria-expanded={mobileNavOpen}
      aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      {mobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  );
}
