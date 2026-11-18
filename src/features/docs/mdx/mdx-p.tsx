import { Text } from "@/components/ui/text"

import type { MdxElementProps } from "../types/docs.types"

export function MdxP({ children }: MdxElementProps<"p">) {
  return (
    <Text color="muted" leading="relaxed" className="mt-3 max-w-2xl">
      {children}
    </Text>
  )
}
