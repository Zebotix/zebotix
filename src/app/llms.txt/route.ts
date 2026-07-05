import { SOLUTIONS, PLATFORMS } from "@/lib/mockData";

export async function GET() {
  const content = `# Zebotix

Zebotix is an innovative software engineering agency focusing on scalable software architecture, custom software development, high-performance e-commerce, AI automation, and cloud infrastructure.

## Solutions
${SOLUTIONS.map((s) => `- ${s.title}: ${s.subtitle}`).join("\n")}

## Platforms
${PLATFORMS.map((p) => `- ${p.title}`).join("\n")}

## Contact
Website: https://www.zebotix.com
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
