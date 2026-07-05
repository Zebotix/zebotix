import { LogOut, Shield } from "lucide-react";

import { AdminMobileMenuButton } from "./AdminMobileMenuButton";
import { AdminSidebarToggleButton } from "./AdminSidebarToggleButton";
import { ThemeToggle } from "./ThemeToggle";

import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";

export async function AdminHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md transition-colors duration-300">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <AdminMobileMenuButton />
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/15 p-2 text-blue-600 dark:text-blue-300">
            <Shield className="size-5" />
          </div>
          <div>
            <span className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Console
            </span>
            <h1 className="text-base leading-none font-bold text-foreground">
              Karsaaz Administration
            </h1>
          </div>
          <AdminSidebarToggleButton />
        </div>

        <div className="flex items-center gap-4">
          <Separator orientation="vertical" className="hidden h-8 bg-border sm:block" />
          <ThemeToggle />
          <Separator orientation="vertical" className="hidden h-8 bg-border sm:block" />
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="border-border bg-card text-foreground hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut data-icon="inline-start" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
