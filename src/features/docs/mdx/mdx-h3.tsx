import { Text } from "@/components/ui/text"

import type { MdxElementProps } from "../types/docs.types"

export function MdxH3({ children, id }: MdxElementProps<"h3">) {
  return (
    <Text render={<h3 id={id} />} size="lg" weight="medium" className="mt-8 scroll-mt-20">
      {children}
    </Text>
  )
}
