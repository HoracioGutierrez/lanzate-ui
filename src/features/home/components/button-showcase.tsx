import { Button } from "@/components/ui/button"

import { ShowcaseCard } from "./showcase-card"

export function ButtonShowcase() {
  return (
    <ShowcaseCard title="Button" description="7 variants, 7 colors and loading." number="01">
      <div className="flex flex-col items-center gap-3 px-6 py-8">
        <Button padding="sm">Solid</Button>
        <Button variant="outline" padding="sm">Outline</Button>
        <Button variant="ghost" padding="sm">Ghost</Button>
        <Button variant="soft" padding="sm">Soft</Button>
        <Button variant="dashed" padding="sm">Dashed</Button>
        <Button variant="subtle" padding="sm">Subtle</Button>
        <Button variant="surface" padding="sm">Surface</Button>
        <Button color="info" padding="sm">Info</Button>
        <Button color="warning" padding="sm">Warning</Button>
        <Button color="success" padding="sm">Success</Button>
        <Button color="error" padding="sm">Error</Button>
        <Button color="muted" padding="sm">Muted</Button>
        <Button color="success" variant="outline" padding="sm">Success outline</Button>
        <Button color="error" variant="soft" padding="sm">Error soft</Button>
        <Button color="info" variant="ghost" padding="sm">Info ghost</Button>
        <Button effect="elevated" padding="sm">Elevated</Button>
        <Button padding="sm" isLoading loadingText="Loading…" tapAnimation={false}>
          Loading
        </Button>
        <Button padding="sm" disabled>Disabled</Button>
      </div>
    </ShowcaseCard>
  )
}
