import { STACK } from "../config/stack"

const ROUNDS = ["first", "second"] as const

/** Endless scrolling row of the tech stack. The list renders twice so the loop is seamless. */
export function StackMarquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-muted/30">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-5">
        <p className="hidden shrink-0 font-mono text-xs tracking-wide whitespace-nowrap text-muted-foreground md:block">STACK</p>
        <div className="flex-1 overflow-hidden mask-[linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <ul className="marquee-track flex w-max items-center gap-10">
            {ROUNDS.flatMap((round) =>
              STACK.map(({ name, icon: Icon }) => (
                <li
                  key={`${round}-${name}`}
                  aria-hidden={round === "second" || undefined}
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground/55"
                >
                  <Icon width={15} height={15} />
                  {name}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
