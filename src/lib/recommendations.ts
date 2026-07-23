import type { QuickQuoteInput } from "@/lib/validations";

import recommendationsData from "@/config/recommendations.json";

export interface Condition {
  field: string;
  operator: "equals" | "contains" | "notEmpty";
  value?: string;
}

export interface RecommendationRule {
  id: string;
  conditions: Condition[];
  conditionType?: "AND" | "OR"; // Default is AND
  priority: number;
  category: string;
  targetField?: string;
  suggestions: string[];
  message: string;
}

export function getRecommendations(formData: Partial<QuickQuoteInput>): RecommendationRule[] {
  const rules = recommendationsData as RecommendationRule[];
  const matchedRules: RecommendationRule[] = [];

  for (const rule of rules) {
    const isOr = rule.conditionType === "OR";
    let match = !isOr;

    for (const condition of rule.conditions) {
      const fieldValue = formData[condition.field as keyof QuickQuoteInput];
      let conditionMatch = false;

      switch (condition.operator) {
        case "equals":
          conditionMatch = fieldValue === condition.value;
          break;
        case "contains":
          if (Array.isArray(fieldValue)) {
            conditionMatch = fieldValue.includes(condition.value as string);
          }
          break;
        case "notEmpty":
          if (Array.isArray(fieldValue)) {
            conditionMatch = fieldValue.length > 0;
          } else {
            conditionMatch = !!fieldValue;
          }
          break;
      }

      if (isOr) {
        if (conditionMatch) match = true;
      } else {
        if (!conditionMatch) {
          match = false;
          break;
        }
      }
    }

    if (match) {
      matchedRules.push(rule);
    }
  }

  // Sort by priority (highest first)
  return matchedRules.sort((a, b) => b.priority - a.priority);
}
