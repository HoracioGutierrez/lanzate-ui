"use client"

import { useState } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"

import { docsNav } from "../config/docs-nav"
import type { DocsSidebarProps } from "../types/docs.types"
import { DocsSidebarGroup } from "./docs-sidebar-group"

export function DocsSidebar({ current }: DocsSidebarProps) {
  const [filter, setFilter] = useState("")
  const query = filter.trim().toLowerCase()

  const groups = query
    ? docsNav
        .map((group) => ({ ...group, items: group.items.filter((item) => item.label.toLowerCase().includes(query)) }))
        .filter((group) => group.items.length > 0)
    : docsNav

  return (
    <ScrollArea className="h-full" viewportProps={{ role: "region", "aria-label": "Documentation" }}>
      <div className="mb-5">
        <input
          type="search"
          aria-label="Filter pages"
          placeholder="Filter..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="h-8 w-full rounded-md border border-input bg-background pr-2 pl-3 text-xs placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30 focus:outline-none"
        />
      </div>

      <nav aria-label="Docs" className="space-y-6">
        {groups.map((group) => (
          <DocsSidebarGroup key={group.group} group={group} current={current} showCount={query !== ""} />
        ))}
        {query && groups.length === 0 && (
          <p role="status" className="px-2 text-xs text-muted-foreground">
            No results for &ldquo;{filter}&rdquo;.
          </p>
        )}
      </nav>
    </ScrollArea>
  )
}
