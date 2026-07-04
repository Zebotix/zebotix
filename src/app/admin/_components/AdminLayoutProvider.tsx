"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import type { ReactNode } from "react";

interface AdminLayoutContextValue {
  readonly mobileNavOpen: boolean;
  readonly setMobileNavOpen: (open: boolean) => void;
  readonly toggleMobileNav: () => void;
  readonly sidebarCollapsed: boolean;
  readonly setSidebarCollapsed: (collapsed: boolean) => void;
  readonly toggleSidebar: () => void;
}

const AdminLayoutContext = createContext<AdminLayoutContextValue | null>(null);

export function AdminLayoutProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen((previous) => !previous);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((previous) => !previous);
  }, []);

  const value = useMemo(
    () => ({
      mobileNavOpen,
      setMobileNavOpen,
      toggleMobileNav,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebar,
    }),
    [mobileNavOpen, toggleMobileNav, sidebarCollapsed, toggleSidebar]
  );

  return <AdminLayoutContext.Provider value={value}>{children}</AdminLayoutContext.Provider>;
}

export function useAdminLayout(): AdminLayoutContextValue {
  const context = useContext(AdminLayoutContext);
  if (!context) {
    throw new Error("useAdminLayout must be used within AdminLayoutProvider");
  }
  return context;
}
