"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useScrolledPast } from "../hooks/use-scrolled-past"
import { HEADER_FLOAT_THRESHOLD } from "../shell.constants"
import { HeaderGithubLink } from "./header-github-link"
import { HeaderNav } from "./header-nav"
import { SiteLogo } from "./site-logo"
import { ThemePicker } from "./theme-picker"

/** Full-width bar at the top; after scrolling it shrinks into a floating pill. Pure CSS transitions. */
export function SiteHeader() {
  const floating = useScrolledPast(HEADER_FLOAT_THRESHOLD)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        data-floating={floating || undefined}
        className={cn(
          "relative mx-auto max-w-full overflow-hidden",
          "transition-[max-width,border-radius,margin-top] duration-400 ease-spring motion-reduce:transition-none",
          "data-floating:mt-3.5 data-floating:max-w-240 data-floating:rounded-full"
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-[inherit] transition-[background-color,backdrop-filter,box-shadow,border-color] duration-200",
            floating
              ? "border border-border bg-background/80 shadow-floating backdrop-blur-md"
              : "border-b border-border/70 bg-background"
          )}
        />

        <div className="relative flex h-14 items-center justify-between gap-4 px-6">
          <SiteLogo />
          <HeaderNav hidden={floating} />
          <div className="ml-auto flex items-center gap-2">
            <ThemePicker />
            <HeaderGithubLink hidden={floating} />
            <Button
              render={<Link href="/docs" />}
              endIcon={<ArrowRight aria-hidden="true" />}
              padding="sm"
              // On phones the theme picker needs the room: the arrow stays, the label goes to screen readers.
              mobile="only-icon"
              className="shrink-0 whitespace-nowrap"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
