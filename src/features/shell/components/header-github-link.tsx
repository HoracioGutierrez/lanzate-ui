import { cn } from "@/lib/utils"

import { GITHUB_URL } from "../shell.constants"
import type { HiddenWhenFloatingProps } from "../shell.types"

export function HeaderGithubLink({ hidden }: HiddenWhenFloatingProps) {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      inert={hidden}
      className={cn(
        "hidden h-9 items-center overflow-hidden rounded-md border border-border bg-card px-3.5 text-sm font-medium whitespace-nowrap transition-[max-width,opacity,padding,border-width] duration-200 hover:bg-accent sm:inline-flex motion-reduce:transition-none",
        hidden ? "pointer-events-none max-w-0 border-0 px-0 opacity-0" : "max-w-32"
      )}
    >
      GitHub
    </a>
  )
}
