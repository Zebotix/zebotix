"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAdminLayout } from "./AdminLayoutProvider";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface AdminNavLinkProps {
  readonly name: string;
  readonly href: string;
  readonly icon: LucideIcon;
}

export function AdminNavLink({ name, href, icon: Icon }: AdminNavLinkProps) {
  const pathname = usePathname();
  const { setMobileNavOpen, sidebarCollapsed } = useAdminLayout();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li>
      <Link
        href={href}
        onClick={() => setMobileNavOpen(false)}
        className={cn(
          "group flex items-center rounded-lg p-3 text-sm font-medium transition-all duration-300",
          sidebarCollapsed ? "justify-center gap-0" : "gap-3",
          isActive
            ? "border border-blue-500/30 bg-blue-500/15 text-blue-600 dark:text-white"
            : "text-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        title={sidebarCollapsed ? name : undefined}
      >
        <Icon
          className={cn(
            "size-5 shrink-0 transition-colors",
            isActive
              ? "text-blue-500 dark:text-blue-400"
              : "text-muted-foreground group-hover:text-blue-500 dark:group-hover:text-blue-400"
          )}
        />
        <span
          className={cn(
            "transition-all duration-250 truncate",
            sidebarCollapsed
              ? "w-0 opacity-0 pointer-events-none select-none"
              : "w-auto opacity-100"
          )}
        >
          {name}
        </span>
      </Link>
    </li>
  );
}
