import { Button } from "@/components/ui/button"

export function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button>Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="dashed">Dashed</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="surface">Surface</Button>
    </div>
  )
}
