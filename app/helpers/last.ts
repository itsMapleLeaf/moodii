export function last<T>(arr: readonly [...unknown[], T]): T
export function last<T>(arr: readonly T[]): T | undefined
export function last(arr: readonly any[]): any {
  return arr[arr.length - 1]
}
