import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code } from "lucide-react";
import { SEO_SERVICES } from "@/lib/seo-services";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";
import { Reveal } from "@/components/animations";

export const metadata: Metadata = {
  title: `Our IT Services & Custom Software Solutions | ${COMPANY_NAME}`,
  description:
    "Explore Zebotix's comprehensive suite of IT services, from custom web and mobile app development to enterprise AI solutions and IT consulting.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Our IT Services & Custom Software Solutions | ${COMPANY_NAME}`,
    description:
      "Explore Zebotix's comprehensive suite of IT services, from custom web and mobile app development to enterprise AI solutions and IT consulting.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-300 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <header className="max-w-3xl mb-16">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
              Our IT Services & Capabilities
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              We provide end-to-end software engineering and IT consulting services for forward-thinking enterprises.
            </p>
          </Reveal>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEO_SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={0.1 * (index % 3)}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full bg-zinc-900/50 border border-zinc-800 p-8 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center mb-6">
                  <Code className="text-blue-500 w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.keyword}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {service.content}
                </p>
                <div className="flex items-center text-blue-500 font-bold text-sm uppercase tracking-wider mt-auto">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
