import type { DocsSidebarGroupProps } from "../types/docs.types"
import { DocsSidebarLink } from "./docs-sidebar-link"

export function DocsSidebarGroup({ group, current, showCount }: DocsSidebarGroupProps) {
  const headingId = `docs-group-${group.group.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <div>
      <div className="mb-2 flex items-center justify-between px-2">
        <h2 id={headingId} className="font-mono text-2xs tracking-wider text-muted-foreground/70 uppercase">
          {group.group}
        </h2>
        {showCount && <span className="font-mono text-3xs text-muted-foreground">{group.items.length}</span>}
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
