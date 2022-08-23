import clsx from "clsx"

export const controlBorderClass = clsx("border border-white rounded-lg")

export const clearButtonClass = clsx(
  "px-4 py-3 leading-none transition flex items-center justify-center gap-2 bg-transparent hover:bg-white/10",
)

export const outlineButtonClass = clsx(
  controlBorderClass,
  clearButtonClass,
  "hover:-translate-y-0.5 active:translate-y-0 active:opacity-75",
)
