import { FileText, CheckCircle2 } from "lucide-react";

import { type QuickQuoteInput } from "@/lib/validations";

interface StickySummaryProps {
  formData: Partial<QuickQuoteInput>;
}

export default function StickySummary({ formData }: StickySummaryProps) {
  const getSelectedCount = (arr?: string[]) => (arr ? arr.length : 0);

  const completedSections = [
    { label: "Basic Info", active: !!formData.name },
    { label: "Project Type", active: !!formData.projectType },
    { label: "Project Goals", active: !!formData.projectGoals },
    { label: "Platforms", active: getSelectedCount(formData.platforms) > 0 },
    { label: "Features", active: getSelectedCount(formData.features) > 0 },
    { label: "Timeline", active: !!formData.timeline },
  ];

  const totalSteps = completedSections.length;
  const completedSteps = completedSections.filter((s) => s.active).length;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-8 sticky top-32 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
      
      <div className="flex items-center gap-4 border-b border-zinc-800/50 pb-6 mb-8 relative z-10">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-3 rounded-xl text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Project Scope</h3>
          <p className="text-sm text-zinc-500 font-medium">Live specifications</p>
        </div>
      </div>

      <div className="space-y-8 relative z-10">
        <div>
          <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-wider">
            <span className="text-zinc-500">Completion</span>
            <span className="text-blue-400">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-950/50 rounded-full relative overflow-hidden border border-zinc-800/50">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {completedSections.map((section, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between text-sm font-medium transition-colors ${
                section.active ? "text-zinc-200" : "text-zinc-600"
              }`}
            >
              <span>{section.label}</span>
              {section.active && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-full" />
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800/50 pt-6 mt-8">
          <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
            Selected Modules
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              ...(formData.platforms || []),
              ...(formData.features || []),
              ...(formData.aiFeatures || []),
              ...(formData.integrations || []),
            ]
              .slice(0, 8)
              .map((item, idx) => (
                <span
                  key={idx}
                  className="bg-zinc-950/50 text-zinc-300 text-xs px-3 py-1.5 font-medium border border-zinc-800/80 rounded-lg truncate max-w-[140px] hover:border-zinc-700 transition-colors"
                >
                  {item}
                </span>
              ))}
            {getSelectedCount(formData.platforms) +
              getSelectedCount(formData.features) +
              getSelectedCount(formData.aiFeatures) +
              getSelectedCount(formData.integrations) >
              8 && (
              <span className="bg-zinc-900 text-zinc-400 text-xs px-3 py-1.5 font-bold border border-zinc-800 rounded-lg">
                + more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
