import { Text } from "@/components/ui/text"

import { ShowcaseCard } from "./showcase-card"

export function TextShowcase() {
  return (
    <ShowcaseCard title="Text" description="8 sizes, 9 colors, 3 variants." number="02">
      <div className="w-full space-y-2 px-6 py-8">
        <Text size="display" leading="none">Display</Text>
        <Text variant="overline" size="xs">Overline · section label</Text>
        <Text variant="heading" size="2xl">Heading variant</Text>
        <Text size="2xl">2XL — Heading</Text>
        <Text size="xl">XL — Subheading</Text>
        <Text size="lg">LG — Body large</Text>
        <Text size="md">MD — Body default</Text>
        <Text size="sm" color="muted">SM — Small text</Text>
        <Text size="xs" color="muted">XS — Caption · tracking wide</Text>
        <Text size="sm" color="info">Info · informational</Text>
        <Text size="sm" color="warning">Warning · caution</Text>
        <Text size="sm" color="success">Success · confirmation</Text>
        <Text size="sm" color="error">Error · attention</Text>
        <Text size="sm" color="primary-muted">Primary muted</Text>
        <Text size="sm" color="secondary">Secondary</Text>
      </div>
    </ShowcaseCard>
  )
}
