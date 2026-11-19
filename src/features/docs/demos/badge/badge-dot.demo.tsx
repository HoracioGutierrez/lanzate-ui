import { Badge, BadgeDot } from "@/components/ui/badge"

export function BadgeDotDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Badge variant="surface" color="muted">
        <BadgeDot color="muted" />
        Idle
      </Badge>
      <Badge variant="soft" color="info">
        <BadgeDot color="info" pulse />
        Deploying
      </Badge>
      <Badge variant="soft" color="error">
        <BadgeDot color="error" pulse />
        Live
      </Badge>
    </div>
  )
}
