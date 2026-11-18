import { Text } from "@/components/ui/text"

// className is merged after the variants, so it can extend or override any base style.
export function TextCustomizationDemo() {
  return (
    <div className="space-y-2">
      <Text size="lg" className="font-black tracking-tight">
        Bold with tight tracking
      </Text>
      <Text size="sm" color="muted" className="italic">
        Muted text + italic
      </Text>
      <Text className="underline decoration-primary decoration-wavy">Decorative underline</Text>
      <Text size="sm" className="w-fit rounded bg-primary/10 px-2 py-0.5 text-primary">
        Inline badge
      </Text>
    </div>
  )
}
