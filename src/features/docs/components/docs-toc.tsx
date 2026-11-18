"use client"

import { Text } from "@/components/ui/text"
import { cn } from "@/lib/utils"

import { useScrollSpy } from "../hooks/use-scroll-spy"
import type { DocsTocProps } from "../types/docs.types"

/** "On this page": plain anchor links (they work without JS); the client only highlights the current one. */
export function DocsToc({ items }: DocsTocProps) {
  const active = useScrollSpy(items.map((item) => item.id))

  if (items.length === 0) return null

  return (
    <nav aria-labelledby="docs-toc-title">
      <Text render={<h2 id="docs-toc-title" />} variant="overline" size="2xs" className="mb-3 px-1">
        On this page
      </Text>
      <ul className="space-y-px">
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block border-l-2 px-3 py-1 text-xs transition",
                  isActive
                    ? "border-brand text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
