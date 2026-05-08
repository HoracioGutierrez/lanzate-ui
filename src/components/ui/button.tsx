import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1em] [&_svg]:shrink-0",
  {
    variants: {
      color: {
        primary:   "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        muted:     "bg-muted text-muted-foreground hover:bg-muted/80",
        info:      "bg-info text-white hover:bg-info/90",
        warning:   "bg-warning text-black hover:bg-warning/90",
        success:   "bg-success text-white hover:bg-success/90",
        error:     "bg-destructive text-white hover:bg-destructive/90",
      },
      padding: {
        none: "px-0 py-0 text-sm",
        xs:   "px-2 py-1 text-xs",
        sm:   "px-3 py-1.5 text-sm",
        base: "px-4 py-2 text-sm",
        md:   "px-5 py-2.5 text-base",
        lg:   "px-6 py-3 text-lg",
        xl:   "px-8 py-4 text-xl",
      },
      textSize: {
        xs:      "text-xs",
        sm:      "text-sm",
        base:    "text-base",
        lg:      "text-lg",
        xl:      "text-xl",
        "2xl":   "text-2xl",
        display: "text-display",
      },
      iconSize: {
        xs:   "[&_svg]:size-[0.75em]",
        sm:   "[&_svg]:size-[0.875em]",
        base: "[&_svg]:size-[1em]",
        md:   "[&_svg]:size-[1.25em]",
        lg:   "[&_svg]:size-[1.5em]",
        xl:   "[&_svg]:size-[2em]",
      },
      mobile: {
        "only-icon":  "",
        "full-width": "w-full sm:w-auto",
        "hidden":     "hidden sm:inline-flex",
      },
    },
    defaultVariants: {
      color:   "primary",
      padding: "base",
    },
  }
)

const squarePaddingMap: Record<NonNullable<VariantProps<typeof buttonVariants>["padding"]>, string> = {
  none: "p-0",
  xs:   "p-1",
  sm:   "p-1.5",
  base: "p-2",
  md:   "p-2.5",
  lg:   "p-3",
  xl:   "p-4",
}

type ButtonProps = {
  color?:     VariantProps<typeof buttonVariants>["color"]
  padding?:   VariantProps<typeof buttonVariants>["padding"]
  textSize?:  VariantProps<typeof buttonVariants>["textSize"]
  iconSize?:  VariantProps<typeof buttonVariants>["iconSize"]
  mobile?:    VariantProps<typeof buttonVariants>["mobile"]
  icon?:        React.ReactNode
  startIcon?:   React.ReactNode
  endIcon?:     React.ReactNode
  isLoading?:   boolean
  loadingText?: string
  tooltip?:     React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({
  color, padding = "base", textSize, iconSize, mobile,
  icon, startIcon, endIcon,
  isLoading, loadingText,
  tooltip,
  className, children,
  disabled,
  ...props
}: ButtonProps) {
  const effectiveDisabled  = disabled || isLoading
  const effectiveStartIcon = isLoading ? <Loader2 className="animate-spin" /> : startIcon
  const effectiveIcon      = isLoading && icon != null ? <Loader2 className="animate-spin" /> : icon
  const effectiveChildren  = isLoading && loadingText != null ? loadingText : children

  const buttonEl = (
    <button
      data-slot="button"
      data-color={color}
      data-padding={padding}
      data-text-size={textSize}
      data-icon-size={iconSize}
      data-mobile={mobile}
      disabled={effectiveDisabled}
      className={cn(
        buttonVariants({ color, padding, textSize, iconSize, mobile }),
        effectiveIcon != null && squarePaddingMap[padding ?? "base"],
        className,
      )}
      {...props}
    >
      {effectiveIcon != null ? (
        effectiveIcon
      ) : mobile === "only-icon" ? (
        <>
          {effectiveStartIcon}
          {effectiveChildren != null && <span className="hidden sm:inline">{effectiveChildren}</span>}
          {endIcon}
        </>
      ) : (
        <>
          {effectiveStartIcon}
          {effectiveChildren}
          {endIcon}
        </>
      )}
    </button>
  )

  if (!tooltip) return buttonEl

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {effectiveDisabled ? (
            <span tabIndex={-1} className="inline-flex">{buttonEl}</span>
          ) : (
            buttonEl
          )}
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
export type { ButtonProps }
