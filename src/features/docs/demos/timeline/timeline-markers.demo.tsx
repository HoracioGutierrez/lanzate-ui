import { Timeline, TimelineItem, TimelineMarker, TimelineTitle, type TimelineMarkerVariant, type TimelineSize } from "@/components/ui/timeline"

const sizes: TimelineSize[] = ["sm", "md", "lg"]
const variants: TimelineMarkerVariant[] = ["solid", "soft", "outline"]

export function TimelineMarkersDemo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-10">
      {sizes.map((size) => (
        <Timeline key={size} aria-label={`Markers, ${size}`} size={size}>
          {variants.map((variant) => (
            <TimelineItem key={variant} color="info">
              <TimelineMarker variant={variant} />
              <TimelineTitle>
                {size} · {variant}
              </TimelineTitle>
            </TimelineItem>
          ))}
        </Timeline>
      ))}
    </div>
  )
}
