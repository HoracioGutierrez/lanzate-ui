import type { InfoGridProps } from "../types/docs.types"

/** Label/value cards in a two-column grid, e.g. requirements. */
export function InfoGrid({ items }: InfoGridProps) {
  return (
    <dl className="mt-3 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-border bg-card px-4 py-3">
          <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{item.label}</dt>
          <dd className="mt-0.5 text-sm font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
