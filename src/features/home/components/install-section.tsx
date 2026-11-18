import { SUPPORTED_STACKS } from "../home.constants"
import { SectionEyebrow } from "./section-eyebrow"
import { TerminalWindow } from "./terminal-window"

export function InstallSection() {
  return (
    <section id="docs" aria-labelledby="install-title" className="scroll-mt-20 border-y border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <SectionEyebrow>INSTALLATION</SectionEyebrow>
          <h2 id="install-title" className="text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
            One command
            <br />
            and you&apos;re in orbit.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            Lanzate UI is not installed as a dependency. Bring the components to your repo, edit them to your liking, and
            keep full control of the code you ship to production.
          </p>
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
