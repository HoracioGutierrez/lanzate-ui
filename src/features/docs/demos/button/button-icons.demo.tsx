import { ArrowRight, Download, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button startIcon={<Download aria-hidden="true" />}>Download</Button>
      <Button endIcon={<ArrowRight aria-hidden="true" />}>Continue</Button>
      <Button startIcon={<Plus aria-hidden="true" />} endIcon={<ArrowRight aria-hidden="true" />}>
        Both
      </Button>
      <Button variant="outline" color="error" startIcon={<Trash2 aria-hidden="true" />}>
        Delete
      </Button>
    </div>
  )
}
