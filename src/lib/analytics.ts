import { getVisits } from '@/lib/data/visitsUtil';

export async function getAnalyticsSummary() {
  const visits = getVisits();
  
  const totalVisits = visits.length;
  
  // Sort descending by updatedAt
  const sortedVisits = [...visits].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  const recentVisits = sortedVisits.slice(0, 10);
  
  const pathsCount: Record<string, number> = {};
  for (const v of visits) {
    pathsCount[v.path] = (pathsCount[v.path] || 0) + 1;
  }
  
  const topPaths = Object.entries(pathsCount)
    .map(([path, count]) => ({ _id: path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalVisits,
    recentVisits,
    topPaths
  };
}
