import { ArrowRight } from "lucide-react"

import { Badge, BadgeDot, BadgeTag } from "@/components/ui/badge"

export function BadgeCompositionDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Badge variant="surface" color="muted" render={<a href="#composition" />}>
        <BadgeTag>New</BadgeTag>
        v0.13.0 · Badge is here
        <ArrowRight aria-hidden="true" />
      </Badge>
      <Badge variant="surface" color="muted">
        <BadgeTag>v0.13.0</BadgeTag>
        <BadgeDot />
        All operating systems
      </Badge>
      <Badge variant="outline" color="success">
        <BadgeDot color="success" />
        Operational
      </Badge>
    </div>
  )
}
