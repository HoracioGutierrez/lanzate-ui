import { cn } from "@/lib/utils"

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "label" | "h1" | "h2" | "h3" | "h4"
}

export function Text({ as: Tag = "p", className, children = "Default Text", ...props }: TextProps) {
  return (
    <Tag
      className={cn("text-base text-foreground leading-normal", className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
