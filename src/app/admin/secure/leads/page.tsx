import { headers } from 'next/headers';
import React from 'react';

import prisma from '@/lib/db/prisma';



export default async function LeadsPage() {
  await headers();
  const leads = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 md:p-12 text-white">
      <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-zinc-400 mt-2">Manage inquiries and contact requests.</p>
        </div>
        <div className="text-sm bg-zinc-900 text-zinc-300 px-4 py-2 border border-zinc-800">
          Total: {leads.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50">
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">Date</th>
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">Name</th>
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">Email</th>
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">Phone</th>
              <th className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                <td className="py-4 px-6 text-zinc-300">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 font-medium text-white">
                  {lead.name}
                </td>
                <td className="py-4 px-6 text-zinc-300">
                  {lead.email}
                </td>
                <td className="py-4 px-6 text-zinc-400">
                  {lead.phone || '-'}
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                    lead.status === 'NEW' ? 'bg-blue-950 text-blue-400 border border-blue-900' :
                    lead.status === 'CONTACTED' ? 'bg-amber-950 text-amber-400 border border-amber-900' :
                    'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}>
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-zinc-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
