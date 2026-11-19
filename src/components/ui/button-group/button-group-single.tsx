"use client"

import { SegmentedControl, SegmentedControlIndicator } from "@ui-sdk/react/segmented-control"

import type { ButtonGroupSingleInternalProps } from "./button-group.types"
import { buttonGroupIndicatorClasses } from "./button-group.variants"
import { fromSdkSingle, toSdkSingle, useControllableValue } from "./use-button-group-value"

/** `selection="single"`: ui-sdk's segmented control, a radio group with a sliding indicator. */
export function ButtonGroupSingle({
  selection,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  hasAll,
  name,
  required,
  children,
  ...props
}: ButtonGroupSingleInternalProps) {
  const [value, setValue] = useControllableValue({ value: valueProp, defaultValue, onValueChange })

  // With an All item, its hidden radio would submit the reserved value and always satisfy
  // `required`. So the group submits its own input instead: nothing while nothing is chosen.
  // "Nothing" is a valid choice then, so `required` has no effect.
  const ownInput = hasAll && name != null

  return (
    <SegmentedControl
      data-selection={selection}
      value={toSdkSingle(value)}
      onValueChange={(next) => setValue(fromSdkSingle(next))}
      name={ownInput ? undefined : name}
      required={ownInput ? undefined : required}
      {...props}
    >
      <SegmentedControlIndicator className={buttonGroupIndicatorClasses} />
      {children}
      {ownInput && value != null && <input type="hidden" name={name} value={value} />}
    </SegmentedControl>
  )
}
