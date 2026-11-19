import { ChevronDown } from "lucide-react"

import {
  Timeline,
  TimelineCollapsible,
  TimelineCollapsiblePanel,
  TimelineCollapsibleTrigger,
  TimelineDescription,
  TimelineItem,
  TimelineLeader,
  TimelineMarker,
  TimelineStack,
  TimelineStackItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

// Every state each stage can be in. The status picks the color: complete green, current yellow,
// failed red, upcoming gray.
const stages = {
  payment: {
    title: "Payment",
    states: {
      pending: { label: "Pending", status: "upcoming", detail: "Waiting for the bank transfer of $100.00" },
      accepted: { label: "Accepted", status: "complete", time: "9:05", detail: "Visa ending 4242 · $100.00 approved at 9:05" },
      declined: { label: "Declined", status: "failed", time: "9:02", detail: "Mastercard ending 5100 · insufficient funds" },
    },
  },
  order: {
    title: "Order",
    states: {
      pending: { label: "Pending", status: "upcoming", detail: "Starts once the payment is accepted" },
      processing: { label: "Processing order", status: "current", time: "9:20", detail: "Picking 2 items at the Rosario warehouse" },
      created: { label: "Order created", status: "complete", time: "9:40", detail: "Order #4189 · 2 items packed, 1.2 kg" },
    },
  },
  delivery: {
    title: "Delivery",
    states: {
      pending: { label: "Pending", status: "upcoming", detail: "Starts once the order is created" },
      awaiting: { label: "Awaiting delivery", status: "current", time: "11:00", detail: "Booked with the carrier for today, 14:00 to 18:00" },
      shipped: { label: "Shipped", status: "complete", time: "11:40", detail: "Tracking 1Z 999 AA1 01 · arrives tomorrow" },
      pickup: { label: "Ready for pickup", status: "complete", time: "11:15", detail: "Store on Av. Pellegrini 1250 · open until 20:00" },
    },
  },
  finish: {
    title: "Finish",
    states: {
      pending: { label: "Pending", status: "upcoming", detail: "Closes once the customer has the order" },
      completed: { label: "Completed", status: "complete", time: "Nov 20", detail: "Delivered and signed for by the customer" },
      refunded: { label: "Refunded", status: "failed", time: "Nov 22", detail: "Returned damaged · $100.00 back to Visa ending 4242" },
      cancelled: { label: "Cancelled", status: "failed", time: "9:50", detail: "Cancelled by the customer · nothing was charged" },
    },
  },
} as const

// One order per combination that can happen, in the order a purchase moves.
const orders = [
  { id: "4180", name: "Coke", price: "$100", payment: "pending", order: "pending", delivery: "pending", finish: "pending" },
  { id: "4181", name: "Sparkling water", price: "$40", payment: "declined", order: "pending", delivery: "pending", finish: "cancelled" },
  { id: "4182", name: "Orange juice", price: "$65", payment: "accepted", order: "processing", delivery: "pending", finish: "pending" },
  { id: "4183", name: "Iced tea", price: "$55", payment: "accepted", order: "created", delivery: "awaiting", finish: "pending" },
  { id: "4184", name: "Lemonade", price: "$45", payment: "accepted", order: "created", delivery: "shipped", finish: "pending" },
  { id: "4185", name: "Cold brew", price: "$80", payment: "accepted", order: "created", delivery: "pickup", finish: "pending" },
  { id: "4186", name: "Ginger ale", price: "$50", payment: "accepted", order: "created", delivery: "shipped", finish: "completed" },
  { id: "4187", name: "Tonic water", price: "$35", payment: "accepted", order: "created", delivery: "shipped", finish: "refunded" },
  { id: "4188", name: "Kombucha", price: "$90", payment: "accepted", order: "created", delivery: "pending", finish: "cancelled" },
] as const

function eventsOf(order: (typeof orders)[number]) {
  return [
    { key: "payment", title: stages.payment.title, ...stages.payment.states[order.payment] },
    { key: "order", title: stages.order.title, ...stages.order.states[order.order] },
    { key: "delivery", title: stages.delivery.title, ...stages.delivery.states[order.delivery] },
    { key: "finish", title: stages.finish.title, ...stages.finish.states[order.finish] },
  ]
}

export function TimelineCollapsibleDemo() {
  return (
    <ul className="flex w-full max-w-lg flex-col gap-3">
      {orders.map((order) => {
        const events = eventsOf(order)
        return (
          <li key={order.id} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-sm">
            <TimelineCollapsible>
              <TimelineCollapsibleTrigger>
                <span className="text-muted-text">Activity status</span>
                <TimelineLeader />
                <TimelineStack>
                  {events.map((event) => (
                    <TimelineStackItem key={event.key} status={event.status} />
                  ))}
                </TimelineStack>
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out in-data-open:rotate-180 motion-reduce:transition-none"
                />
              </TimelineCollapsibleTrigger>
              <TimelineCollapsiblePanel>
                <Timeline aria-label={`Order #${order.id} activity`} orientation="horizontal" variant="tiles" size="sm">
                  {events.map((event) => (
                    <TimelineItem key={event.key} value={event.key} status={event.status}>
                      <TimelineMarker pulse={event.status === "current"} tooltip={event.detail} />
                      <TimelineTitle>{event.title}</TimelineTitle>
                      <TimelineDescription>{event.label}</TimelineDescription>
                      {"time" in event && <TimelineTime>{event.time}</TimelineTime>}
                    </TimelineItem>
                  ))}
                </Timeline>
              </TimelineCollapsiblePanel>
            </TimelineCollapsible>
            <div className="flex items-center gap-2">
              <span className="text-muted-text">Order</span>
              <TimelineLeader />
              <span className="font-medium tabular-nums">#{order.id}</span>
            </div>
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
        )
      })}
    </ul>
  )
}
