import {
  Target,
  Eye,
  ShoppingCart,
  GraduationCap,
  Building,
  Calculator,
  Headset,
  Smartphone,
  LineChart,
  Server,
  ShieldCheck,
} from "lucide-react";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";
import { generateOrganizationSchema, getSanitizedSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: `About Us — ${COMPANY_NAME}`,
  description:
    "Learn about Zebotix, our mission, digital services, team, and how we help businesses grow.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Us — ${COMPANY_NAME}`,
    description:
      "Learn about Zebotix, our mission, digital services, team, and how we help businesses grow.",
    url: `${SITE_URL}/about`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${COMPANY_NAME} About` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us — ${COMPANY_NAME}`,
    description:
      "Learn about Zebotix, our mission, digital services, team, and how we help businesses grow.",
    images: ["/og-image.png"],
  },
};

const coreServices = [
  {
    icon: ShoppingCart,
    title: "E‑commerce & Marketplaces",
    desc: "Custom stores and multi-vendor platforms.",
  },
  {
    icon: GraduationCap,
    title: "Learning Management (LMS)",
    desc: "Training portals and educational systems.",
  },
  {
    icon: Building,
    title: "Hotel & Hospitality",
    desc: "Management systems for hotels and booking.",
  },
  {
    icon: Calculator,
    title: "Finance & ERP",
    desc: "Invoicing, payroll, and small ERP solutions.",
  },
  { icon: Headset, title: "CRM & Helpdesk", desc: "Customer support and relationship platforms." },
  { icon: Smartphone, title: "Mobile Apps", desc: "PWA & native apps for iOS and Android." },
  { icon: LineChart, title: "Data Analytics", desc: "BI dashboards and third-party integrations." },
  {
    icon: Server,
    title: "Hosting & Maintenance",
    desc: "Reliable SLAs and infrastructure management.",
  },
];

