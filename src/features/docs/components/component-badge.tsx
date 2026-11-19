import { Badge } from "@/components/ui/badge"

import type { ComponentBadgeProps } from "../types/docs.types"

/** "COMPONENT · 01" eyebrow above a component page title. */
export function ComponentBadge({ number, isNew }: ComponentBadgeProps) {
  return (
    <div className="mb-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
      COMPONENT · {number}
      {isNew && (
        <Badge size="sm" radius="sm" font="mono">
          NEW
        </Badge>
      )}
    </div>
  )
}
