import { Button } from "@/components/ui/button"

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-2.5">
      <Button padding="none">None</Button>
      <Button padding="xs">XS</Button>
      <Button padding="sm">SM</Button>
      <Button padding="base">Base</Button>
      <Button padding="md">MD</Button>
      <Button padding="lg">LG</Button>
      <Button padding="xl">XL</Button>
    </div>
  )
}
