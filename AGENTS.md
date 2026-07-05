<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Specific Rules
- **Preparation Before Any Task**: You **MUST** read `eslint.config.mjs` (or `.ts`/`.js`) before executing tasks to understand active rules and prevent `any` type usage.
- **Server Actions Only**: Do not expose any API routes (e.g., `src/app/api/...`). Always convert API logic to Server Actions (`src/app/actions/...`) and use them for client-server communication.
- **Type Safety**: The `any` type is **strictly forbidden**. Minimize `unknown` types.
- **UI & Accessibility**: Use `shadcn/ui` components and blocks exclusively.
- **Forms**: Always pair `react-hook-form` + `zod` + Server Actions for robust form validation.
- **Data Fetching**: Always fetch data using Server Actions (SSR/SSG).
- **Authentication**: Mandate the use of `next-auth` for authentication and authorization.
- **Images**: Exclusively use `.webp` formats. Any newly added image upload functionality must automatically convert to and optimize as `.webp`.
- **Security**: Embed key principles from `SECURITY_IMPLEMENTATION.txt` (RBAC, HttpOnly cookies, strict Zod validation, XSS/CSRF protections, Redis rate limiting, parameterized queries).

*See `.agents/AGENTS.md` for the full comprehensive rule list.*
