import Link from "next/link"

import { cn } from "@/lib/utils"

import type { DocsPagerLinkProps } from "../types/docs.types"

export function DocsPagerLink({ item, direction }: DocsPagerLinkProps) {
  const isNext = direction === "next"

  return (
    <Link
      href={`/docs/${item.id}`}
      rel={isNext ? "next" : "prev"}
      className={cn(
        "max-w-xs flex-1 rounded-lg border border-border bg-card p-4 transition hover:bg-accent",
        isNext && "ml-auto text-right"
      )}
    >
      <span className="block text-2xs text-muted-foreground">{isNext ? "Next →" : "← Previous"}</span>
      <span className="mt-0.5 block text-sm font-medium">{item.label}</span>
    </Link>
  )
}
