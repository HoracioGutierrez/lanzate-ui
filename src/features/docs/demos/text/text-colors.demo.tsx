import { Text } from "@/components/ui/text"

export function TextColorsDemo() {
  return (
    <div className="space-y-1.5">
      <Text size="sm">Default — foreground</Text>
      <Text size="sm" color="primary">primary — primary text</Text>
      <Text size="sm" color="secondary">secondary — secondary text</Text>
      <Text size="sm" color="muted">muted — muted text</Text>
      <Text size="sm" color="primary-muted">primary-muted — primary at 60%</Text>
      <Text size="sm" color="secondary-muted">secondary-muted — secondary at 60%</Text>
      <Text size="sm" color="info">info — informational</Text>
      <Text size="sm" color="warning">warning — warning</Text>
      <Text size="sm" color="success">success — confirmation</Text>
      <Text size="sm" color="error">error — attention</Text>
    </div>
  )
}
