import { Text } from "@/components/ui/text"

import type { LeadProps } from "../types/docs.types"

/** The intro paragraph under a page title. */
export function Lead({ children }: LeadProps) {
  return (
    <Text size="lg" color="muted" className="mt-3 max-w-2xl leading-relaxed">
      {children}
    </Text>
  )
}
