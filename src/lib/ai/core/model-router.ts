import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { createMistral } from "@ai-sdk/mistral";
import { type LanguageModel } from "ai";

import { aiLogger } from "./logger";
import { AI_MODELS, type AiModelId } from "../config/models";
import { PROVIDER_CONFIG } from "../config/providers";

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
const mistral = createMistral({ apiKey: process.env.MISTRAL_API_KEY });

export interface ModelProvider {
  id: string;
  name: string;
  getInstance: (modelId: string) => LanguageModel;
  isEnabled: () => boolean;
}

const providers: Record<string, ModelProvider> = {
  google: {
    id: "google",
    name: "Google Gemini",
    getInstance: (modelId) => google(modelId),
    isEnabled: () => PROVIDER_CONFIG.google.enabled,
  },
  groq: {
    id: "groq",
    name: "Groq",
    getInstance: (modelId) => groq(modelId),
    isEnabled: () => PROVIDER_CONFIG.groq.enabled,
  },
  mistral: {
    id: "mistral",
    name: "Mistral AI",
    getInstance: (modelId) => mistral(modelId),
    isEnabled: () => PROVIDER_CONFIG.mistral.enabled,
  },
};

const modelStats: Record<string, { attempts: number; successes: number; lastFailedAt?: Date }> = {};

export function getModelStats(modelId: string) {
  if (!modelStats[modelId]) {
    modelStats[modelId] = { attempts: 0, successes: 0 };
  }
  return modelStats[modelId];
}

export class ModelRouter {
  static getModel(preferredModelId: AiModelId | string, providerId: string = "google"): { model: LanguageModel; providerId: string; modelId: string } {
    const provider = providers[providerId];
    if (provider && provider.isEnabled()) {
      return { model: provider.getInstance(preferredModelId), providerId, modelId: preferredModelId };
    }
    
    // Fallback logic - find any available provider
    for (const [id, p] of Object.entries(providers)) {
      if (p.isEnabled()) {
        aiLogger.warn(`Preferred provider ${providerId} unavailable. Falling back to ${id}.`, {
          fallbackReason: `Provider ${providerId} not enabled or misconfigured`,
        });
        
        let fallbackModelId: string = AI_MODELS.GEMINI_1_5_PRO;
        if (id === "groq") fallbackModelId = AI_MODELS.LLAMA_3_1_70B;
        if (id === "mistral") fallbackModelId = AI_MODELS.MISTRAL_NEMO;
        
        return { model: p.getInstance(fallbackModelId), providerId: id, modelId: fallbackModelId };
      }
    }
    
    throw new Error("No AI providers available. Check configuration.");
  }
}
