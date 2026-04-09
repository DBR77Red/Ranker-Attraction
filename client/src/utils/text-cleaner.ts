/**
 * Removes URLs and cleans up text for display
 */
export function cleanDescription(text: string): string {
  // Remove URLs (http/https and www)
  return text
    .replace(/https?:\/\/[^\s]+/g, '')
    .replace(/www\.[^\s]+/g, '')
    .trim();
}
