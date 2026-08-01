import { Check } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";
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

  return (
    <main className="bg-zinc-950 text-zinc-300 min-h-screen">
      <HeroSection
        eyebrow={`Top-Tier ${service.keyword}`}
        title={service.heroHeadline}
        description={service.heroSubheadline}
        primaryCta={{ href: "/quick-quote", label: "Request an Estimate" }}
      />

      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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

          <Reveal delay={0.2}>
            <div className="bg-zinc-900/40 p-8 md:p-12 border border-zinc-800">
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
                <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14">
                  <Link href="/contact">Speak with an Engineer</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
