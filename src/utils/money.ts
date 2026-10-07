/** Parses "$29.99" or "Item total: $29.99" into integer cents (avoids float rounding bugs). */
export function toCents(text: string): number {
  const match = text.match(/\$(\d+(?:\.\d{1,2})?)/);
  if (!match) {
    throw new Error(`No money amount found in: "${text}"`);
  }
  return Math.round(parseFloat(match[1]) * 100);
}

export function percentOf(cents: number, percent: number): number {
  return Math.round((cents * percent) / 100);
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
