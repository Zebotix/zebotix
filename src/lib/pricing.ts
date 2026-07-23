import internationalPricing from "@/config/pricing-international.json";
import pakistanPricing from "@/config/pricing-pakistan.json";

export type Currency = "usd" | "pkr";

export interface EstimationParams {
  projectType: string;
  platforms: string[];
  features: string[];
  aiFeatures: string[];
  integrations: string[];
  timeline: string;
}

export interface EstimateResult {
  total: number;
  tiers?: {
    essential: number;
    professional: number;
    premium: number;
  };
  moduleBreakdown?: Record<string, number>;
}

export function calculateEstimate(params: EstimationParams, country: string): EstimateResult {
  let total = 0;

  const pricing = country === "Pakistan" ? pakistanPricing : internationalPricing;

  // 1. Base Project Type
  const baseCost = (pricing.projectTypes as Record<string, number>)[params.projectType];
  if (baseCost) {
    total += baseCost;
  }

  // 2. Platforms
  params.platforms.forEach((platform) => {
    const cost = (pricing.platforms as Record<string, number>)[platform];
    if (cost) {
      total += cost;
    }
  });

  // 3. Features
  params.features.forEach((feature) => {
    const cost = (pricing.features as Record<string, number>)[feature];
    if (cost) {
      total += cost;
    }
  });

  // 4. AI Features
  params.aiFeatures.forEach((aiFeature) => {
    const cost = (pricing.aiFeatures as Record<string, number>)[aiFeature];
    if (cost) {
      total += cost;
    }
  });

  // 5. Integrations
  params.integrations.forEach((integration) => {
    const cost = (pricing.integrations as Record<string, number>)[integration];
    if (cost) {
      total += cost;
    }
  });

  // 6. Timeline Multiplier
  const multiplier = (pricing.timelineModifiers as Record<string, number>)[params.timeline] || 1;
  
  total = Math.round(total * multiplier);

  // Professional is the standard calculated total
  const professional = total;
  const essential = Math.round(total * 0.7); // 30% cheaper for core only
  const premium = Math.round(total * 1.4); // 40% more for advanced/future-ready
  
  // Module breakdown based on Professional tier
  const moduleBreakdown = {
    "UI/UX Design": Math.round(professional * 0.15),
    "Frontend Development": Math.round(professional * 0.25),
    "Backend Development": Math.round(professional * 0.30),
    "Database": Math.round(professional * 0.10),
    "Integrations": Math.round(professional * 0.05),
    "Testing": Math.round(professional * 0.05),
    "Deployment": Math.round(professional * 0.05),
    "Support & Maintenance": Math.round(professional * 0.05),
  };

  return {
    total,
    tiers: {
      essential,
      professional,
      premium,
    },
    moduleBreakdown,
  };
}

export function formatCurrency(amount: number, country: string): string {
  if (country === "Pakistan") {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
