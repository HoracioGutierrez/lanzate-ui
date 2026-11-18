import { Text } from "@/components/ui/text"

import type { MdxElementProps } from "../types/docs.types"

export function MdxUl({ children }: MdxElementProps<"ul">) {
  return (
    <Text render={<ul />} color="muted" leading="relaxed" className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5">
      {children}
    </Text>
  )
}
