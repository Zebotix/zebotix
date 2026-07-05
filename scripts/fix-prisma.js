const fs = require('fs');
const path = require('path');

// 1. Fix src/lib/db/prisma.ts
const prismaTsPath = path.resolve(__dirname, '..', 'src/lib/db/prisma.ts');
const prismaTsContent = fs.readFileSync(prismaTsPath, 'utf8');
let newPrismaTsContent = prismaTsContent
  .replace("import { PrismaNeon } from '@prisma/adapter-neon';", "import { PrismaNeon } from '@prisma/adapter-neon';\nimport { Pool as NeonPool } from '@neondatabase/serverless';")
  .replace("const adapter = new PrismaNeon({ connectionString });", "const pool = new NeonPool({ connectionString });\n  const adapter = new PrismaNeon({ pool });")
  .replace("prisma = new PrismaClient();", "// Cannot instantiate empty in v7 with adapter generator\n  prisma = {} as any; // Fail fast if used without env");

// Wait, NeonPool takes { connectionString } and PrismaNeon takes { pool: NeonPool } or similar?
// The actual `@prisma/adapter-neon` constructor signature is `new PrismaNeon(pool)`.
newPrismaTsContent = newPrismaTsContent.replace("const adapter = new PrismaNeon({ pool });", "const adapter = new PrismaNeon(pool);");

fs.writeFileSync(prismaTsPath, newPrismaTsContent);
console.log('Fixed prisma.ts');

// 2. Fix other files
const filesToFix = [
  'src/app/admin/secure/page.tsx',
  'src/app/admin/secure/leads/page.tsx',
  'src/app/actions/contact.ts'
];

for (const f of filesToFix) {
  const p = path.resolve(__dirname, '..', f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/import \{ PrismaClient \} from '@\/generated\/prisma';/g, "import prisma from '@/lib/db/prisma';");
    content = content.replace(/const prisma = new PrismaClient\(\);/g, "");
    fs.writeFileSync(p, content);
    console.log('Fixed ' + f);
  }
}
