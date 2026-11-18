import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { GITHUB_URL } from "../shell.constants"
import type { HiddenWhenFloatingProps } from "../shell.types"

export function HeaderGithubLink({ hidden }: HiddenWhenFloatingProps) {
  return (
    <Button
      variant="subtle"
      mobile="hidden"
      render={<a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" />}
      inert={hidden}
      className={cn(
        // Collapses with the floating header: animate its width too, keeping Button's own transitions.
        "overflow-hidden whitespace-nowrap transition-[max-width,opacity,padding,border-width,background-color,scale] duration-200",
        hidden ? "pointer-events-none max-w-0 border-0 px-0 opacity-0" : "max-w-32"
      )}
    >
      GitHub
    </Button>
  )
}
