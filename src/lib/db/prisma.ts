import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import ws from "ws";

import { PrismaClient } from "@/generated/prisma/client";

neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
neonConfig.poolQueryViaFetch = true;

// Type definitions
declare global {
  var prismaPg: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;
let prisma: PrismaClient;

if (!connectionString) {
  if (process.env.NODE_ENV === "production") {
    console.error("WARNING: DATABASE_URL is not set. Database operations will fail.");
  }
  // Initialize with a dummy or let it throw a clearer error on use
  // Cannot instantiate empty in v7 with adapter generator
  prisma = {} as PrismaClient; // Fail fast if used without env
} else if (process.env.NODE_ENV === "development") {
  // Use @prisma/adapter-pg for local Postgres
  if (!global.prismaPg) {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    global.prismaPg = new PrismaClient({ adapter });
  }
  prisma = global.prismaPg;
} else {
  // Use Neon for production
  const { Pool: NeonPool } = require("@neondatabase/serverless");
  const pool = new NeonPool({ connectionString });
  const adapter = new PrismaNeon(pool);
  prisma = new PrismaClient({ adapter });
}

export default prisma;
