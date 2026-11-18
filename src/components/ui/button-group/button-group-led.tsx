import type { ButtonGroupLedProps } from "./button-group.types"
import { buttonGroupLedClasses } from "./button-group.variants"

export function ButtonGroupLed({ on }: ButtonGroupLedProps) {
  return <span aria-hidden="true" data-slot="button-group-led" data-on={on ? "" : undefined} className={buttonGroupLedClasses} />
}
