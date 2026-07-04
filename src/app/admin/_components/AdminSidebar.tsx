"use client";

import {
  BookOpen,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  Settings,
  ShieldCheck,
  ShieldAlert,
  ClipboardList,
  type LucideIcon,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useAdminLayout } from "./AdminLayoutProvider";
import { AdminNavLink } from "./AdminNavLink";

import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/admin/secure/dashboard", icon: LayoutDashboard },
  { name: "Contacts", href: "/admin/secure/contacts", icon: Mail },
  { name: "Blogs", href: "/admin/secure/blogs", icon: FileText },
  { name: "Case Studies", href: "/admin/secure/case-studies", icon: BookOpen },
  { name: "Products", href: "/admin/secure/products", icon: Package },
  { name: "Services", href: "/admin/secure/services", icon: Settings },
  { name: "Testimonials", href: "/admin/secure/testimonials", icon: MessageSquare },
  { name: "Media Library", href: "/admin/secure/media", icon: ImageIcon },
  { name: "Policies", href: "/admin/secure/policies", icon: ShieldCheck },
  { name: "SEO Settings", href: "/admin/secure/seo-settings", icon: Eye },
  { name: "AI Security", href: "/admin/secure/security", icon: ShieldAlert },
] as const;

export function AdminSidebar() {
  const { mobileNavOpen, setMobileNavOpen, sidebarCollapsed } = useAdminLayout();
  const [showAuditLogs, setShowAuditLogs] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const isLocal =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname === "[::1]");
      if (isLocal) {
        setShowAuditLogs(true);
      }
    }
  }, []);

  const sidebarItems = showAuditLogs
    ? [
        ...navItems,
        { name: "Audit Logs", href: "/admin/secure/audit-logs", icon: ClipboardList as LucideIcon },
      ]
    : navItems;

  return (
    <>
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/70 sm:hidden"
          aria-label="Close navigation menu"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen border-r border-border bg-background/95 pt-20 backdrop-blur-md transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-64",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
          <p
            className={cn(
              "px-3 pb-2 text-xs font-semibold tracking-wider text-foreground uppercase transition-all duration-200 truncate",
              sidebarCollapsed && "opacity-0 select-none h-0 pb-0"
            )}
          >
            Navigation
          </p>
          <ul className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <AdminNavLink key={item.href} {...item} />
            ))}
          </ul>
          <Separator className="my-4" />
          <p
            className={cn(
              "px-3 text-xs text-muted-foreground transition-all duration-200 truncate",
              sidebarCollapsed && "opacity-0 select-none h-0"
            )}
          >
            Secure admin console
          </p>
        </div>
      </aside>
    </>
  );
}
