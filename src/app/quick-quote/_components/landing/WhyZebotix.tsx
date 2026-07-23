import {
  Code2,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Cpu,
  MonitorSmartphone,
  Headset,
} from "lucide-react";
import React from "react";

import { Reveal } from "@/components/animations";

export default function WhyZebotix() {
  const features = [
    {
      title: "Experienced Engineers",
      description:
        "Our team consists of senior developers who have built robust systems for global enterprises.",
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Modern Technologies",
      description:
        "We use cutting-edge, future-proof stacks like Next.js, React, and Node.js to ensure top performance.",
      icon: <MonitorSmartphone className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Clean Architecture",
      description:
        "We write maintainable, scalable, and beautifully structured code that your future developers will love.",
      icon: <Code2 className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Scalable Systems",
      description:
        "Built to handle thousands of users seamlessly without compromising on speed or reliability.",
      icon: <Layers className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Security First",
      description:
        "Enterprise-grade security practices embedded into every layer of your application from day one.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Premium UI/UX",
      description:
        "We design gorgeous, intuitive interfaces that maximize user engagement and conversion rates.",
      icon: <Sparkles className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Transparent Communication",
      description:
        "No technical jargon. We provide clear, milestone-based updates throughout the entire process.",
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Long-Term Support",
      description:
        "We don't just launch and leave. We offer continuous maintenance and iterative feature improvements.",
      icon: <Headset className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Why Partner With Zebotix?
            </h2>
            <p className="text-zinc-400 text-lg">
              We don't just write code. We architect solutions that solve real business problems,
              drive revenue, and scale infinitely.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="bg-zinc-900/50 border border-zinc-800/50 p-6 h-full flex flex-col hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3 relative z-10">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
