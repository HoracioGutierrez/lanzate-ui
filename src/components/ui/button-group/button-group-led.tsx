import { cn } from "@/lib/cn"

import type { ButtonGroupLedProps } from "./button-group.types"
import { buttonGroupLedClasses, buttonGroupLedSizeClasses } from "./button-group.variants"

export function ButtonGroupLed({ on, size }: ButtonGroupLedProps) {
  return (
    <span
      aria-hidden="true"
      data-slot="button-group-led"
      data-size={size}
      data-on={on ? "" : undefined}
      className={cn(buttonGroupLedClasses, buttonGroupLedSizeClasses[size])}
    />
  )
}
