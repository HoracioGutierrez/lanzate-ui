import { Text } from "@/components/ui/text"

// Role presets and type props, so most text needs no className.
export function TextVariantsDemo() {
  return (
    <div className="space-y-3">
      <Text variant="overline" size="xs">Overline · section label</Text>
      <Text variant="heading" size="2xl">Heading — semibold, tight tracking</Text>
      <Text color="muted" leading="relaxed">
        Body with relaxed leading, for longer paragraphs that need room to breathe between lines.
      </Text>
      <Text size="sm" weight="medium">Medium weight · card titles and labels</Text>
      <Text size="sm" font="mono" color="muted">font=&quot;mono&quot; · metadata and code-like values</Text>
      <Text size="sm">
        Inline text keeps its parent&apos;s size:{" "}
        <Text render={<span />} size="inherit" color="primary" weight="semibold">
          size=&quot;inherit&quot;
        </Text>
      </Text>
    </div>
  )
}
