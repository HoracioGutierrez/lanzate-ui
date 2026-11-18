import { Text } from "@/components/ui/text"

import type { MdxElementProps } from "../types/docs.types"

export function MdxH1({ children, id }: MdxElementProps<"h1">) {
  return (
    <Text render={<h1 id={id} />} variant="heading" size="display">
      {children}
    </Text>
  )
}
