import { logger as baseLogger } from "../../security/logger";

export interface AILogMetadata {
  workflowId?: string;
  agentId?: string;
  correlationId?: string;
  model?: string;
  provider?: string;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  cost?: number;
  latencyMs?: number;
  retryCount?: number;
  toolCalls?: string[];
  toolDurationMs?: number;
  modelSwitched?: boolean;
  fallbackReason?: string;
  workflowDurationMs?: number;
  success?: boolean;
  error?: string;
  [key: string]: unknown;
}

export const aiLogger = {
  info: (message: string, metadata?: AILogMetadata) => {
    baseLogger.info(`[AI] ${message}`, { ...metadata, component: 'ai-framework' });
  },
  warn: (message: string, metadata?: AILogMetadata) => {
    baseLogger.warn(`[AI] ${message}`, { ...metadata, component: 'ai-framework' });
  },
  error: (message: string, metadata?: AILogMetadata) => {
    baseLogger.error(`[AI] ${message}`, { ...metadata, component: 'ai-framework' });
  },
  debug: (message: string, metadata?: AILogMetadata) => {
    baseLogger.info(`[AI-DEBUG] ${message}`, { ...metadata, component: 'ai-framework' });
  }
};
