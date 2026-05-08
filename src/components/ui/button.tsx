import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
    },
    defaultVariants: {
      color:   "primary",
      padding: "base",
    },
  }
)

type ButtonProps = {
  color?:    VariantProps<typeof buttonVariants>["color"]
  padding?:  VariantProps<typeof buttonVariants>["padding"]
  textSize?: VariantProps<typeof buttonVariants>["textSize"]
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ color, padding, textSize, className, children, ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      data-color={color}
      data-padding={padding}
      data-text-size={textSize}
      className={cn(buttonVariants({ color, padding, textSize, className }))}
      {...props}
    >
      {children}
    </button>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