export default function About() {
  const schema = generateOrganizationSchema();

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getSanitizedSchema(schema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-black uppercase tracking-widest border border-blue-500/20">
                Who We Are
              </div>
              <h1 className="text-4xl lg:text-6xl font-black leading-tight uppercase tracking-tighter">
                About <span className="text-blue-500">{COMPANY_NAME}</span>
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                Zebotix is a Karachi-based digital services studio that builds web and mobile
                products, e-commerce stores, and tailored business systems for local and
                international clients. We combine pragmatic engineering, product design, and digital
                marketing to help small & medium-sized businesses launch quickly and scale
                sustainably.
              </p>
            </div>
          </Reveal>
          <Reveal distance={40} delay={0.2}>
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <Image
                src="/about_hero.webp"
                alt="Zebotix Workspace"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-tr from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-zinc-900/50 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="bg-zinc-950 p-10 rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-colors h-full group">
              <Target className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed">
                Enable Pakistani businesses to compete globally by delivering reliable, compliant,
                and easy-to-run digital products.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-zinc-950 p-10 rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-colors h-full group">
              <Eye className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Our Vision</h2>
              <p className="text-zinc-400 leading-relaxed">
                Be the trusted partner for marketplaces, e-commerce brands, service businesses, and
                startups seeking fast, secure, and legally-compliant digital solutions from
                Pakistan.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4">
                What We Do
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Core services and digital solutions we offer to scale your business.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-colors h-full">
                    <Icon className="w-8 h-8 text-blue-500 mb-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-400">{service.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-24 bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
              <Image
                src="/about_process.webp"
                alt="Agile Workflow Process"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="space-y-10">
            <Reveal>
              <div>
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4">
                  How We Work
                </h2>
                <p className="text-zinc-400">
                  Our pragmatic, agile process ensures timely and high-quality delivery.
                </p>
              </div>
            </Reveal>
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Proposal",
                  desc: "We collect requirements, scope features, propose milestones and agree on payment schedule.",
                },
                {
                  step: "02",
                  title: "Design & Development",
                  desc: "Agile sprints with regular demos on staging URLs; UAT window for acceptance.",
                },
                {
                  step: "03",
                  title: "Launch & Handover",
                  desc: "Production deployment, repository access, documentation, and handover checklist.",
                },
                {
                  step: "04",
                  title: "Support & Maintenance",
                  desc: "Optional support windows and paid maintenance plans with defined SLAs.",
                },
              ].map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="flex gap-6 group">
                    <div className="shrink-0 text-3xl font-black text-zinc-800 group-hover:text-blue-500 transition-colors">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-wider mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <Reveal>
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4">
                Trust, Compliance & Security
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                We publish and adhere to standard legal and security documents to build trust with
                clients and end users.
              </p>
              <ul className="space-y-4">
                {[
                  "Terms & Conditions for projects and IP.",
                  "Privacy & Cookie Policies for data handling.",
                  "GDPR / DPA for EU clients with breach notifications.",
                  "PCI-compliant payment processors.",
                  "Strict security practices including HTTPS & backups.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="order-1 lg:order-2">
            <div className="relative h-[300px] lg:h-[400px] w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
              <Image
                src="/shield_illustration.webp"
                alt="Digital Security Shield"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing & Onboarding Info Grid */}
      <section className="py-20 bg-zinc-900/50 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Reveal>
            <div className="p-8 bg-zinc-950 rounded-2xl border border-zinc-800 h-full hover:border-zinc-700 transition-colors">
              <h3 className="text-lg font-black uppercase tracking-wider mb-4 text-blue-500">
                Pricing & Payments
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Standard payment schedule: <strong>50% upfront</strong>,{" "}
                <strong>40% staging</strong>, <strong>10% final</strong>. All payments default to
                PKR. Invoices exclude applicable taxes.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-8 bg-zinc-950 rounded-2xl border border-zinc-800 h-full hover:border-zinc-700 transition-colors">
              <h3 className="text-lg font-black uppercase tracking-wider mb-4 text-blue-500">
                Portfolio & Clients
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We work globally. We retain the right to showcase delivered work unless an NDA is
                signed. Contact us for case studies.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="p-8 bg-zinc-950 rounded-2xl border border-zinc-800 h-full hover:border-zinc-700 transition-colors">
              <h3 className="text-lg font-black uppercase tracking-wider mb-4 text-blue-500">
                Onboarding Checklist
              </h3>
              <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4">
                <li>Signed contract & upfront payment</li>
                <li>Complete brief & branding</li>
                <li>Secure credentials sharing</li>
                <li>Weekly progress syncs</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Custom Inspired CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <Reveal distance={40}>
            <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-16 relative overflow-hidden rounded-2xl select-none shadow-2xl">
              {/* Abstract glow effects */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-3/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4 block">
                    Ready to Scale?
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-[1.1] uppercase tracking-tighter">
                    Empower your digital presence.
                    <br />
                    <span className="text-blue-500">Let's grow together.</span>
                  </h2>
                  <p className="text-zinc-400 text-sm mb-10 max-w-xl leading-relaxed">
                    Whether you need an e-commerce marketplace, a robust LMS, or a custom mobile
                    application, our team is ready to bring your vision to life with speed and
                    precision.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-wider h-14 px-8 rounded-none border border-white/10"
                    >
                      <Link href="/quick-quote">Start Your Project</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-zinc-800 text-zinc-300 hover:bg-zinc-850 hover:text-white h-14 px-8 rounded-none bg-transparent"
                    >
                      <Link href="/contact">Talk to Our Team</Link>
                    </Button>
                  </div>
                </div>

                <div className="lg:w-2/5 w-full">
                  <div className="relative border border-zinc-800 rounded-none bg-zinc-950 p-2">
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                    <Image
                      width={500}
                      height={400}
                      src="/about_cta.webp"
                      alt="Business Growth and Partnership"
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="w-full grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 rounded-none object-cover border border-zinc-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
