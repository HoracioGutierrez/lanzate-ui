import { Badge } from "@/components/ui/badge"

export function BadgeShapeDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <Badge radius="none">None</Badge>
        <Badge radius="sm">Small</Badge>
        <Badge radius="md">Medium</Badge>
        <Badge radius="full">Full</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <Badge size="sm" radius="sm" font="mono">
          NEW
        </Badge>
        <Badge size="sm" radius="sm" font="mono" color="info">
          BETA
        </Badge>
        <Badge font="mono" variant="outline" color="muted">
          v0.13.0
        </Badge>
      </div>
    </div>
  )
}
