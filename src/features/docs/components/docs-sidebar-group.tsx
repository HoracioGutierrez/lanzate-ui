import { Text } from "@/components/ui/text"

import type { DocsSidebarGroupProps } from "../types/docs.types"
import { DocsSidebarLink } from "./docs-sidebar-link"

export function DocsSidebarGroup({ group, current, showCount }: DocsSidebarGroupProps) {
  const headingId = `docs-group-${group.group.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <div>
      <div className="mb-2 flex items-center justify-between px-2">
        <Text render={<h2 id={headingId} />} variant="overline" size="2xs">
          {group.group}
        </Text>
        {showCount && (
          <Text render={<span />} size="2xs" font="mono" color="muted">
            {group.items.length}
          </Text>
        )}
      </div>
      <ul aria-labelledby={headingId} className="space-y-0.5">
        {group.items.map((item) => (
          <li key={item.id}>
            <DocsSidebarLink item={item} active={item.id === current} />
          </li>
        ))}
      </ul>
    </div>
  )
}
