import { Frame, FrameContent, FrameHeader, FrameMenu, FrameMenuItem, FrameTitle } from "@/components/ui/frame"

export function FrameColorsDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <Frame size="sm">
        <FrameHeader>
          <FrameTitle>Primary</FrameTitle>
        </FrameHeader>
        <FrameContent>
          <p className="text-sm">The default: card background, primary corners.</p>
        </FrameContent>
      </Frame>
      <Frame size="sm" color="warning" collapsible>
        <FrameHeader>
          <FrameTitle>Low stock</FrameTitle>
          <FrameMenu label="Low stock actions">
            <FrameMenuItem value="restock">Restock</FrameMenuItem>
          </FrameMenu>
        </FrameHeader>
        <FrameContent>
          <p className="text-sm">3 products have fewer than 5 units left.</p>
        </FrameContent>
      </Frame>
      <Frame size="sm" color="error" collapsible>
        <FrameHeader>
          <FrameTitle>Payment failed</FrameTitle>
        </FrameHeader>
        <FrameContent>
          <p className="text-sm">Order 4190 was declined by the card issuer.</p>
        </FrameContent>
      </Frame>
    </div>
  )
}
