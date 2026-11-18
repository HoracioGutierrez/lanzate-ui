import { Frame, FrameContent, FrameHeader, FrameTitle } from "@/components/ui/frame"

export function FramePlainDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <Frame size="sm">
        <FrameContent>
          <p className="text-sm">No header: just the box and its corners.</p>
        </FrameContent>
      </Frame>
      <Frame size="sm">
        <FrameHeader height="lg">
          <FrameTitle>Taller header, static title</FrameTitle>
        </FrameHeader>
        <FrameContent>
          <p className="text-sm">Without collapsible, the title is plain text.</p>
        </FrameContent>
      </Frame>
    </div>
  )
}
