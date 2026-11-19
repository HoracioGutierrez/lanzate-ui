import { Check, House, Package, Truck } from "lucide-react"

import {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

export function TimelineOrderStatusDemo() {
  return (
    <Timeline aria-label="Order #4189 status" className="w-full max-w-sm">
      <TimelineItem value="placed" status="complete">
        <TimelineMarker tooltip="Paid with the card ending 4242">
          <Check aria-hidden="true" />
        </TimelineMarker>
        <TimelineConnector />
        <TimelineTitle>Order placed</TimelineTitle>
        <TimelineTime dateTime="2026-11-17T10:02">Nov 17, 10:02 AM</TimelineTime>
      </TimelineItem>
      <TimelineItem value="packed" status="complete">
        <TimelineMarker tooltip="3 items, 1.2 kg">
          <Package aria-hidden="true" />
        </TimelineMarker>
        <TimelineConnector />
        <TimelineTitle>Packed</TimelineTitle>
        <TimelineTime dateTime="2026-11-18T08:40">Nov 18, 8:40 AM</TimelineTime>
      </TimelineItem>
      <TimelineItem value="shipped" status="current">
        <TimelineMarker pulse tooltip="Tracking number 1Z 999 AA1 01">
          <Truck aria-hidden="true" />
        </TimelineMarker>
        <TimelineConnector />
        <TimelineTitle>Shipped, in transit</TimelineTitle>
        <TimelineTime dateTime="2026-11-19T09:12">Today, 9:12 AM</TimelineTime>
        <TimelineDescription>Left the warehouse in Rosario.</TimelineDescription>
      </TimelineItem>
      <TimelineItem value="delivered" status="upcoming">
        <TimelineMarker>
          <House aria-hidden="true" />
        </TimelineMarker>
        <TimelineConnector />
        <TimelineTitle>Delivered</TimelineTitle>
        <TimelineTime dateTime="2026-11-21">Expected Friday</TimelineTime>
      </TimelineItem>
    </Timeline>
  )
}
