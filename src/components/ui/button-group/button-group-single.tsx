"use client"

import { SegmentedControl, SegmentedControlIndicator } from "@ui-sdk/react/segmented-control"

import type { ButtonGroupSingleProps } from "./button-group.types"
import { buttonGroupIndicatorClasses } from "./button-group.variants"
import { fromSdkSingle, toSdkSingle, useControllableValue } from "./use-button-group-value"

/** `selection="single"`: ui-sdk's segmented control, a radio group with a sliding indicator. */
export function ButtonGroupSingle({
  selection,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  children,
  ...props
}: Omit<ButtonGroupSingleProps, "color" | "padding">) {
  const [value, setValue] = useControllableValue({ value: valueProp, defaultValue, onValueChange })

  return (
    <SegmentedControl
      data-selection={selection}
      value={toSdkSingle(value)}
      onValueChange={(next) => setValue(fromSdkSingle(next))}
      {...props}
    >
      <SegmentedControlIndicator className={buttonGroupIndicatorClasses} />
      {children}
    </SegmentedControl>
  )
}
