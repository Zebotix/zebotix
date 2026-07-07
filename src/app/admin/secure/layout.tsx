import Link from "next/link";
import React from "react";

import { logoutAction } from "@/app/actions/auth";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const navItems = [
    { name: "Dashboard", href: "/admin/secure" },
    { name: "Leads", href: "/admin/secure/leads" },
    { name: "Quick Quotes", href: "/admin/secure/quick-quotes" },
    { name: "Analytics", href: "/admin/secure/analytics" },
    { name: "Portfolios", href: "/admin/secure/portfolios" },
    { name: "Solutions", href: "/admin/secure/solutions" },
    { name: "Blogs", href: "/admin/secure/blogs" },
    { name: "Settings", href: "/admin/secure/settings" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white">
            ZEBOTIX<span className="text-zinc-500">.ADMIN</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <form action={logoutAction}>
            <button className="w-full bg-red-950 text-red-500 hover:bg-red-900 hover:text-red-300 py-3 font-semibold transition-colors">
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
