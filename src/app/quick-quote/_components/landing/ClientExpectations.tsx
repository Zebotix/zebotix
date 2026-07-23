import { AlertCircle, Scale, Milestone, Eye } from "lucide-react";
import React from "react";

import { Reveal } from "@/components/animations";

export default function ClientExpectations() {
  const expectations = [
    {
      title: "No Hidden Charges",
      desc: "What we quote for the agreed scope is what you pay. We don't believe in surprise invoices.",
      icon: <AlertCircle className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "Milestone-Based Execution",
      desc: "Payments and deliverables are tied to clear, verifiable milestones. You see progress before you pay.",
      icon: <Milestone className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "Transparent Communication",
      desc: "Direct access to your project manager and development team via Slack or Microsoft Teams.",
      icon: <Eye className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "Fair Adjustments",
      desc: "If your requirements change, we openly discuss timeline and budget impacts before proceeding.",
      icon: <Scale className="w-6 h-6 text-emerald-500" />,
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <Reveal className="flex-1">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Clear Expectations. <br />
                <span className="text-zinc-500">No Surprises.</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                The estimate you receive from our interactive wizard is for planning purposes. Final
                pricing is established only after a detailed discovery discussion where we align on
                every technical and business requirement.
              </p>
              <div className="p-6 bg-blue-900/10 border border-blue-500/20 text-blue-100 rounded-sm">
                <span className="font-bold block mb-2 text-blue-400">Our Guarantee</span>
                We are committed to building long-term partnerships. That means prioritizing your
                ROI over short-term gains.
              </div>
            </div>
          </Reveal>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {expectations.map((exp, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-zinc-900 border border-zinc-800 p-6 h-full hover:border-emerald-500/30 transition-colors">
                  <div className="w-12 h-12 bg-zinc-950 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                    {exp.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2">{exp.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
