import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2",
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
    },
    defaultVariants: {
      color: "primary",
    },
  }
)

type ButtonProps = {
  color?: VariantProps<typeof buttonVariants>["color"]
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ color, className, children, ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      data-color={color}
      className={cn(buttonVariants({ color, className }))}
      {...props}
    >
      {children}
    </button>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
