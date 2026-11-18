import { Button } from "@/components/ui/button"

export function ButtonGlowDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button effect="glow">Primary</Button>
      <Button effect="glow" color="info">Info</Button>
      <Button effect="glow" color="success">Success</Button>
      <Button effect="glow" color="warning">Warning</Button>
      <Button effect="glow" color="error">Error</Button>
      <Button effect="glow" variant="outline">Outline</Button>
      <Button effect="glow" variant="ghost">Ghost</Button>
    </div>
  )
}
