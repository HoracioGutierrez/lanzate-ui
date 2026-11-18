import { Text } from "@/components/ui/text"

import type { InfoGridProps } from "../types/docs.types"

/** Label/value cards in a two-column grid, e.g. requirements. */
export function InfoGrid({ items }: InfoGridProps) {
  return (
    <dl className="mt-3 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-border bg-card px-4 py-3">
          <Text render={<dt />} variant="overline" size="xs">
            {item.label}
          </Text>
          <Text render={<dd />} size="sm" weight="medium" className="mt-0.5">
            {item.value}
          </Text>
        </div>
      ))}
    </dl>
  )
}
