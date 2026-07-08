import { ArrowLeft, Check, Cpu, Hammer } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import type { Metadata } from "next";

import { getSolutionBySlugAction, getSolutionsAction } from "@/app/actions/solutions";
import { Reveal } from "@/components/animations";
import FaqSection from "@/components/FaqSection";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQPageSchema,
  getSanitizedSchema,
} from "@/lib/schemas";
interface SolutionPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: SolutionPageProps) {
  const { slug } = await params;
  const slugStr = slug.at(-1) ?? "";
  const res = await getSolutionBySlugAction(slugStr);
  if (!res.success || !res.data) {
    return { title: "Solution Not Found" };
  }

  const seoData = res.data.seo as {
    title?: string;
    description?: string;
    keywords?: string;
  } | null;

  const title = seoData?.title || `${res.data.title} | Solutions | ${COMPANY_NAME}`;
  const description =
    seoData?.description ||
    res.data.tagline ||
    `Discover our ${res.data.title} solutions at ${COMPANY_NAME}.`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: `/solutions/${slug.join("/")}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/solutions/${slug.join("/")}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };

  if (seoData?.keywords) {
    metadata.keywords = seoData.keywords;
  }

  return metadata;
}

export default async function SolutionDetailsPage({ params }: Readonly<SolutionPageProps>) {
  const { slug } = await params;
  const slugStr = slug.at(-1) ?? "";
  const res = await getSolutionBySlugAction(slugStr);
  const faqs: { question: string; answer: string }[] = res.success
    ? (res.data?.faq as { question: string; answer: string }[])
    : [];

  if (!res.success || !res.data) {
    notFound();
  }

  const solution = res.data;
  const benefits = Array.isArray(solution.benefits)
    ? (solution.benefits as Array<{ title: string; desc: string }>)
    : [];
  const processSteps = Array.isArray(solution.process)
    ? (solution.process as Array<{ title: string; desc: string }>)
    : [];
  const techStack = Array.isArray(solution.technologies)
    ? (solution.technologies as Array<{ name: string; icon: string }>)
    : [];

  const serviceSchema = generateServiceSchema(
    solution.title,
    solution.tagline || "",
    undefined, // price
    `${SITE_URL}/Zebotix.webp` // default image
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Solutions", url: `${SITE_URL}/solutions` },
    { name: solution.title, url: `${SITE_URL}/solutions/${slug.join("/")}` },
  ]);

  const faqSchema = Array.isArray(faqs) && faqs?.length > 0 ? generateFAQPageSchema(faqs) : null;

  return (
    <main className="bg-zinc-950 text-zinc-300 min-h-screen pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(breadcrumbSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: getSanitizedSchema(faqSchema),
          }}
        />
      )}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Reveal>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-12 transition-colors group text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Solutions
          </Link>
        </Reveal>

        <header className="max-w-4xl mb-16">
          <Reveal>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
              {solution.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
              {solution.tagline}
            </p>
          </Reveal>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-2 space-y-16">
            <Reveal delay={0.2}>
              <section>
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2 uppercase tracking-wide">
                  <Hammer className="text-blue-500 h-6 w-6" /> Overview
                </h2>
                <div
                  className="prose prose-invert max-w-none text-zinc-400 text-lg leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: solution.description }}
                />
              </section>
            </Reveal>

            {processSteps.length > 0 && (
              <Reveal delay={0.3}>
                <section>
                  <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-2 uppercase tracking-wide">
                    Our Delivery Process
                  </h2>
                  <div className="space-y-6">
                    {processSteps.map((step, sIdx: number) => (
                      <div key={sIdx} className="flex gap-6 items-start">
                        <div className="bg-zinc-900 border border-zinc-800 text-blue-500 text-sm font-bold font-mono px-3 py-1 mt-1 shrink-0">
                          {String(sIdx + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-1 space-y-8">
            <Reveal delay={0.3}>
              <div className="bg-zinc-900/40 p-8 border border-zinc-800 shadow-2xl space-y-8">
                <div>
                  <h3 className="text-xl font-black text-white mb-6 uppercase tracking-wide">
                    Key Benefits
                  </h3>
                  <div className="space-y-4">
                    {benefits.map((b, bIdx: number) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-zinc-200 text-sm block">{b.title}</strong>
                          <span className="text-zinc-500 text-xs">{b.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {techStack.length > 0 && (
                  <div className="pt-8 border-t border-zinc-800/80">
                    <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2 uppercase tracking-wide">
                      <Cpu className="text-blue-500 h-5 w-5" /> Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <span
                          key={typeof tech === "string" ? tech : tech.name}
                          className="px-3 py-1.5 bg-zinc-950 border border-zinc-850 text-xs font-bold text-zinc-400"
                        >
                          {typeof tech === "string" ? tech : tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  asChild
                  size="lg"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12"
                >
                  <Link href="/quick-quote">Request Estimate</Link>
                </Button>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* FAQ Section */}
        {Array.isArray(faqs) && faqs.length > 0 && (
          <div className="mt-28 pt-12">
            <FaqSection faqs={faqs} />
          </div>
        )}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const { data: solutions, success } = await getSolutionsAction();
    if (!success || !solutions) {
      return [];
    }
    return solutions.map((s) => {
      const slugArr = [s.industrySlug, s.slug];
      return { slug: slugArr };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
