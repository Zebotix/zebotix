import { type AILogMetadata } from "./logger";

type EventCallback = (metadata: AILogMetadata) => void | Promise<void>;

export class EventEmitter {
  private listeners: Record<string, EventCallback[]> = {};

  on(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  async emit(event: string, metadata: AILogMetadata) {
    const callbacks = this.listeners[event] || [];
    await Promise.all(callbacks.map(async (cb) => cb(metadata)));
  }
}

export const aiEvents = new EventEmitter();
