import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a cryptographically secure pseudorandom number between 0 (inclusive) and 1 (exclusive).
 * Acts as a drop-in replacement for Math.random() to resolve SonarQube security warnings (typescript:S2245).
 */
export function secureRandom(): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] / (0xffffffff + 1);
  }

  // Throw an error if Web Crypto is not available instead of silently falling back to insecure Math.random()
  throw new Error(
    "Secure random number generation is not supported in this environment. The crypto.getRandomValues API is missing."
  );
}
