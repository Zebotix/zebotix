# Agent Workflow & Code Guidelines

## 1. Preparation Before Any Task
Before executing any task, you **MUST** read `eslint.config.mjs` (or `eslint.config.ts`/`.js` if it exists) to understand the project's active ESLint rules. This guarantees compliance with our strict typing standards.

## 2. Type Safety
- **NO `any` types**: The `any` type is strictly forbidden across the codebase. Never use it under any circumstances.
- **Minimize `unknown` types**: The `unknown` type is allowed when necessary, but should be used as little as possible as it can introduce complex type resolution errors.

## 3. UI and Accessibility
- **shadcn/ui**: Use `shadcn/ui` components and shadcn blocks exclusively for rapid, accessible, and consistent UI development.

## 4. Forms and Validation
- **react-hook-form + zod + Server Actions**: Always combine `react-hook-form` with `zod` resolvers for client-side state management, and submit the payload directly to a **Server Action** that re-validates using the same Zod schema.

## 5. Data Fetching & Rendering
- **Server Actions for Data**: Always fetch data using Server-Side Rendering (SSR) through Server Actions.
- **Static Generation**: For dynamic pages, prefer Static Site Generation (SSG) in combination with Server Actions. 

## 6. Authentication and Authorization
- **next-auth**: Use `next-auth` for all authentication workflows, session management, and authorization checks.

## 7. Images and Assets
- **WebP Exclusivity**: The entire app must use `.webp` formatted images. 
- **Upload Optimization**: Any image upload implementation must automatically convert, compress, and optimize the incoming images into the `.webp` format on the server.

## 8. Enterprise Security Implementation
These rules are derived from our core `SECURITY_IMPLEMENTATION.txt` architecture requirements and must be followed:
- **Authentication Hardening**: Ensure refresh token rotation, session fingerprinting, global logout, login attempt tracking, and MFA-ready architectures.
- **Authorization**: Implement Role-Based Access Control (RBAC), permission-based auth, and resource ownership validation on all protected server actions.
- **Cookie Security**: Ensure all cookies use `HttpOnly`, `Secure`, `SameSite` policies, and appropriate prefixes where supported.
- **CSRF & XSS Protection**: Use double-submit cookies, strict origin/referer validation, safe rendering, and rich-text sanitization.
- **Input Validation**: Strictly reject unknown fields using `zod`, apply HTML sanitization where necessary, and enforce request size limits.
- **SQL Injection**: Always rely on Prisma's parameterized queries; never concatenate raw SQL.
- **Rate Limiting**: Enforce Redis-based sliding window rate limits (e.g., global, IP-based, auth endpoints).
- **File Upload Security**: Validate MIME/Magic numbers, restrict file sizes, sanitize SVGs, strip metadata, and use cryptographically random filenames.
- **Logging & Monitoring**: Use structured logging. **Never** log secrets, passwords, or session tokens.

## 9. Next.js App Router Rules
- **Server Actions Only**: Do not expose any API routes (e.g., `src/app/api/...`). Always encapsulate logic in Server Actions (`src/app/actions/...`) and use them for all client-server communication.
