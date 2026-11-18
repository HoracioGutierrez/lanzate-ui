import { ArrowRight } from "lucide-react"

import { VERSION } from "../home.constants"

export function HeroBadge() {
  return (
    <a
      href="#changelog"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 py-1 pr-3 pl-1 text-xs font-medium shadow-soft backdrop-blur transition hover:bg-accent"
    >
      <span className="rounded-full bg-brand px-2 py-0.5 text-3xs font-semibold tracking-wide text-brand-foreground uppercase">New</span>
      <span className="text-muted-foreground">v{VERSION} · 2 accessible components</span>
      <ArrowRight size={12} className="text-muted-foreground" aria-hidden="true" />
    </a>
  )
}
