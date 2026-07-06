import { ArrowRight, Globe2, Heart, Laptop, Rocket, Zap, Coffee } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/animations";
import { Button } from "@/components/ui/Button";
import { COMPANY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Careers — ${COMPANY_NAME}`,
  description: "Join Zebotix and build the future of digital platforms. We are a fully remote team focused on engineering excellence and innovation.",
  alternates: {
    canonical: `${SITE_URL}/careers`,
  },
};

const perks = [
  {
    icon: Globe2,
    title: "Work From Anywhere",
    description: "We are a remote-first team. Work from the comfort of your home, a cafe, or anywhere in the world.",
  },
  {
    icon: Laptop,
    title: "Modern Tech Stack",
    description: "Work with the latest technologies including Next.js, React, Node.js, and modern cloud infrastructure.",
  },
  {
    icon: Zap,
    title: "Fast-Paced Environment",
    description: "Build products that scale rapidly. We believe in shipping fast, learning, and iterating.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health coverage for you and your dependents, plus mental health and wellness stipends.",
  },
  {
    icon: Rocket,
    title: "Learning Budget",
    description: "Annual stipend for courses, books, conferences, and any material that helps you level up.",
  },
  {
    icon: Coffee,
    title: "Flexible Hours",
    description: "We care about what you deliver, not when you clock in. Enjoy a flexible schedule that fits your life.",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 bg-zinc-950 text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-24 sm:mb-32">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-blue-500 font-black mb-6 block">
              Join Our Team
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter leading-tight">
              Build the future of digital platforms with us.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed font-medium">
              At {COMPANY_NAME}, we are on a mission to engineer high-performance software that transforms modern companies. We are a diverse, fully remote team of builders, designers, and innovators.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 px-8 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)]">
              <Link href="/careers/jobs">
                View Open Roles
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </Reveal>
        </section>

        {/* Culture & Perks Section */}
        <section className="mb-24">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Why join {COMPANY_NAME}?</h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                We believe that doing your best work requires an environment that supports you both professionally and personally.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {perks.map((perk, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:bg-zinc-900 transition-colors h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                    <perk.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{perk.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <Reveal>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15)_0%,transparent_100%)] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to make an impact?</h2>
                <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
                  Even if you don't see a role that fits your exact profile, we are always on the lookout for exceptional talent. Reach out to us.
                </p>
                <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200 font-bold h-12 px-8">
                  <Link href="/careers/jobs">
                    Explore Openings
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
        
      </div>
    </main>
  );
}
