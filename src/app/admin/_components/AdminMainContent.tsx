"use client";

import { useAdminLayout } from "./AdminLayoutProvider";

import { cn } from "@/lib/utils";

export function AdminMainContent({ children }: Readonly<{ children: React.ReactNode }>) {
  const { sidebarCollapsed } = useAdminLayout();
  return (
    <main
      className={cn(
        "h-screen overflow-y-auto pt-20 transition-all duration-300",
        sidebarCollapsed ? "sm:ml-20" : "sm:ml-64"
      )}
    >
      {children}
    </main>
  );
}
