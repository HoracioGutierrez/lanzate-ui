import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonRadiusDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <Button radius="none">None</Button>
      <Button radius="sm">SM</Button>
      <Button radius="md">MD</Button>
      <Button radius="lg">LG</Button>
      <Button radius="xl">XL</Button>
      <Button radius="full">Full</Button>
      <Button icon={<Plus aria-hidden="true" />} radius="full" tooltip="Create" />
    </div>
  )
}
