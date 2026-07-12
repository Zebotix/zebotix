import { headers } from "next/headers";
import React from "react";

import GenerateAutoBlogButton from "../_components/GenerateAutoBlogButton";

import prisma from "@/lib/db/prisma";

export default async function AdminDashboard() {
  await headers();
  const [leadsCount, portfoliosCount, blogsCount] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.portfolio.count(),
    prisma.blogPost.count(),
  ]);

  return (
    <div className="p-8 md:p-12 text-white">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
          <h2 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Total Leads
          </h2>
          <p className="text-4xl font-black">{leadsCount}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
          <h2 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Portfolios
          </h2>
          <p className="text-4xl font-black">{portfoliosCount}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
          <h2 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Blog Posts
          </h2>
          <p className="text-4xl font-black">{blogsCount}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6 border-b border-zinc-800 pb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-black font-semibold py-3 px-6 hover:bg-zinc-200 transition-colors">
            Add New Portfolio
          </button>
          <button className="bg-zinc-800 text-white font-semibold py-3 px-6 hover:bg-zinc-700 transition-colors">
            Write Blog Post
          </button>
          <GenerateAutoBlogButton />
        </div>
      </div>
    </div>
  );
}
