import { Badge, BadgeDot, BadgeTag } from "@/components/ui/badge"
import { Text } from "@/components/ui/text"
import { SiteLogo } from "@/features/shell/components/site-logo"
import { GithubIcon } from "@/features/shell/icons/github-icon"
import { XIcon } from "@/features/shell/icons/x-icon"
import { GITHUB_URL } from "@/features/shell/shell.constants"

import { VERSION } from "../home.constants"

export function HomeFooter() {
  return (
    <footer id="changelog" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div className="col-span-2">
            <SiteLogo />
            <Text size="sm" color="muted" leading="relaxed" className="mt-4 max-w-xs">
              Copy-paste components to build interfaces that take off. Open source under MIT license.
            </Text>
          </div>

          <div>
            <Text render={<h2 />} variant="overline" size="xs" className="mb-3">
              Community
            </Text>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-brand">
                  <GithubIcon className="size-4 shrink-0" />
                  GitHub
                </a>
              </li>
              <li>
                <span className="inline-flex cursor-not-allowed items-center gap-2 text-muted-foreground/50 select-none">
                  <XIcon className="size-4 shrink-0" />
                  X / Twitter <span className="sr-only">(coming soon)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <Text size="xs" color="muted">
            © 2026 Lanzate UI · Built with ui-sdk, Tailwind and coffee.
          </Text>
          <Badge variant="surface" color="muted" className="bg-card/30 shadow-none backdrop-blur-none">
            <BadgeTag>v{VERSION}</BadgeTag>
            <span className="flex items-center gap-1.5">
              <BadgeDot />
              All operating systems
            </span>
          </Badge>
        </div>
      </div>
    </footer>
  )
}
