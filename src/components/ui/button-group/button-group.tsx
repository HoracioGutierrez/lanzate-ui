"use client"

import { useMemo } from "react"

import { cn } from "@/lib/cn"

import { ButtonGroupContext } from "./button-group.constants"
import type { ButtonGroupProps } from "./button-group.types"
import { buttonGroupClasses, buttonGroupColorClasses, buttonGroupOrientationClasses } from "./button-group.variants"
import { ButtonGroupMultiple } from "./button-group-multiple"
import { ButtonGroupSingle } from "./button-group-single"

export function ButtonGroup({ color = "primary", padding = "sm", className, ...props }: ButtonGroupProps) {
  const context = useMemo(() => ({ selection: props.selection, color, padding }), [props.selection, color, padding])
  const classes = cn(
    buttonGroupClasses,
    buttonGroupOrientationClasses[props.orientation ?? "horizontal"],
    buttonGroupColorClasses[color],
    className
  )

  return (
    <ButtonGroupContext value={context}>
      {props.selection === "single" ? (
        <ButtonGroupSingle data-slot="button-group" className={classes} {...props} />
      ) : (
        <ButtonGroupMultiple data-slot="button-group" className={classes} {...props} />
      )}
    </ButtonGroupContext>
  )
}
