import { generateObject, generateText, type ToolSet } from "ai";
import { type z } from "zod";

import { aiEvents } from "./events";
import { aiLogger } from "./logger";
import { ModelRouter } from "./model-router";
import { type AiModelId } from "../config/models";
import { AI_TIMEOUTS } from "../config/timeouts";

export interface AgentExecutionOptions<T> {
  workflowId: string;
  agentId: string;
  correlationId?: string;
  preferredModel: AiModelId;
  provider?: string;
  instructions: string;
  prompt: string;
  schema?: z.ZodType<T>;
  tools?: ToolSet;
  maxRetries?: number;
}

export class AgentExecutor {
  static async execute<T = string>(options: AgentExecutionOptions<T>): Promise<T> {
    const {
      workflowId,
      agentId,
      preferredModel,
      provider = "google",
      schema,
      maxRetries = AI_TIMEOUTS.MAX_RETRIES,
    } = options;
    const correlationId = options.correlationId || crypto.randomUUID();

    let attempt = 0;
    let lastError: Error | undefined;
    const startTime = Date.now();

    let currentProvider = provider;
    let currentModelId = preferredModel;

    while (attempt < maxRetries) {
      attempt++;
      try {
        const { model, providerId, modelId } = ModelRouter.getModel(
          currentModelId,
          currentProvider
        );
        currentProvider = providerId;
        currentModelId = modelId as AiModelId;

        aiLogger.info(`Starting execution attempt ${attempt}`, {
          workflowId,
          agentId,
          correlationId,
          model: currentModelId,
          provider: currentProvider,
          retryCount: attempt - 1,
        });

        if (schema) {
          const result = await generateObject({
            model,
            schema,
            system: options.instructions,
            prompt: options.prompt,
            tools: options.tools,
          });

          const durationMs = Date.now() - startTime;
          const usage = result.usage as unknown as {
            promptTokens?: number;
            completionTokens?: number;
            totalTokens?: number;
          };
          const metadata = {
            workflowId,
            agentId,
            correlationId,
            model: currentModelId,
            provider: currentProvider,
            inputTokens: usage?.promptTokens,
            outputTokens: usage?.completionTokens,
            totalTokens: usage?.totalTokens,
            latencyMs: durationMs,
            retryCount: attempt - 1,
            success: true,
          };
          aiLogger.info("Execution successful", metadata);
          await aiEvents.emit("agent:success", metadata);

          return result.object as T;
        } else {
          const result = await generateText({
            model,
            system: options.instructions,
            prompt: options.prompt,
            tools: options.tools,
          });

          const durationMs = Date.now() - startTime;
          const usage = result.usage as unknown as {
            promptTokens?: number;
            completionTokens?: number;
            totalTokens?: number;
          };
          const metadata = {
            workflowId,
            agentId,
            correlationId,
            model: currentModelId,
            provider: currentProvider,
            inputTokens: usage?.promptTokens,
            outputTokens: usage?.completionTokens,
            totalTokens: usage?.totalTokens,
            latencyMs: durationMs,
            retryCount: attempt - 1,
            success: true,
          };
          aiLogger.info("Execution successful", metadata);
          await aiEvents.emit("agent:success", metadata);

          return result.text as unknown as T;
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        aiLogger.warn(`Execution attempt ${attempt} failed`, {
          workflowId,
          agentId,
          correlationId,
          model: currentModelId,
          provider: currentProvider,
          error: lastError?.message,
        });

        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, AI_TIMEOUTS.RETRY_DELAY_MS * attempt));
          if (attempt === 1 && currentProvider === "google") {
            currentProvider = "groq";
            currentModelId = "llama-3.1-70b-versatile";
          }
        }
      }
    }

    const durationMs = Date.now() - startTime;
    const metadata = {
      workflowId,
      agentId,
      correlationId,
      model: currentModelId,
      provider: currentProvider,
      latencyMs: durationMs,
      retryCount: attempt,
      success: false,
      error: lastError?.message,
    };
    aiLogger.error("Execution completely failed", metadata);
    await aiEvents.emit("agent:failure", metadata);

    throw new Error(
      `Agent execution failed after ${maxRetries} attempts. Last error: ${lastError?.message}`
    );
  }
}
