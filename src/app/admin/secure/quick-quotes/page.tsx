import { headers } from "next/headers";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import prisma from "@/lib/db/prisma";

function getStatusStyles(status: string) {
  switch (status) {
    case "new":
      return "bg-blue-950 text-blue-400 border border-blue-900";
    case "reviewed":
      return "bg-amber-950 text-amber-400 border border-amber-900";
    case "closed":
      return "bg-green-950 text-green-400 border border-green-900";
    default:
      return "bg-zinc-800 text-zinc-400 border border-zinc-700";
  }
}

export default async function QuickQuotesPage() {
  await headers();
  const quotes = await prisma.quickQuote.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 md:p-12 text-white">
      <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold">Quick Quotes</h1>
          <p className="text-zinc-400 mt-2">Manage quick quote submissions.</p>
        </div>
        <div className="text-sm bg-zinc-900 text-zinc-300 px-4 py-2 border border-zinc-800">
          Total: {quotes.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50">
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Date
              </th>
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Name
              </th>
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Email
              </th>
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Project Type
              </th>
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Budget
              </th>
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <Dialog key={quote.id}>
                <DialogTrigger asChild>
                  <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors cursor-pointer">
                    <td className="py-4 px-6 text-zinc-300">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 font-medium text-white">{quote.name}</td>
                    <td className="py-4 px-6 text-zinc-300">{quote.email}</td>
                    <td className="py-4 px-6 text-zinc-400">{quote.projectType}</td>
                    <td className="py-4 px-6 text-zinc-400">{quote.budget}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusStyles(quote.status)}`}
                      >
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto bg-zinc-950 border-zinc-800 text-zinc-100 sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">
                      Quote Details
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mt-4">
                    <div>
                      <p className="text-sm text-zinc-400 font-medium mb-1">Name</p>
                      <p className="text-zinc-100 font-semibold">{quote.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium mb-1">Email</p>
                      <p className="text-zinc-100">
                        <a href={`mailto:${quote.email}`} className="text-teal-400 hover:underline">
                          {quote.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium mb-1">Phone</p>
                      <p className="text-zinc-100">
                        {quote.phone ? (
                          <a href={`tel:${quote.phone}`} className="text-teal-400 hover:underline">
                            {quote.phone}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium mb-1">Company</p>
                      <p className="text-zinc-100">{quote.company || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium mb-1">Project Type</p>
                      <p className="text-zinc-100">{quote.projectType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium mb-1">Business Type</p>
                      <p className="text-zinc-100">{quote.businessType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium mb-1">Budget</p>
                      <p className="text-zinc-100">{quote.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 font-medium mb-1">Timeline</p>
                      <p className="text-zinc-100">{quote.timeline}</p>
                    </div>

                    <div className="md:col-span-2 border-t border-zinc-800 pt-4">
                      <p className="text-sm text-zinc-400 font-medium mb-2">Color Themes</p>
                      <div className="flex flex-wrap gap-2">
                        {quote.colorThemes && quote.colorThemes.length > 0 ? (
                          quote.colorThemes.map((theme) => (
                            <span
                              key={theme}
                              className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-xs rounded-md text-zinc-300"
                            >
                              {theme}
                            </span>
                          ))
                        ) : (
                          <span className="text-zinc-500 text-sm">None selected</span>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2 border-t border-zinc-800 pt-4">
                      <p className="text-sm text-zinc-400 font-medium mb-2">Features</p>
                      <div className="flex flex-wrap gap-2">
                        {quote.features && quote.features.length > 0 ? (
                          quote.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-teal-950/30 border border-teal-900/50 text-teal-400 text-xs rounded-md"
                            >
                              {feature}
                            </span>
                          ))
                        ) : (
                          <span className="text-zinc-500 text-sm">None selected</span>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2 border-t border-zinc-800 pt-4">
                      <p className="text-sm text-zinc-400 font-medium mb-2">Reference URLs</p>
                      {quote.referenceUrls && quote.referenceUrls.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {quote.referenceUrls.map((url, i) => (
                            <li key={i}>
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-400 hover:underline text-sm break-all"
                              >
                                {url}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-zinc-500 text-sm">None provided</p>
                      )}
                    </div>

                    <div className="md:col-span-2 border-t border-zinc-800 pt-4">
                      <p className="text-sm text-zinc-400 font-medium mb-2">Details/Notes</p>
                      <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg">
                        <p className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
                          {quote.details || "No additional details provided."}
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
            {quotes.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-zinc-500">
                  No quick quotes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
