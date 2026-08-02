import { Check } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateServiceSchema,
} from "@/lib/schemas";
import { SEO_SERVICES } from "@/lib/seo-services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SEO_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.title,
    description: service.description,
    keywords: [service.keyword, "IT Services", "Custom Software", COMPANY_NAME],
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
  };
}

export async function generateStaticParams() {
  return SEO_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceSeoPage({ params }: Readonly<ServicePageProps>) {
  const { slug } = await params;
  const service = SEO_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
  ];

  return (
    <main className="bg-zinc-950 text-zinc-300 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateServiceSchema(service.title, service.description)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema(service.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      <HeroSection
        eyebrow={`Top-Tier ${service.keyword}`}
        title={service.heroHeadline}
        description={service.heroSubheadline}
        primaryCta={{ href: "/quick-quote", label: "Request an Estimate" }}
      />

      {/* AEO: Short Answer / Definition Block */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-16">
        <Reveal>
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide border-b border-zinc-800 pb-4">
              What is {service.keyword}?
            </h2>
            <p className="text-lg text-zinc-300 leading-relaxed">{service.definition}</p>
          </div>
        </Reveal>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <Reveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                  Why Choose Zebotix for {service.keyword}?
                </h2>
                <div className="prose prose-invert text-zinc-400 text-lg leading-relaxed">
                  <p>{service.content}</p>
                  <p>
                    We don't just write code; we build strategic digital assets. Our proven delivery
                    methodology ensures your project is delivered on time, within budget, and built
                    to the highest security and performance standards.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* AEO: Benefits & Process structured lists */}
            <Reveal>
              <div className="space-y-6 pt-8 border-t border-zinc-800/50">
                <h3 className="text-2xl font-bold text-white">Key Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="bg-blue-500/10 p-1 rounded-full mt-1 shrink-0">
                        <Check className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="text-zinc-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-6 pt-8 border-t border-zinc-800/50">
                <h3 className="text-2xl font-bold text-white">Our Process</h3>
                <ul className="space-y-4">
                  {service.process.map((step, idx) => (
                    <li
                      key={idx}
                      className="bg-zinc-900/40 p-4 border border-zinc-800/50 rounded-lg"
                    >
                      <div className="flex gap-4">
                        <span className="text-blue-500 font-black text-xl">0{idx + 1}</span>
                        <span className="text-zinc-300 font-medium">{step}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24">
            <Reveal delay={0.2}>
              <div className="bg-zinc-900/40 p-8 md:p-12 border border-zinc-800 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide">
                  Our Guarantee
                </h3>
                <ul className="space-y-6">
                  {[
                    "Scalable, Enterprise-Grade Architecture",
                    "Dedicated Project Management",
                    "High-Performance & SEO-Optimized Delivery",
                    "Strict Security & Compliance Standards",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="bg-blue-500/10 p-1 rounded-full shrink-0">
                        <Check className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="text-zinc-300 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 pt-8 border-t border-zinc-800">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14"
                  >
                    <Link href="/contact">Speak with an Engineer</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AEO: Frequently Asked Questions */}
      <section className="py-24 bg-zinc-900/30 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight text-center mb-12">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="space-y-6">
            {service.faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <details className="group bg-zinc-900 border border-zinc-800 rounded-lg open:shadow-lg transition-all duration-200">
                  <summary className="cursor-pointer font-bold text-lg text-white p-6 marker:content-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-blue-500 group-open:rotate-45 transition-transform duration-200 text-2xl font-light">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-zinc-400 text-lg leading-relaxed border-t border-zinc-800 pt-4">
                    {faq.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
