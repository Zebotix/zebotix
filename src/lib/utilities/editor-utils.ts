export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w-]+/g, '')     // Remove all non-word chars
    .replace(/--+/g, '-');       // Replace multiple - with single -
}

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export function calculateWordCount(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}
