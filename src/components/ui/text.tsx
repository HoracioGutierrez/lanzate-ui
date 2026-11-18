import { cva, type VariantProps } from "class-variance-authority"
import { renderElement, type PartProps } from "@ui-sdk/react/primitive"

import { cn } from "@/lib/utils"

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs leading-tight tracking-wide",
      sm: "text-sm leading-snug",
      md: "text-base leading-normal",
      lg: "text-lg leading-relaxed",
      xl: "text-xl leading-relaxed",
      "2xl": "text-2xl leading-snug tracking-tight",
      display: "text-display leading-tight tracking-tighter",
    },
    color: {
      primary:           "text-primary",
      secondary:         "text-secondary-foreground",
      muted:             "text-muted-foreground",
      "primary-muted":   "text-primary/60",
      "secondary-muted": "text-secondary-foreground/60",
      info:              "text-info",
      warning:           "text-warning",
      success:           "text-success",
      error:             "text-destructive",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type TextProps = {
  size?: VariantProps<typeof textVariants>["size"]
  color?: VariantProps<typeof textVariants>["color"]
  className?: string
} & Omit<PartProps<"p">, "color" | "className">

function Text({ size, color, className, render, ...props }: TextProps) {
  return renderElement(
    "p",
    {
      ...props,
      "data-slot": "text",
      "data-size": size,
      "data-color": color,
      className: cn(textVariants({ size, color, className })),
    },
    render
  )
}

export { Text, textVariants }
export type { TextProps }
