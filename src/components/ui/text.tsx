import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

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

type TextTag = "p" | "span" | "label" | "h1" | "h2" | "h3" | "h4"

type TextProps = {
  as?: TextTag
  size?: VariantProps<typeof textVariants>["size"]
  color?: VariantProps<typeof textVariants>["color"]
} & React.HTMLAttributes<HTMLElement>

function Text({ as: Tag = "p", size, color, className, children, ...props }: TextProps) {
  return (
    <Tag
      data-slot="text"
      data-size={size}
      data-color={color}
      className={cn(textVariants({ size, color, className }))}
      {...props}
    >
      {children}
    </Tag>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Text, textVariants }
