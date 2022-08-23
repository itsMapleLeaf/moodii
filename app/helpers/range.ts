type RangeArgs =
  | [length: number]
  | [start: number, end: number]
  | [start: number, end: number, step: number]

export function range(...args: RangeArgs): number[] {
  let [start, end, step] = args
  if (step === undefined) {
    step = 1
  }
  if (end === undefined) {
    end = start
    start = 0
  }
  const result = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  return result
}
