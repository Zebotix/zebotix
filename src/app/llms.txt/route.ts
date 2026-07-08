import { getSolutionsAction } from "@/app/actions/solutions";

export async function GET() {
  const { data: solutions } = await getSolutionsAction();
  
  const content = `# Zebotix

Zebotix is an innovative software engineering agency focusing on scalable software architecture, custom software development, high-performance e-commerce, AI automation, and cloud infrastructure.

## Solutions
${(solutions || []).map((s) => `- [${s.title}](https://www.zebotix.com/solutions/${s.slug}): ${s.tagline || s.description?.substring(0, 50)}`).join("\n")}

## Contact
- Website: [Zebotix Home](https://www.zebotix.com)
- Work: [Our Portfolio](https://www.zebotix.com/work)
- Blog: [Zebotix Blog](https://www.zebotix.com/blog)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
