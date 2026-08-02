import { getSolutionsAction } from "@/app/actions/solutions";

export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static"; // Ensure it's statically generated

export async function GET() {
  const { data: solutions } = await getSolutionsAction();

  const content = `# Zebotix

> Zebotix is an innovative software engineering agency focusing on scalable software architecture, custom software development, high-performance e-commerce, AI automation, and cloud infrastructure.

Zebotix builds robust, scalable e-commerce solutions, AI automation pipelines, and advanced web applications that drive real business value.

## Solutions
${(solutions || []).map((s) => `- [${s.title}](https://zebotix.com/solutions/${s.slug}): ${s.tagline || s.description?.substring(0, 50)}`).join("\n")}

## Contact
- Website: [Zebotix Home](https://zebotix.com)
- Work: [Our Portfolio](https://zebotix.com/work)
- Blog: [Zebotix Blog](https://zebotix.com/blog)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
