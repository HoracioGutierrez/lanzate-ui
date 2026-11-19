import { Badge } from "@/components/ui/badge"

export function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="surface" color="muted">
        Surface
      </Badge>
    </div>
  )
}
