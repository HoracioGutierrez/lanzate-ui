import Link from "next/link"

import { Text } from "@/components/ui/text"
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
      <Text render={<span />} size="2xs" color="muted" className="block">
        {isNext ? "Next →" : "← Previous"}
      </Text>
      <Text render={<span />} size="sm" weight="medium" className="mt-0.5 block">
        {item.label}
      </Text>
    </Link>
  )
}
