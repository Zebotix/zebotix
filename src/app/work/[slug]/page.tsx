import { ArrowLeft, CheckCircle2, Target, Rocket } from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { getPortfolioBySlugAction, getPortfoliosAction } from "@/app/actions/portfolio";
import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";
import {
  generateBreadcrumbSchema,
  generateCreativeWorkSchema,
  getSanitizedSchema,
} from "@/lib/schemas";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const res = await getPortfoliosAction();
  if (res.success && res.data) {
    return res.data.map((p) => ({
      slug: p.slug,
    }));
  }
  return [];
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await getPortfolioBySlugAction(slug);
  if (!res.success || !res.data) {
    return { title: "Project Not Found" };
  }
  const project = res.data;
  const summary = project.problem || "";

  return {
    title: `${project.title} | Case Study | ${COMPANY_NAME}`,
    description: summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Case Study | ${COMPANY_NAME}`,
      description: summary,
      type: "article",
      url: `${SITE_URL}/work/${project.slug}`,
      siteName: COMPANY_NAME,
      images: [
        {
          url: project.gallery?.[0] || "",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study | ${COMPANY_NAME}`,
      description: summary,
      images: [project.gallery?.[0] || ""],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const res = await getPortfolioBySlugAction(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const project = res.data;
  const summary = project.problem || "";
  const image = project.gallery?.[0] || "";
  const tags = project.techStack || [];
  const results = project.results as {
    summary?: string;
    metrics?: { label: string; value: string }[];
    [key: string]: unknown;
  } | null;

  const creativeworkSchema = generateCreativeWorkSchema(
    project.title,
    summary,
    image,
    project.createdAt,
    `${SITE_URL}/work/${project.slug}`
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Work", url: `${SITE_URL}/work` },
    { name: project.title, url: `${SITE_URL}/work/${project.slug}` },
  ]);

  return (
    <article className="bg-zinc-950 text-zinc-300 min-h-screen pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(creativeworkSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getSanitizedSchema(breadcrumbSchema),
        }}
      />
      <div className="section-container">
        <Reveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-12 transition-colors group text-sm font-bold uppercase tracking-wider"
            aria-label="Back to Portfolio"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </Link>
        </Reveal>

        <header className="mb-16 max-w-4xl">
          <Reveal>
            <div className="flex gap-2 mb-6 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest text-blue-500 font-black bg-blue-500/10 px-3 py-1 border border-blue-500/20"
                  aria-label={`Project tag: ${tag}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-7xl font-black mb-8 text-white leading-tight">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed prose prose-invert prose-p:leading-relaxed prose-p:m-0"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          </Reveal>
        </header>

        <Reveal delay={0.3} distance={50} className="mb-24">
          <div className="relative h-[400px] md:h-[700px] overflow-hidden border border-zinc-900 shadow-2xl">
            {image && (
              <Image
                src={image}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          <div className="lg:col-span-2 space-y-16">
            <Reveal>
              <section>
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-wide">
                  <Rocket className="text-blue-500 h-6 w-6" /> Project Solution
                </h2>
                <div
                  className="prose prose-invert max-w-none text-zinc-400 text-lg leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: project.solution }}
                />
              </section>
            </Reveal>

            {project.client && (
              <Reveal delay={0.1}>
                <section>
                  <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-wide">
                    <Target className="text-blue-500 h-6 w-6" /> Client & Scope
                  </h2>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Working alongside <strong>{project.client}</strong>{" "}
                    {project.industry ? `in the ${project.industry} industry` : ""}, we built a
                    modern software architecture tailored to their operational challenges.
                  </p>
                </section>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-1">
            <Reveal delay={0.2}>
              <div className="bg-zinc-900/40 p-8 border border-zinc-800 shadow-2xl sticky top-32 space-y-8">
                {results && (
                  <div>
                    <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wide">
                      Results & Impact
                    </h3>

                    {results.summary && (
                      <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                        {results.summary}
                      </p>
                    )}

                    <div className="space-y-4">
                      {Array.isArray(results.metrics)
                        ? results.metrics.map(
                            (metric: { label: string; value: string }, idx: number) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-zinc-200 text-sm block capitalize">
                                    {metric.label}
                                  </strong>
                                  <span className="text-zinc-500 text-xs">{metric.value}</span>
                                </div>
                              </div>
                            )
                          )
                        : Object.entries(results).map(([key, val]: [string, unknown], idx) => {
                            if (
                              typeof val !== "string" &&
                              typeof val !== "number" &&
                              typeof val !== "boolean"
                            ) {
                              return null;
                            }
                            return (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-zinc-200 text-sm block capitalize">
                                    {key.replace(/([A-Z])/g, " $1")}
                                  </strong>
                                  <span className="text-zinc-500 text-xs">{String(val)}</span>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                )}

                {project.testimonial && (
                  <div className="pt-8 border-t border-zinc-800/80">
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">
                      Client Feedback
                    </h4>
                    <p className="text-zinc-400 italic text-sm leading-relaxed">
                      "{project.testimonial}"
                    </p>
                  </div>
                )}

                <div className="pt-8 border-t border-zinc-800/80">
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">
                    Tech Stack Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-zinc-950 border border-zinc-850 text-xs font-bold text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12"
                >
                  <Link href="/contact">Start a Similar Project</Link>
                </Button>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </article>
  );
}
