"use client"

import { BUTTON_GROUP_ALL } from "./button-group.constants"
import type { ButtonGroupAllProps } from "./button-group.types"
import { ButtonGroupItem } from "./button-group-item"

/** Lit while nothing is chosen; choosing it clears the group (`[]` in multiple, `null` in single). */
export function ButtonGroupAll(props: ButtonGroupAllProps) {
  return <ButtonGroupItem value={BUTTON_GROUP_ALL} {...props} />
}
