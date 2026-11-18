import Link from "next/link"

import { cn } from "@/lib/utils"

import type { DocsSidebarLinkProps } from "../types/docs.types"

export function DocsSidebarLink({ item, active }: DocsSidebarLinkProps) {
  return (
    <Link
      href={`/docs/${item.id}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition",
        active ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full transition-colors", active ? "bg-brand" : "bg-border")} />
      {item.label}
      {item.badge && <span className="ml-auto rounded bg-brand/15 px-1 py-0.5 font-mono text-3xs text-brand">{item.badge}</span>}
    </Link>
  )
}
