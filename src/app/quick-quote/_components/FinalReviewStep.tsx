import { Check } from "lucide-react";
import React from "react";
import { type UseFormReturn } from "react-hook-form";

import { Reveal } from "@/components/animations";
import {
  PROJECT_TYPES_MAPPING,
  PLATFORMS_MAPPING,
  FEATURES_MAPPING,
  AI_FEATURES_MAPPING,
  INTEGRATIONS_MAPPING,
  type EstimatorOptionDetails,
} from "@/config/estimator-mapping";
import { calculateEstimate, formatCurrency } from "@/lib/pricing";
import { type QuickQuoteInput } from "@/lib/validations";

interface FinalReviewStepProps {
  form: UseFormReturn<QuickQuoteInput>;
}

function getOption(
  dict: Record<string, EstimatorOptionDetails>,
  key: string
): { label: string; technicalDetails?: string } {
  const val = dict[key];
  if (val) return val;
  return { label: key };
}

export default function FinalReviewStep({ form }: FinalReviewStepProps) {
  const data = form.getValues();

  const estimateResult = calculateEstimate(
    {
      projectType: data.projectType,
      platforms: data.platforms,
      features: data.features,
      aiFeatures: data.wantsAI === "No" ? [] : data.aiFeatures,
      integrations: data.integrations,
      timeline: data.timeline,
    },
    data.country
  );

  // Update hidden form fields for cost
  React.useEffect(() => {
    if (data.country === "Pakistan") {
      form.setValue("estimatedCostPkr", estimateResult.total);
      form.setValue("estimatedCostUsd", null);
    } else {
      form.setValue("estimatedCostUsd", estimateResult.total);
      form.setValue("estimatedCostPkr", null);
    }
  }, [estimateResult.total, data.country, form]);

  const complexity =
    data.projectType === "ERP" ||
    data.projectType === "AI SaaS" ||
    data.features.length > 5 ||
    data.aiFeatures.length > 2
      ? "High"
      : data.features.length > 2 ||
          data.projectType === "Web App" ||
          data.projectType === "Mobile App"
        ? "Medium"
        : "Standard";

  const numMilestones = complexity === "High" ? 5 : complexity === "Medium" ? 3 : 2;
  const milestoneCost = Math.round(estimateResult.total / numMilestones);

  const SummaryCard = ({
    title,
    items,
  }: {
    title: string;
    items: (string | { label?: string; technicalDetails?: string })[];
  }) => {
    const [showTech, setShowTech] = React.useState(false);
    if (!items || items.length === 0) return null;
    const hasTechDetails = items.some(
      (item) => typeof item === "object" && item !== null && item.technicalDetails
    );

    return (
      <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-5 hover:bg-zinc-900/60 transition-colors h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{title}</h4>
          {hasTechDetails && (
            <button
              type="button"
              onClick={() => setShowTech(!showTech)}
              className="text-[10px] uppercase font-bold tracking-wider text-blue-400 hover:text-blue-300"
            >
              {showTech ? "Hide Tech Details" : "Show Tech Details"}
            </button>
          )}
        </div>
        <ul className="space-y-3 flex-1">
          {items.map((item, idx) => {
            const label = typeof item === "string" ? item : item?.label || "Unknown";
            const techDetails =
              typeof item === "object" && item !== null ? item.technicalDetails : null;

            return (
              <li key={idx} className="flex flex-col gap-1">
                <div className="text-zinc-300 text-sm flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-1.5 bg-blue-500 rounded-full shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <span className="leading-tight">{label}</span>
                </div>
                {showTech && techDetails && (
                  <div className="pl-3.5 ml-0.5 border-l border-zinc-800 text-xs text-zinc-500 mt-1">
                    {techDetails}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <Reveal>
      <div className="mb-8 border-b border-zinc-800/50 pb-6">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-tight">
          Project Proposal Review
        </h2>
        <p className="text-zinc-400 text-lg">
          Please review your project specifications before submitting to our architects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-5">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">
                Business Overview
              </h4>
              <p className="text-white font-bold text-lg mb-1">{data.name}</p>
              <p className="text-zinc-400 text-sm mb-1">{data.company || "Independent"}</p>
              <p className="text-blue-400 text-sm mb-1">{data.email}</p>
              <p className="text-zinc-500 text-sm">{data.country}</p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-5">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">
                Project Overview
              </h4>
              <p className="text-white font-bold text-lg mb-1">
                {getOption(PROJECT_TYPES_MAPPING, data.projectType).label}
              </p>
              <p className="text-zinc-400 text-sm mb-1">{data.businessType} Industry</p>
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-zinc-800/50 rounded-full text-xs font-bold text-zinc-300">
                Timeline: <span className="text-white">{data.timeline}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4 mt-2">Solution Roadmap</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SummaryCard
                title="Platforms"
                items={data.platforms.map((p) => getOption(PLATFORMS_MAPPING, p))}
              />
              <SummaryCard
                title="Design Style"
                items={data.designStyle.map((d) => ({ label: d }))}
              />
              <SummaryCard
                title="Core Features"
                items={data.features.map((p) => getOption(FEATURES_MAPPING, p))}
              />
              {data.wantsAI !== "No" && (
                <SummaryCard
                  title="AI Features"
                  items={data.aiFeatures.map((p) => getOption(AI_FEATURES_MAPPING, p))}
                />
              )}
              <SummaryCard
                title="Integrations"
                items={data.integrations.map((p) => getOption(INTEGRATIONS_MAPPING, p))}
              />
            </div>
          </div>

          {(data.projectGoals || data.details || data.additionalNotes) && (
            <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-6">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
                Project Goals & Description
              </h4>
              {data.projectGoals && (
                <>
                  <h5 className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">
                    Project Goals:
                  </h5>
                  <p className="text-zinc-300 text-sm mb-6 leading-relaxed whitespace-pre-wrap">
                    {data.projectGoals}
                  </p>
                </>
              )}
              {data.details && (
                <>
                  <h5 className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">
                    Project Description:
                  </h5>
                  <p className="text-zinc-300 text-sm mb-6 leading-relaxed whitespace-pre-wrap">
                    {data.details}
                  </p>
                </>
              )}
              {data.additionalNotes && (
                <>
                  <h5 className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">
                    Additional Context:
                  </h5>
                  <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {data.additionalNotes}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Detailed Module Cost Breakdown */}
          {estimateResult.moduleBreakdown && (
            <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-6">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
                Cost Breakdown by Module
              </h4>
              <p className="text-zinc-400 text-sm mb-6">
                This breakdown is based on the Professional tier.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(estimateResult.moduleBreakdown).map(([module, cost]) => (
                  <div
                    key={module}
                    className="flex justify-between items-center border-b border-zinc-800/50 pb-2"
                  >
                    <span className="text-zinc-300 text-sm">{module}</span>
                    <span className="text-white font-bold text-sm">
                      {formatCurrency(cost, data.country)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Options Section */}
          {data.engagementModel && (
            <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-6 overflow-hidden">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
                Payment & Engagement Options
              </h4>

              {data.engagementModel === "One-Time Project" ? (
                <div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 mb-6">
                    <h5 className="text-white font-bold mb-2">Option 1: Full Project Investment</h5>
                    <p className="text-zinc-400 text-sm">
                      Suitable for clients who want the complete solution delivered in one project
                      under a single quotation.
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Estimated Total Investment:</span>
                    <span className="text-2xl font-black text-white">
                      {formatCurrency(estimateResult.total, data.country)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-zinc-400 font-medium">Estimated Timeline:</span>
                    <span className="text-white font-bold">{data.timeline}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-5 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="text-white font-bold">
                        Option 2: Milestone-Based Development
                      </h5>
                      <span className="bg-emerald-500 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">
                      Your project is divided into logical milestones. You pay only after each
                      milestone begins or is completed (according to the agreed contract), reducing
                      upfront investment and building trust.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zinc-300">
                      {[
                        "Lower initial investment",
                        "Reduced project risk",
                        "Transparent progress",
                        "Clear deliverables",
                        "Easier budgeting",
                      ].map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-emerald-500" /> {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-zinc-700 before:to-transparent">
                    {Array.from({ length: numMilestones }).map((_, i) => (
                      <div
                        key={i}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 group-[.is-active]:text-emerald-500 group-[.is-active]:border-emerald-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(16,185,129,0.2)] z-10">
                          <span className="text-sm font-bold">{i + 1}</span>
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-zinc-900/50 p-4 rounded-xl border border-zinc-700/50">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-bold text-white text-sm">
                              {i === 0
                                ? "Discovery & Architecture"
                                : i === numMilestones - 1
                                  ? "Testing & Deployment"
                                  : `Core Phase ${i}`}
                            </h5>
                          </div>
                          <div className="text-zinc-400 text-xs mb-3">
                            {i === 0
                              ? "Planning, UI/UX, Setup"
                              : i === numMilestones - 1
                                ? "QA, Launch, Support"
                                : "Development, Logic, APIs"}
                          </div>
                          <div className="text-emerald-400 font-bold text-sm">
                            {formatCurrency(milestoneCost, data.country)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-lg text-sm text-zinc-400 text-center">
                    <p>
                      We recommend milestone-based development for medium and large projects because
                      it provides better transparency, manageable investment, and continuous
                      collaboration throughout the development lifecycle.
                    </p>
                  </div>
                </div>
              )}

              <p className="mt-6 text-xs text-zinc-500 text-center uppercase tracking-wider font-bold">
                * Note: This is for planning only. No online payments are required.
              </p>
            </div>
          )}
        </div>

        <div>
          {estimateResult.tiers && (
            <div className="space-y-4 sticky top-6">
              <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
                Investment Options
              </h4>

              <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-5 hover:border-zinc-500 transition-all">
                <h5 className="text-zinc-400 font-bold mb-1">Essential</h5>
                <p className="text-xs text-zinc-500 mb-3">Core business functionality only.</p>
                <div className="text-2xl font-black text-white">
                  {formatCurrency(estimateResult.tiers.essential, data.country)}
                </div>
              </div>

              <div className="bg-linear-to-b from-blue-900/20 to-zinc-900/40 border border-blue-500/50 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] transform scale-105 z-10">
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg tracking-wider">
                  Recommended
                </div>
                <h5 className="text-blue-400 font-bold mb-1">Professional</h5>
                <p className="text-xs text-zinc-400 mb-3">
                  Best value for most growing businesses.
                </p>
                <div className="text-3xl font-black text-white mb-4">
                  {formatCurrency(estimateResult.tiers.professional, data.country)}
                </div>
                <div className="space-y-2 border-t border-blue-500/20 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Timeline</span>
                    <span className="text-white font-bold">{data.timeline}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Team Size</span>
                    <span className="text-white font-bold">3-5 Experts</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Complexity</span>
                    <span className="text-white font-bold">{complexity}</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-700/50 rounded-xl p-5 hover:border-zinc-500 transition-all">
                <h5 className="text-purple-400 font-bold mb-1">Premium</h5>
                <p className="text-xs text-zinc-500 mb-3">Advanced UI, scalable, future-ready.</p>
                <div className="text-2xl font-black text-white">
                  {formatCurrency(estimateResult.tiers.premium, data.country)}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-800/50 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                  <Check className="h-4 w-4" />
                  No Hidden Charges. Ever.
                </div>
                <p className="text-zinc-500 text-xs text-center leading-relaxed">
                  The prices above represent realistic budget ranges based on actual past projects.
                  Final proposal will be provided after discovery call.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
