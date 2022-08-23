export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result: any = {}
  for (const key in obj) {
    if (!keys.includes(key as any)) {
      result[key] = obj[key]
    }
  }
  return result
}
