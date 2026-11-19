import { Timeline, TimelineConnector, TimelineItem, TimelineMarker, TimelineTime, TimelineTitle } from "@/components/ui/timeline"

const milestones = [
  { title: "Kickoff", dateTime: "2026-01", time: "January", status: "complete" },
  { title: "Design review", dateTime: "2026-03", time: "March", status: "complete" },
  { title: "Beta", dateTime: "2026-06", time: "June", status: "current" },
  { title: "Launch", dateTime: "2026-09", time: "September", status: "upcoming" },
] as const

export function TimelineHorizontalDemo() {
  return (
    <Timeline aria-label="Roadmap" orientation="horizontal" size="sm" loop={false} className="w-full max-w-xl">
      {milestones.map((milestone) => (
        <TimelineItem key={milestone.title} status={milestone.status}>
          <TimelineMarker pulse={milestone.status === "current"} tooltip={`${milestone.title}: ${milestone.status}`} />
          <TimelineConnector />
          <TimelineTitle>{milestone.title}</TimelineTitle>
          <TimelineTime dateTime={milestone.dateTime}>{milestone.time}</TimelineTime>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
