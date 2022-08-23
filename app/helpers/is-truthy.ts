type Falsy = false | 0 | "" | null | undefined
export const isTruthy = Boolean as unknown as <T>(
  value: T | Falsy,
) => value is T
