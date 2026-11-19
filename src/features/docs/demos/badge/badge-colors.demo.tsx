import { Badge, BadgeTag } from "@/components/ui/badge"

export function BadgeColorsDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="muted">Muted</Badge>
        <Badge color="info">Info</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="error">Error</Badge>
      </div>
      {/* The tag's color is its own: it never follows the badge's. */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <Badge variant="outline" color="info">
          <BadgeTag color="success">Stable</BadgeTag>
          v2.4.0
        </Badge>
        <Badge variant="soft" color="warning">
          <BadgeTag color="warning">Beta</BadgeTag>
          Agents API
        </Badge>
        <Badge variant="surface" color="muted">
          <BadgeTag color="error" variant="soft">
            Deprecated
          </BadgeTag>
          Legacy themes
        </Badge>
      </div>
    </div>
  )
}
