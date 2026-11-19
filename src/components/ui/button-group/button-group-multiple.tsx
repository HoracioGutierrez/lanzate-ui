"use client"

import { ToggleGroup } from "@ui-sdk/react/toggle"

import type { ButtonGroupMultipleProps } from "./button-group.types"
import { fromSdkMultiple, toSdkMultiple, useControllableValue } from "./use-button-group-value"

/** `selection="multiple"`: ui-sdk's toggle group, several items pressed at once. */
export function ButtonGroupMultiple({
  selection,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  ...props
}: Omit<ButtonGroupMultipleProps, "color" | "padding">) {
  const [value, setValue] = useControllableValue({ value: valueProp, defaultValue, onValueChange })

  return (
    <ToggleGroup
      multiple
      data-selection={selection}
      value={toSdkMultiple(value)}
      onValueChange={(next, details) => {
        const mapped = fromSdkMultiple(next, value)
        if (mapped === undefined) details.cancel()
        else setValue(mapped)
      }}
      {...props}
    />
  )
}
