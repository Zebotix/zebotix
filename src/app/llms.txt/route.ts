import { getSolutionsAction } from "@/app/actions/solutions";
import { SEO_SERVICES } from "@/lib/seo-services";

export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static"; // Ensure it's statically generated

export async function GET() {
  const { data: solutions } = await getSolutionsAction();

  const content = `# Zebotix

> Zebotix is an innovative software engineering agency focusing on scalable software architecture, custom software development, high-performance e-commerce, AI automation, and cloud infrastructure.

Zebotix builds robust, scalable e-commerce solutions, AI automation pipelines, and advanced web applications that drive real business value.

## Services
${SEO_SERVICES.map((s) => `- [${s.keyword}](https://zebotix.com/services/${s.slug}): ${s.description}`).join("\n")}

## Solutions
${(solutions || []).map((s) => `- [${s.title}](https://zebotix.com/solutions/${s.industrySlug}/${s.slug}): ${s.tagline || s.description?.substring(0, 100)}`).join("\n")}

## Resources
- [Zebotix Home](https://zebotix.com)
- [Our Portfolio](https://zebotix.com/work)
- [Zebotix Blog](https://zebotix.com/blog)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
