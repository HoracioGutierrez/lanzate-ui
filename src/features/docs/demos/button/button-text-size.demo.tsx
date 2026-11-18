import { Button } from "@/components/ui/button"

export function ButtonTextSizeDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-2.5">
      <Button textSize="xs">XS</Button>
      <Button textSize="sm">SM</Button>
      <Button textSize="base">Base</Button>
      <Button textSize="lg">LG</Button>
      <Button textSize="xl">XL</Button>
      <Button textSize="2xl">2XL</Button>
      <Button textSize="display">Display</Button>
    </div>
  )
}
