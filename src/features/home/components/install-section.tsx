import { Text } from "@/components/ui/text"

import { SUPPORTED_STACKS } from "../home.constants"
import { SectionEyebrow } from "./section-eyebrow"
import { TerminalWindow } from "./terminal-window"

export function InstallSection() {
  return (
    <section id="docs" aria-labelledby="install-title" className="scroll-mt-20 border-y border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <SectionEyebrow>INSTALLATION</SectionEyebrow>
          <Text render={<h2 id="install-title" />} variant="heading" size="2xl" leading="tight">
            One command
            <br />
            and you&apos;re in orbit.
          </Text>
          <Text color="muted" leading="relaxed" className="mt-4 max-w-md">
            Lanzate UI is not installed as a dependency. Bring the components to your repo, edit them to your liking, and
            keep full control of the code you ship to production.
          </Text>
          <ul aria-label="Works with" className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
            {SUPPORTED_STACKS.map((stack) => (
              <li key={stack} className="rounded border border-border bg-background px-2 py-1">
                {stack}
              </li>
            ))}
          </ul>
        </div>
        <TerminalWindow />
      </div>
    </section>
  )
}
