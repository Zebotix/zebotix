import { aiLogger } from "../core/logger";

export type AgentExecuteFn<Input, Output> = (input: Input) => Promise<Output>;

export interface AIAgent<Input = unknown, Output = unknown> {
  id: string;
  name: string;
  description: string;
  execute: AgentExecuteFn<Input, Output>;
}

class AgentRegistry {
  private agents: Map<string, AIAgent<never, unknown>> = new Map();

  register<I, O>(agent: AIAgent<I, O>) {
    if (this.agents.has(agent.id)) {
      aiLogger.warn(`Agent ${agent.id} is already registered. Overwriting.`);
    }
    this.agents.set(agent.id, agent);
    aiLogger.info(`Registered Agent: ${agent.id} - ${agent.name}`);
  }

  get<I, O>(agentId: string): AIAgent<I, O> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found in registry.`);
    }
    return agent as unknown as AIAgent<I, O>;
  }

  list(): AIAgent<never, unknown>[] {
    return Array.from(this.agents.values());
  }
}

export const agentRegistry = new AgentRegistry();
