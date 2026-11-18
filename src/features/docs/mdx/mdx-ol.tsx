import { Text } from "@/components/ui/text"

import type { MdxElementProps } from "../types/docs.types"

export function MdxOl({ children }: MdxElementProps<"ol">) {
  return (
    <Text render={<ol />} color="muted" leading="relaxed" className="mt-3 max-w-2xl list-decimal space-y-1.5 pl-5">
      {children}
    </Text>
  )
}
