import React from 'react';
import { getAnalyticsSummary } from '@/lib/analytics';
import { Reveal } from '@/components/animations';
import { BarChart3, Users, MousePointer2, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AnalyticsDashboard() {
  const data = await getAnalyticsSummary();

  const stats = [
    { label: 'Total Visits', value: data.totalVisits, icon: <Users />, color: 'text-blue-500' },
    { label: 'Unique Paths', value: data.topPaths.length, icon: <MousePointer2 />, color: 'text-purple-500' },
    { label: 'Real-time Active', value: 'Live', icon: <Clock />, color: 'text-green-500' },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <header className="mb-12">
          <Reveal>
            <h1 className="text-4xl font-black text-white mb-2">Internal Analytics</h1>
            <p className="text-gray-400">Monitoring site activity and performance metrics.</p>
          </Reveal>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.1 * i}>
              <div className="bg-zebotix-darkGray p-8 rounded-3xl border border-white/5 flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                  {React.cloneElement(stat.icon as any, { className: 'h-6 w-6' })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Reveal delay={0.3}>
            <div className="bg-zebotix-darkGray p-8 rounded-3xl border border-white/5 shadow-2xl h-full">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="text-zebotix-blue h-5 w-5" />
                Popular Pages
              </h2>
              <div className="space-y-4">
                {data.topPaths.map((path: any) => (
                  <div key={path._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-gray-300 font-medium">{path._id}</span>
                    <span className="bg-zebotix-blue/10 text-zebotix-blue px-3 py-1 rounded-full text-xs font-bold">
                      {path.count} views
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="bg-zebotix-darkGray p-8 rounded-3xl border border-white/5 shadow-2xl h-full">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="text-zebotix-blue h-5 w-5" />
                Recent Activity
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 uppercase tracking-widest text-[10px] border-b border-white/5">
                      <th className="pb-4 font-black">Path</th>
                      <th className="pb-4 font-black">IP Address</th>
                      <th className="pb-4 font-black">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {data.recentVisits.map((visit: any) => (
                      <tr key={visit._id} className="border-b border-white/5 last:border-0">
                        <td className="py-4 font-medium">{visit.path}</td>
                        <td className="py-4 text-gray-500">{visit.ip.replace(/\d+$/, '***')}</td>
                        <td className="py-4 text-xs">{new Date(visit.updatedAt).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
