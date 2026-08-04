export const PROVIDER_CONFIG = {
  google: {
    enabled: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    priority: 1,
    rateLimitPerMinute: 15,
  },
  groq: {
    enabled: !!process.env.GROQ_API_KEY,
    priority: 2,
    rateLimitPerMinute: 30,
  },
  mistral: {
    enabled: !!process.env.MISTRAL_API_KEY,
    priority: 3,
    rateLimitPerMinute: 10,
  },
};
