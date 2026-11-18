import { Text } from "@/components/ui/text"

export function TextSizesDemo() {
  return (
    <div className="space-y-2">
      <Text render={<p />} size="display" className="leading-none">
        Display — The interface that takes off
      </Text>
      <Text size="2xl">2XL — Main heading</Text>
      <Text size="xl">XL — Subheading</Text>
      <Text size="lg">LG — Body large, for highlighted paragraphs</Text>
      <Text size="md">MD — Body default, the standard size</Text>
      <Text size="sm" color="muted">
        SM — Small text, for notes and labels
      </Text>
      <Text size="xs" color="muted">
        XS — Caption · tracking wide · ideal for metadata
      </Text>
    </div>
  )
}
