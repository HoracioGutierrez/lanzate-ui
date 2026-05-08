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
  },
  defaultVariants: {
    size: "md",
  },
})

type TextTag = "p" | "span" | "label" | "h1" | "h2" | "h3" | "h4"

type TextProps = {
  as?: TextTag
  size?: VariantProps<typeof textVariants>["size"]
} & React.HTMLAttributes<HTMLElement>

function Text({ as: Tag = "p", size, className, children, ...props }: TextProps) {
  return (
    <Tag
      data-slot="text"
      data-size={size}
      className={cn(textVariants({ size, className }))}
      {...props}
    >
      {children}
    </Tag>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Text, textVariants }
