import { Badge, BadgeTag } from "@/components/ui/badge"

export function BadgeTooltipDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Badge color="warning" tooltip="May change before 1.0">
        Beta
      </Badge>
      <Badge variant="outline" color="info" tooltip="Released on November 19" tooltipOptions={{ side: "bottom", arrow: false }}>
        <BadgeTag color="success">Stable</BadgeTag>
        v0.13.0
      </Badge>
      <Badge variant="surface" color="muted" render={<a href="#tooltip" />} tooltip="Jump to this section">
        Link with a tip
      </Badge>
    </div>
  )
}
