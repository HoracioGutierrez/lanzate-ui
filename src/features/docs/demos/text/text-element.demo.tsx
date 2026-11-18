import { Text } from "@/components/ui/text"

// `render` picks the element; size and color stay independent of it.
export function TextElementDemo() {
  return (
    <div className="space-y-1.5">
      <Text render={<p />} size="2xl">p styled as 2xl — a heading-sized paragraph</Text>
      <Text render={<span />} size="sm" color="muted" className="block">
        span — inline text
      </Text>
      <Text render={<label htmlFor="demo-email" />} size="sm" className="block">
        label — form label
      </Text>
      <input id="demo-email" type="email" placeholder="you@example.com" className="h-8 rounded-md border border-input bg-background px-2 text-sm" />
    </div>
  )
}
