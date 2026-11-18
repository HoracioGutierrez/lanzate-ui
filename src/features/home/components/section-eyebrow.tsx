import { Text } from "@/components/ui/text"

import type { SectionEyebrowProps } from "../home.types"

/** Small mono label with a brand dot, above a section title. */
export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <Text variant="overline" size="xs" className="mb-4 inline-flex items-center gap-2">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
      {children}
    </Text>
  )
}
