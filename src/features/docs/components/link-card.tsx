import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Text } from "@/components/ui/text"

import type { LinkCardProps } from "../types/docs.types"

export function LinkCard({ href, title, children }: LinkCardProps) {
  return (
    <Link href={href} className="block rounded-lg border border-border bg-card p-5 transition hover:bg-accent">
      <Text render={<span />} size="sm" weight="medium" className="flex items-center gap-2">
        {title}
        <ArrowRight size={14} className="opacity-60" aria-hidden="true" />
      </Text>
      <Text render={<span />} size="xs" color="muted" leading="relaxed" className="mt-1.5 block">
        {children}
      </Text>
    </Link>
  )
}
