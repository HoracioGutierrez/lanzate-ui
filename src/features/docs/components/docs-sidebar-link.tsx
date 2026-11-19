import Link from "next/link"

import { Badge } from "@/components/ui/badge"
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
      {item.badge && (
        <Badge size="sm" radius="sm" font="mono" className="ms-auto">
          {item.badge}
        </Badge>
      )}
    </Link>
  )
}
