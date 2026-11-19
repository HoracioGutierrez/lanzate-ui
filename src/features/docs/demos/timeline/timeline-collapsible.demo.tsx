import { ChevronDown } from "lucide-react"

import {
  Timeline,
  TimelineCollapsible,
  TimelineCollapsiblePanel,
  TimelineCollapsibleTrigger,
  TimelineItem,
  TimelineLeader,
  TimelineMarker,
  TimelineStack,
  TimelineStackItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

const orders = [
  {
    id: "coke",
    name: "Coke",
    price: "$100",
    activity: [
      { id: "declined", title: "Payment failed", time: "9:02", dateTime: "2026-11-19T09:02", detail: "Card declined, retried automatically", status: "failed" },
      { id: "paid", title: "Paid", time: "9:05", dateTime: "2026-11-19T09:05", detail: "Card ending 4242", status: "complete" },
      { id: "packing", title: "Packing", time: "9:30", dateTime: "2026-11-19T09:30", detail: "At the warehouse in Rosario", status: "current" },
      { id: "shipping", title: "Shipping", time: "Today", dateTime: "2026-11-19", detail: "Leaves with the next truck", status: "upcoming" },
    ],
  },
  {
    id: "water",
    name: "Sparkling water",
    price: "$40",
    activity: [
      { id: "paid", title: "Paid", time: "8:15", dateTime: "2026-11-19T08:15", detail: "Transfer received", status: "complete" },
      { id: "shipped", title: "Shipped", time: "11:40", dateTime: "2026-11-19T11:40", detail: "Tracking 1Z 999 AA1 01", status: "complete" },
      { id: "delivery", title: "Out for delivery", time: "14:00", dateTime: "2026-11-19T14:00", detail: "Arrives before 18:00", status: "current" },
    ],
  },
] as const

export function TimelineCollapsibleDemo() {
  return (
    <ul className="flex w-full max-w-lg flex-col gap-3">
      {orders.map((order) => (
        <li key={order.id} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-sm">
          <TimelineCollapsible>
            <TimelineCollapsibleTrigger>
              <span className="text-muted-text">Activity status</span>
              <TimelineLeader />
              <TimelineStack>
                {order.activity.map((event) => (
                  <TimelineStackItem key={event.id} status={event.status} />
                ))}
              </TimelineStack>
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out in-data-open:rotate-180 motion-reduce:transition-none"
              />
            </TimelineCollapsibleTrigger>
            <TimelineCollapsiblePanel>
              <Timeline aria-label={`${order.name} activity`} orientation="horizontal" variant="tiles" size="sm">
                {order.activity.map((event) => (
                  <TimelineItem key={event.id} value={event.id} status={event.status}>
                    <TimelineMarker tooltip={event.detail} />
                    <TimelineTitle>{event.title}</TimelineTitle>
                    <TimelineTime dateTime={event.dateTime}>{event.time}</TimelineTime>
                  </TimelineItem>
                ))}
              </Timeline>
            </TimelineCollapsiblePanel>
          </TimelineCollapsible>
          <div className="flex items-center gap-2">
            <span className="text-muted-text">Price</span>
            <TimelineLeader />
            <span className="font-medium tabular-nums">{order.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-text">Name</span>
            <TimelineLeader />
            <span className="font-medium">{order.name}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
