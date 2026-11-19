"use client"

import { useCallback, useMemo, useState } from "react"

import { cn } from "@/lib/cn"

import { ButtonGroupContext } from "./button-group.constants"
import type { ButtonGroupProps } from "./button-group.types"
import { buttonGroupClasses, buttonGroupColorClasses, buttonGroupOrientationClasses } from "./button-group.variants"
import { ButtonGroupMultiple } from "./button-group-multiple"
import { ButtonGroupSingle } from "./button-group-single"

export function ButtonGroup({ color = "primary", padding = "sm", className, ...props }: ButtonGroupProps) {
  // ButtonGroupAll registers itself, so single knows whether "nothing chosen" is a real choice.
  const [hasAll, setHasAll] = useState(false)
  const registerAll = useCallback(() => {
    setHasAll(true)
    return () => setHasAll(false)
  }, [])
  const context = useMemo(
    () => ({ selection: props.selection, color, padding, registerAll }),
    [props.selection, color, padding, registerAll]
  )
  const classes = cn(
    buttonGroupClasses,
    buttonGroupOrientationClasses[props.orientation ?? "horizontal"],
    buttonGroupColorClasses[color],
    className
  )

  return (
    <ButtonGroupContext value={context}>
      {props.selection === "single" ? (
        <ButtonGroupSingle className={classes} hasAll={hasAll} {...props} />
      ) : (
        <ButtonGroupMultiple className={classes} {...props} />
      )}
    </ButtonGroupContext>
  )
}
