import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { INSTALL_COMMAND } from "../home.constants"
import { HeroBadge } from "./hero-badge"
import { InstallCommandButton } from "./install-command-button"
import { StackMarquee } from "./stack-marquee"
import { StatsRow } from "./stats-row"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute -top-40 left-1/2 size-175 -translate-x-1/2 rounded-full" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="flex flex-col items-center text-center">
          <HeroBadge />

          <h1 className="text-fade mt-6 max-w-5xl text-5xl leading-[0.95] font-semibold tracking-tight md:text-7xl lg:text-hero">
            Components <em className="font-serif font-normal italic">that take off</em>
            <br />
            your next interface.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Lanzate UI is an open source collection of copy-paste components for React, built on ui-sdk and Tailwind. Clean
            design, accessible, and 100% yours.
          </p>

          <div className="mt-9 flex max-w-full flex-col items-center gap-3 sm:flex-row">
            <Button
              render={<a href="#docs" />}
              padding="md"
              effect="elevated"
              endIcon={<ArrowRight aria-hidden="true" />}
            >
              Get Started Now
            </Button>
            <InstallCommandButton command={INSTALL_COMMAND} />
          </div>

          <StatsRow />
        </div>
      </div>

      <StackMarquee />
    </section>
  )
}
