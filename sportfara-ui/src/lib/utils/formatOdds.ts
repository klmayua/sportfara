export function formatDecimalOdds(odds: number): string {
  return odds.toFixed(2);
}

export function decimalToFractional(decimal: number): string {
  const fraction = decimal - 1;
  const precision = 100;
  const numerator = Math.round(fraction * precision);
  const denominator = precision;
  const gcd = findGCD(numerator, denominator);
  return `${numerator / gcd}/${denominator / gcd}`;
}

function findGCD(a: number, b: number): number {
  return b === 0 ? a : findGCD(b, a % b);
}

export function formatOdds(
  odds: number,
  format: "decimal" | "fractional" = "decimal"
): string {
  if (format === "fractional") return decimalToFractional(odds);
  return formatDecimalOdds(odds);
}

export function getBestOdds(lines: number[]): number {
  return Math.max(...lines);
}
