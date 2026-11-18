import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonTooltipDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button tooltip="Create a new element">New</Button>
      <Button icon={<Plus aria-hidden="true" />} variant="outline" tooltip="Add item" />
      <Button icon={<Trash2 aria-hidden="true" />} color="error" variant="ghost" tooltip="Delete selection" />
      {/* A disabled button with a tooltip stays focusable, so the tooltip is still reachable. */}
      <Button disabled tooltip="You need admin permissions">
        Admin only
      </Button>
    </div>
  )
}
