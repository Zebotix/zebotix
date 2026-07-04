import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const username = credentials.username as string;
        const password = credentials.password as string;

        const adminUsername = process.env.ADMIN_USERNAME;
        const actualHashedPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !actualHashedPassword) {
          return null;
        }

        const hashedPassword = await hashPassword(password);

        if (username === adminUsername && hashedPassword === actualHashedPassword) {
          return {
            id: "admin",
            name: "Admin User",
            email: "admin@karsaaz.com",
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
});
