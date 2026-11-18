import { ArrowRight } from "lucide-react"
import Link from "next/link"

import type { LinkCardProps } from "../types/docs.types"

export function LinkCard({ href, title, children }: LinkCardProps) {
  return (
    <Link href={href} className="block rounded-lg border border-border bg-card p-5 transition hover:bg-accent">
      <span className="flex items-center gap-2 text-sm font-medium">
        {title}
        <ArrowRight size={14} className="opacity-60" aria-hidden="true" />
      </span>
      <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">{children}</span>
    </Link>
  )
}
