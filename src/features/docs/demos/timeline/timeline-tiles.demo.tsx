import { Timeline, TimelineDescription, TimelineItem, TimelineMarker, TimelineTime, TimelineTitle } from "@/components/ui/timeline"

export function TimelineTilesDemo() {
  return (
    <Timeline aria-label="Deploy status" orientation="horizontal" variant="tiles" appear className="w-full max-w-2xl">
      <TimelineItem status="complete">
        <TimelineMarker tooltip="312 tests and the bundle size budget passed" />
        <TimelineTitle>Checks</TimelineTitle>
        <TimelineDescription>Passed</TimelineDescription>
        <TimelineTime dateTime="2026-11-19T14:20">14:20</TimelineTime>
      </TimelineItem>
      <TimelineItem status="failed">
        <TimelineMarker tooltip="Timed out after 10 minutes on step 4 of 6" />
        <TimelineTitle>Build</TimelineTitle>
        <TimelineDescription>Failed</TimelineDescription>
        <TimelineTime dateTime="2026-11-19T14:24">14:24</TimelineTime>
      </TimelineItem>
      <TimelineItem status="current">
        <TimelineMarker pulse tooltip="Retrying with a warm cache, about 3 minutes left" />
        <TimelineTitle>Retry</TimelineTitle>
        <TimelineDescription>Building</TimelineDescription>
        <TimelineTime dateTime="2026-11-19T14:31">14:31</TimelineTime>
      </TimelineItem>
      <TimelineItem status="upcoming">
        <TimelineMarker tooltip="Goes to every region once the build passes" />
        <TimelineTitle>Deploy</TimelineTitle>
        <TimelineDescription>Pending</TimelineDescription>
        <TimelineTime dateTime="2026-11-19T14:40">~14:40</TimelineTime>
      </TimelineItem>
    </Timeline>
  )
}
