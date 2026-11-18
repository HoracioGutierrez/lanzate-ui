import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonIconSizeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button iconSize="xs" startIcon={<Sparkles aria-hidden="true" />}>XS</Button>
      <Button iconSize="sm" startIcon={<Sparkles aria-hidden="true" />}>SM</Button>
      <Button iconSize="base" startIcon={<Sparkles aria-hidden="true" />}>Base</Button>
      <Button iconSize="md" startIcon={<Sparkles aria-hidden="true" />}>MD</Button>
      <Button iconSize="lg" startIcon={<Sparkles aria-hidden="true" />}>LG</Button>
      <Button iconSize="xl" startIcon={<Sparkles aria-hidden="true" />}>XL</Button>
    </div>
  )
}
