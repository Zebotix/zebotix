export const AI_MODELS = {
  // Google
  GEMINI_2_5_PRO: "gemini-2.5-pro",
  GEMINI_2_0_FLASH: "gemini-2.0-flash",
  GEMINI_2_0_FLASH_EXP: "gemini-2.0-flash-exp",
  GEMINI_1_5_PRO: "gemini-1.5-pro",
  // Groq
  LLAMA_3_2_3B: "llama-3.2-3b-preview",
  LLAMA_3_3_70B: "llama-3.3-70b-versatile",
  // Mistral
  MISTRAL_NEMO: "open-mistral-nemo",
  MISTRAL_PIXTRAL: "pixtral-12b-2409",
  MISTRAL_LARGE: "mistral-large-latest",
} as const;

export type AiModelId = typeof AI_MODELS[keyof typeof AI_MODELS];
