import type { ComponentBadgeProps } from "../types/docs.types"

/** "COMPONENT · 01" eyebrow above a component page title. */
export function ComponentBadge({ number, isNew }: ComponentBadgeProps) {
  return (
    <div className="mb-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
      COMPONENT · {number}
      {isNew && <span className="rounded bg-brand/15 px-1 py-0.5 text-3xs text-brand">NEW</span>}
    </div>
  )
}
