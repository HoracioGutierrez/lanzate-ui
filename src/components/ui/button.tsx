import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1em] [&_svg]:shrink-0",
  {
    variants: {
      color: {
        primary:   "[--btn-color:var(--primary)] [--btn-fg:var(--primary-foreground)] [--btn-accent:var(--primary)]",
        secondary: "[--btn-color:var(--secondary)] [--btn-fg:var(--secondary-foreground)] [--btn-accent:var(--secondary-foreground)]",
        muted:     "[--btn-color:var(--muted)] [--btn-fg:var(--muted-foreground)] [--btn-accent:var(--muted-foreground)]",
        info:      "[--btn-color:var(--info)] [--btn-fg:oklch(1_0_0)] [--btn-accent:var(--info)]",
        warning:   "[--btn-color:var(--warning)] [--btn-fg:oklch(0_0_0)] [--btn-accent:var(--warning)]",
        success:   "[--btn-color:var(--success)] [--btn-fg:oklch(1_0_0)] [--btn-accent:var(--success)]",
        error:     "[--btn-color:var(--destructive)] [--btn-fg:oklch(1_0_0)] [--btn-accent:var(--destructive)]",
      },
      variant: {
        solid:     "bg-(--btn-color) text-(--btn-fg) hover:bg-(--btn-color)/90",
        outline:   "border border-(--btn-accent) text-(--btn-accent) bg-transparent hover:bg-(--btn-accent)/10",
        ghost:     "bg-transparent text-(--btn-accent) hover:bg-(--btn-accent)/10",
        secondary: "bg-(--btn-accent)/15 text-(--btn-accent) hover:bg-(--btn-accent)/25",
        dashed:    "border border-dashed border-(--btn-accent) text-(--btn-accent) bg-transparent hover:bg-(--btn-accent)/10",
        surface:   "bg-(--btn-color) text-(--btn-fg) hover:bg-(--btn-color)/90 btn-surface",
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
      radius: {
        none: "rounded-none",
        sm:   "rounded-sm",
        md:   "rounded-md",
        lg:   "rounded-lg",
        xl:   "rounded-xl",
        full: "rounded-full",
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
      variant: "solid",
      padding: "base",
      radius:  "md",
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
  variant?:   VariantProps<typeof buttonVariants>["variant"]
  padding?:   VariantProps<typeof buttonVariants>["padding"]
  radius?:    VariantProps<typeof buttonVariants>["radius"]
  textSize?:  VariantProps<typeof buttonVariants>["textSize"]
  iconSize?:  VariantProps<typeof buttonVariants>["iconSize"]
  mobile?:    VariantProps<typeof buttonVariants>["mobile"]
  elevated?:    boolean
  glow?:        boolean
  icon?:        React.ReactNode
  startIcon?:   React.ReactNode
  endIcon?:     React.ReactNode
  iconClassName?: string
  textClassName?: string
  isLoading?:    boolean
  loadingText?:  string
  tooltip?:      React.ReactNode
  tapAnimation?: boolean
} & HTMLMotionProps<"button">

function Button({
  color, variant, padding = "base", radius, textSize, iconSize, mobile,
  icon, startIcon, endIcon,
  iconClassName, textClassName,
  isLoading, loadingText,
  tooltip,
  elevated,
  glow,
  tapAnimation = true,
  className, children,
  disabled,
  ...props
}: ButtonProps) {
  const effectiveDisabled = disabled || isLoading

  const spinnerEl = (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <Loader2 className="animate-spin" />
    </motion.span>
  )

  const effectiveStartIcon = isLoading ? spinnerEl : startIcon
  const effectiveIcon      = isLoading && icon != null ? spinnerEl : icon
  const effectiveChildren: React.ReactNode = isLoading && loadingText != null ? loadingText : children as React.ReactNode

  const shouldAnimate = tapAnimation && !effectiveDisabled

  const wrapIcon = (node: React.ReactNode) =>
    node == null
      ? null
      : iconClassName
        ? <span className={iconClassName}>{node}</span>
        : node

  const wrappedStartIcon = wrapIcon(effectiveStartIcon)
  const wrappedEndIcon   = wrapIcon(endIcon)
  const wrappedIcon      = wrapIcon(effectiveIcon)

  const buttonEl = (
    <motion.button
      whileTap={shouldAnimate ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      data-slot="button"
      data-color={color}
      data-variant={variant}
      data-padding={padding}
      data-radius={radius}
      data-text-size={textSize}
      data-icon-size={iconSize}
      data-mobile={mobile}
      data-elevated={elevated || undefined}
      data-glow={glow || undefined}
      disabled={effectiveDisabled}
      className={cn(
        buttonVariants({ color, variant, padding, radius, textSize, iconSize, mobile }),
        effectiveIcon != null && squarePaddingMap[padding ?? "base"],
        elevated && "btn-elevated",
        glow && "btn-glow",
        className,
      )}
      {...props}
    >
      {wrappedIcon != null ? (
        wrappedIcon
      ) : mobile === "only-icon" ? (
        <>
          {wrappedStartIcon}
          {effectiveChildren != null && (
            <span className={cn("hidden sm:inline", textClassName)}>{effectiveChildren}</span>
          )}
          {wrappedEndIcon}
        </>
      ) : (
        <>
          {wrappedStartIcon}
          {textClassName
            ? <span className={textClassName}>{effectiveChildren}</span>
            : effectiveChildren}
          {wrappedEndIcon}
        </>
      )}
    </motion.button>
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
