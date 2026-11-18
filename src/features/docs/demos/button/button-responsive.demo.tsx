import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonResponsiveDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {/* Text visually hidden below `sm`, still read by screen readers */}
      <Button mobile="only-icon" startIcon={<Plus aria-hidden="true" />}>
        New
      </Button>
      {/* Full width below `sm`, auto from `sm` up */}
      <Button mobile="full-width">Full width</Button>
      {/* Hidden below `sm` */}
      <Button mobile="hidden">Desktop only</Button>
    </div>
  )
}
