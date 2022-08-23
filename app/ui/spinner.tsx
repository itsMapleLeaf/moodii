export function Spinner() {
  return (
    <span className="inline-grid grid-cols-2 w-4 h-4 gap-0.5 animate-spin align-middle">
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i} className="rounded-full bg-white" />
      ))}
    </span>
  )
}
