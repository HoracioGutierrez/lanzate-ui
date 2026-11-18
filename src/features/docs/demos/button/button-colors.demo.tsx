import { Button } from "@/components/ui/button"

export function ButtonColorsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="muted">Muted</Button>
      <Button color="info">Info</Button>
      <Button color="warning">Warning</Button>
      <Button color="success">Success</Button>
      <Button color="error">Error</Button>
    </div>
  )
}
