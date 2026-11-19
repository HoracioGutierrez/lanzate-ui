import { useCallback, useState } from "react"

import { BUTTON_GROUP_ALL } from "./button-group.constants"
import type { UseControllableValueOptions } from "./button-group.types"

// The consumer's value never holds the "All" item. ui-sdk's does: while nothing is chosen, All is
// the pressed (or checked) item, so it lights up and the arrow keys reach it like any other.

export function toSdkMultiple(value: string[]): string[] {
  return value.length === 0 ? [BUTTON_GROUP_ALL] : value
}

/** The consumer's next value for a ui-sdk change, or `undefined` when nothing should change. */
export function fromSdkMultiple(next: string[], current: string[]): string[] | undefined {
  const pressedAll = next.includes(BUTTON_GROUP_ALL)
  if (pressedAll && current.length > 0) return []
  if (!pressedAll && current.length === 0 && next.length === 0) return undefined
  return next.filter((item) => item !== BUTTON_GROUP_ALL)
}

export function toSdkSingle(value: string | null): string {
  return value ?? BUTTON_GROUP_ALL
}

export function fromSdkSingle(next: string | null): string | null {
  return next === BUTTON_GROUP_ALL ? null : next
}

/** Controlled when `value` is defined, uncontrolled from `defaultValue` otherwise. */
export function useControllableValue<T>({
  value,
  defaultValue,
  onValueChange,
}: UseControllableValueOptions<T>): [T, (next: T) => void] {
  const [internal, setInternal] = useState(defaultValue)
  const controlled = value !== undefined
  const setValue = useCallback(
    (next: T) => {
      if (!controlled) setInternal(next)
      onValueChange?.(next)
    },
    [controlled, onValueChange]
  )
  return [controlled ? value : internal, setValue]
}
