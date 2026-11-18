"use client"

import type { ReactNode } from "react"
import { Button as ButtonPart } from "@ui-sdk/react/button"
import { TooltipTrigger } from "@ui-sdk/react/tooltip"

// Import other registry components by exact file, not their folder's index.ts:
// the shadcn CLI rewrites `@/components/ui/tooltip` to `<ui>/tooltip/tooltip`.
import { Tooltip } from "@/components/ui/tooltip/tooltip"
import { TooltipContent } from "@/components/ui/tooltip/tooltip-content"
import { cn } from "@/lib/utils"

import { ButtonSpinner } from "./button-spinner"
import type { ButtonProps } from "./button.types"
import { buttonVariants, squarePaddingClasses, tapClasses } from "./button.variants"

export function Button({
  color,
  variant,
  effect,
  padding = "base",
  radius,
  textSize,
  iconSize,
  mobile,
  icon,
  startIcon,
  endIcon,
  iconClassName,
  textClassName,
  isLoading,
  loadingText,
  tooltip,
  tapAnimation = true,
  className,
  children,
  disabled,
  focusableWhenDisabled,
  ...props
}: ButtonProps) {
  const wrapIcon = (node: ReactNode) =>
    node == null ? null : iconClassName ? <span className={iconClassName}>{node}</span> : node

  const label: ReactNode = isLoading && loadingText != null ? loadingText : (children as ReactNode)

  const content = (busy: boolean) => {
    const leading = (node: ReactNode) => wrapIcon(busy ? <ButtonSpinner /> : node)
    if (icon != null) return leading(icon)
    return (
      <>
        {leading(startIcon)}
        {mobile === "only-icon" ? (
          label != null && <span className={cn("max-sm:sr-only", textClassName)}>{label}</span>
        ) : textClassName ? (
          <span className={textClassName}>{label}</span>
        ) : (
          label
        )}
        {wrapIcon(endIcon)}
      </>
    )
  }

  const buttonEl = (
    <ButtonPart
      data-color={color}
      data-variant={variant}
      data-effect={effect}
      data-padding={padding}
      data-radius={radius}
      data-text-size={textSize}
      data-icon-size={iconSize}
      data-mobile={mobile}
      aria-busy={isLoading || undefined}
      disabled={disabled || isLoading}
      focusableWhenDisabled={focusableWhenDisabled ?? tooltip != null}
      className={cn(
        buttonVariants({ color, variant, effect, padding, radius, textSize, iconSize, mobile }),
        icon != null && squarePaddingClasses[padding],
        tapAnimation && tapClasses,
        className
      )}
      {...props}
    >
      {(state) => content(Boolean(isLoading || state.pending))}
    </ButtonPart>
  )

  if (tooltip == null) return buttonEl

  return (
    <Tooltip>
      <TooltipTrigger render={buttonEl} />
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
