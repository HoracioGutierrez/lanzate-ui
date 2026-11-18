"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import type { HiddenWhenFloatingProps } from "../shell.types"

const linkClasses = "rounded-md px-3 py-1.5 transition hover:bg-accent"

export function HeaderNav({ hidden }: HiddenWhenFloatingProps) {
  const pathname = usePathname()
  const isDocs = pathname.startsWith("/docs")

  return (
    <nav
      aria-label="Main"
      inert={hidden}
      className={cn(
        "hidden items-center gap-1 text-sm transition-opacity duration-200 md:flex motion-reduce:transition-none",
        hidden && "pointer-events-none opacity-0"
      )}
    >
      <Link href="/#components" className={cn(linkClasses, "text-muted-foreground hover:text-foreground")}>
        Components
      </Link>
      <Link
        href="/docs"
        aria-current={isDocs ? "page" : undefined}
        className={cn(linkClasses, isDocs ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground")}
      >
        Docs
      </Link>
    </nav>
  )
}
