import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

import { PrismaClient } from "@/generated/prisma/client";

// Type definitions
declare global {
  var prismaNeon: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Set up WebSocket constructor for Neon serverless
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL_PRODUCTION;
if (!connectionString) {
  console.error("WARNING: DATABASE_URL_PRODUCTION is not set. Database operations will fail.");
}

if (process.env.NODE_ENV === "development") {
  // Use Neon in development as well, preserving connection across hot reloads
  if (!global.prismaNeon) {
    const adapter = new PrismaNeon({ connectionString });
    global.prismaNeon = new PrismaClient({ adapter });
  }
  prisma = global.prismaNeon;
} else {
  // Use Neon for production
  const adapter = new PrismaNeon({ connectionString });
  prisma = new PrismaClient({ adapter });
}

export default prisma;
