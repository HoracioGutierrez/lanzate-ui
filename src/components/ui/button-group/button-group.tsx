"use client"

import { useCallback, useMemo, useState } from "react"

import { cn } from "@/lib/cn"

import { ButtonGroupContext } from "./button-group.constants"
import type { ButtonGroupProps } from "./button-group.types"
import {
  buttonGroupClasses,
  buttonGroupColorClasses,
  buttonGroupOrientationClasses,
  buttonGroupSizeClasses,
} from "./button-group.variants"
import { ButtonGroupMultiple } from "./button-group-multiple"
import { ButtonGroupSingle } from "./button-group-single"

export function ButtonGroup({ color = "primary", size = "md", className, ...props }: ButtonGroupProps) {
  // ButtonGroupAll registers itself, so single knows whether "nothing chosen" is a real choice.
  const [hasAll, setHasAll] = useState(false)
  const registerAll = useCallback(() => {
    setHasAll(true)
    return () => setHasAll(false)
  }, [])
  const context = useMemo(
    () => ({ selection: props.selection, color, size, registerAll }),
    [props.selection, color, size, registerAll]
  )
  const classes = cn(
    buttonGroupClasses,
    buttonGroupOrientationClasses[props.orientation ?? "horizontal"],
    buttonGroupColorClasses[color],
    buttonGroupSizeClasses[size],
    className
  )

  return (
    <ButtonGroupContext value={context}>
      {props.selection === "single" ? (
        <ButtonGroupSingle data-size={size} className={classes} hasAll={hasAll} {...props} />
      ) : (
        <ButtonGroupMultiple data-size={size} className={classes} {...props} />
      )}
    </ButtonGroupContext>
  )
}
