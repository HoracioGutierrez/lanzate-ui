import { ArrowRight } from "lucide-react"

import { Badge, BadgeTag } from "@/components/ui/badge"

import { VERSION } from "../home.constants"

export function HeroBadge() {
  return (
    <Badge variant="surface" color="muted" render={<a href="#changelog" />}>
      <BadgeTag>New</BadgeTag>
      v{VERSION} · 4 accessible components
      <ArrowRight aria-hidden="true" />
    </Badge>
  )
}
