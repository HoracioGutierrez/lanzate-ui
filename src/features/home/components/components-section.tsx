import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

import { ButtonShowcase } from "./button-showcase"
import { FloatingToolbarShowcase } from "./floating-toolbar-showcase"
import { FrameShowcase } from "./frame-showcase"
import { SectionEyebrow } from "./section-eyebrow"
import { TextShowcase } from "./text-showcase"

export function ComponentsSection() {
  return (
    <section id="components" aria-labelledby="components-title" className="relative scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>COMPONENTS · 01 — 04</SectionEyebrow>
            <Text render={<h2 id="components-title" />} variant="heading" size="display">
              One piece for every
              <br />
              part of the interface.
            </Text>
          </div>
          <Text color="muted" leading="relaxed" className="md:max-w-sm">
            Each component lives in your repo, not in a node_module. Copy, paste, modify. No lock-in, no surprises.
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          <ButtonShowcase />
          <TextShowcase />
          <FloatingToolbarShowcase />
          <FrameShowcase />
        </div>

        <div className="mt-8 flex justify-center">
          <Button render={<Link href="/docs" />} endIcon={<ArrowRight size={14} aria-hidden="true" />}>
            Go to docs
          </Button>
        </div>
      </div>
    </section>
  )
}
