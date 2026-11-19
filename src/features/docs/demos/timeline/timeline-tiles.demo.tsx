import { Check, Clock, Truck, X } from "lucide-react"

import { Timeline, TimelineItem, TimelineMarker, TimelineTime, TimelineTitle } from "@/components/ui/timeline"

export function TimelineTilesDemo() {
  return (
    <Timeline aria-label="Deploy status" orientation="horizontal" variant="tiles" appear className="w-full max-w-2xl">
      <TimelineItem status="complete">
        <TimelineMarker tooltip="312 tests passed">
          <Check aria-hidden="true" />
        </TimelineMarker>
        <TimelineTitle>Checks passed</TimelineTitle>
        <TimelineTime dateTime="2026-11-19T14:20">2:20 PM</TimelineTime>
      </TimelineItem>
      <TimelineItem status="failed">
        <TimelineMarker tooltip="Timed out after 10 minutes, retried">
          <X aria-hidden="true" />
        </TimelineMarker>
        <TimelineTitle>Build failed</TimelineTitle>
        <TimelineTime dateTime="2026-11-19T14:24">2:24 PM</TimelineTime>
      </TimelineItem>
      <TimelineItem status="current">
        <TimelineMarker pulse tooltip="Rebuilding with a warm cache">
          <Truck aria-hidden="true" />
        </TimelineMarker>
        <TimelineTitle>Building</TimelineTitle>
        <TimelineTime dateTime="2026-11-19T14:31">Now</TimelineTime>
      </TimelineItem>
      <TimelineItem status="upcoming">
        <TimelineMarker>
          <Clock aria-hidden="true" />
        </TimelineMarker>
        <TimelineTitle>Deploy</TimelineTitle>
        <TimelineTime dateTime="2026-11-19T14:40">~2:40 PM</TimelineTime>
      </TimelineItem>
    </Timeline>
  )
}
