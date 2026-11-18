import { Frame, FrameBack, FrameContent, FrameHeader, FrameMenu, FrameMenuItem, FrameTitle } from "@/components/ui/frame"

import { ShowcaseCard } from "./showcase-card"

export function FrameShowcase() {
  return (
    <ShowcaseCard title="Frame" description="Corner marks, header, menu and collapse." number="04">
      <div className="flex flex-col gap-4 px-6 py-8">
        <Frame size="sm" collapsible>
          <FrameHeader>
            <FrameBack />
            <FrameTitle>Order 4189</FrameTitle>
            <FrameMenu label="Order 4189 actions">
              <FrameMenuItem value="open">Open</FrameMenuItem>
              <FrameMenuItem value="refund">Refund</FrameMenuItem>
            </FrameMenu>
          </FrameHeader>
          <FrameContent>
            <dl className="grid grid-cols-2 gap-1 text-sm">
              <dt className="text-muted-foreground">Items</dt>
              <dd className="text-end">3 items</dd>
              <dt className="text-muted-foreground">Total</dt>
              <dd className="text-end font-mono">$84.00</dd>
            </dl>
          </FrameContent>
        </Frame>
        <Frame size="sm" color="warning" collapsible defaultOpen={false}>
          <FrameHeader>
            <FrameTitle>Low stock · 2 items</FrameTitle>
          </FrameHeader>
          <FrameContent>
            <p className="text-sm text-muted-foreground">Restock before Friday.</p>
          </FrameContent>
        </Frame>
      </div>
    </ShowcaseCard>
  )
}
