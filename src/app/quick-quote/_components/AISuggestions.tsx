import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

import type { QuickQuoteInput } from "@/lib/validations";

import { Reveal } from "@/components/animations";
import { getRecommendations, type RecommendationRule } from "@/lib/recommendations";


interface AISuggestionsProps {
  formData: Partial<QuickQuoteInput>;
  onSelect?: (suggestion: string, targetField?: string) => void;
}

export default function AISuggestions({ formData, onSelect }: AISuggestionsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationRule[]>([]);

  useEffect(() => {
    // We add a tiny delay to make it feel like "AI thinking"
    const timer = setTimeout(() => {
      setRecommendations(getRecommendations(formData));
    }, 400);
    return () => clearTimeout(timer);
  }, [formData]);

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4 mt-8">
      {recommendations.slice(0, 2).map((rec) => (
        <Reveal key={rec.id}>
          <div className="bg-blue-950/20 border border-blue-900 p-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-600/10 rounded-full blur-xl" />
            <div className="flex items-start gap-3 relative z-10">
              <div className="bg-blue-900/50 p-2 text-blue-400 shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  AI Recommendation
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed mb-2">
                  {rec.message}
                </p>
                <div className="flex flex-wrap gap-2">
                  {rec.suggestions.map((s, idx) => {
                    // Check if already selected if targetField is valid and is an array
                    const fieldVal = rec.targetField ? formData[rec.targetField as keyof QuickQuoteInput] : undefined;
                    const isSelected = Array.isArray(fieldVal) && fieldVal.includes(s);
                    
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (onSelect) {
                            onSelect(s, rec.targetField);
                          }
                        }}
                        className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold transition-all border ${
                          isSelected 
                            ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                            : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-blue-500/50 hover:bg-blue-950/50"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
