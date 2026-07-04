import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const visitsFilePath = path.join(process.cwd(), 'src/lib/data/visits.json');

// Ensure file exists
function ensureFile() {
  if (!fs.existsSync(visitsFilePath)) {
    const dir = path.dirname(visitsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(visitsFilePath, JSON.stringify([], null, 2));
  }
}

export interface VisitRecord {
  id: string;
  ip: string;
  referrer: string;
  path: string;
  method: string;
  status: number;
  userAgent: string;
  metadata: any;
  createdAt: string;
  updatedAt: string;
}

export function getVisits(): VisitRecord[] {
  ensureFile();
  try {
    const data = fs.readFileSync(visitsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveVisits(visits: VisitRecord[]) {
  ensureFile();
  fs.writeFileSync(visitsFilePath, JSON.stringify(visits, null, 2));
}

export function upsertVisit(visitData: Partial<VisitRecord>) {
  const visits = getVisits();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const existingVisitIndex = visits.findIndex(
    (v) =>
      v.ip === visitData.ip &&
      v.userAgent === visitData.userAgent &&
      v.path === visitData.path &&
      v.updatedAt >= oneHourAgo
  );

  let visitDoc: VisitRecord;

  if (existingVisitIndex === -1) {
    visitDoc = {
      id: crypto.randomUUID(),
      ip: visitData.ip || 'unknown',
      referrer: visitData.referrer || '',
      path: visitData.path || '/',
      method: visitData.method || 'GET',
      status: visitData.status || 200,
      userAgent: visitData.userAgent || '',
      metadata: visitData.metadata || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    visits.push(visitDoc);
  } else {
    visitDoc = {
      ...visits[existingVisitIndex],
      referrer: visitData.referrer || visits[existingVisitIndex].referrer,
      metadata: visitData.metadata || visits[existingVisitIndex].metadata,
      updatedAt: new Date().toISOString(),
    };
    visits[existingVisitIndex] = visitDoc;
  }

  saveVisits(visits);
  return visitDoc;
}
