export function lerpInverse(a: number, b: number, t: number): number {
  const denominator = b - a
  return denominator === 0 ? 0 : (t - a) / denominator
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
