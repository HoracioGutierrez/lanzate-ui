import { ArrowRight } from "lucide-react"

import { Text } from "@/components/ui/text"

import { VERSION } from "../home.constants"

export function HeroBadge() {
  return (
    <a
      href="#changelog"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 py-1 pr-3 pl-1 text-xs font-medium shadow-soft backdrop-blur transition hover:bg-accent"
    >
      <span className="rounded-full bg-brand px-2 py-0.5 text-3xs font-semibold tracking-wide text-brand-foreground uppercase">New</span>
      <Text render={<span />} size="inherit" color="muted">
        v{VERSION} · 4 accessible components
      </Text>
      <ArrowRight size={12} className="text-muted-foreground" aria-hidden="true" />
    </a>
  )
}
