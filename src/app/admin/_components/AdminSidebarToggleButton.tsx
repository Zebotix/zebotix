"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useAdminLayout } from "./AdminLayoutProvider";

import { Button } from "@/components/ui/Button";

export function AdminSidebarToggleButton() {
  const { sidebarCollapsed, toggleSidebar } = useAdminLayout();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden sm:flex ml-2 border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar collapse"
    >
      {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
    </Button>
  );
}
