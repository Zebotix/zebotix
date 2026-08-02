import { getSolutionsAction } from "@/app/actions/solutions";
import { COMPANY_NAME, SITE_URL, SHORT_DESC, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/constants";
import { SEO_SERVICES } from "@/lib/seo-services";

export const revalidate = 3600;
export const dynamic = "force-static";

export async function GET() {
  const { data: solutions } = await getSolutionsAction();

  const servicesBlock = SEO_SERVICES.map((s) => {
    const faqBlock = s.faqs
      .map((f) => `**Q: ${f.question}**\nA: ${f.answer}`)
      .join("\n\n");

    const benefitsBlock = s.benefits.map((b) => `- ${b}`).join("\n");
    const processBlock = s.process.map((p, i) => `${i + 1}. ${p}`).join("\n");

    return `### ${s.keyword}

${s.definition}

**Key Benefits:**
${benefitsBlock}

**Our Process:**
${processBlock}

**Frequently Asked Questions:**

${faqBlock}

Learn more: [${s.keyword}](${SITE_URL}/services/${s.slug})`;
  }).join("\n\n---\n\n");

  const solutionsBlock = (solutions || [])
    .map(
      (s) =>
        `- [${s.title}](${SITE_URL}/solutions/${s.industrySlug}/${s.slug}): ${s.tagline || s.description?.substring(0, 150)}`
    )
    .join("\n");

  const content = `# ${COMPANY_NAME} — Full Context

> ${SHORT_DESC}

${COMPANY_NAME} is a Karachi-based software engineering agency that builds enterprise-grade web applications, mobile apps, e-commerce platforms, AI automation pipelines, and cloud infrastructure for businesses worldwide.

## Contact Information
- Website: ${SITE_URL}
- Email: ${CONTACT_EMAIL}
- Phone: ${CONTACT_PHONE}

## Services

${servicesBlock}

## Solutions
${solutionsBlock}

## Resources
- [Home](${SITE_URL})
- [About Us](${SITE_URL}/about)
- [Our Portfolio](${SITE_URL}/work)
- [Blog](${SITE_URL}/blog)
- [Careers](${SITE_URL}/careers)
- [Contact](${SITE_URL}/contact)
- [Get a Quote](${SITE_URL}/quick-quote)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
