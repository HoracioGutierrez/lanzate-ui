"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTitle,
  type TimelineStatus,
} from "@/components/ui/timeline"

const steps = [
  { id: "cart", title: "Cart", description: "2 items" },
  { id: "shipping", title: "Shipping", description: "Standard, 3 to 5 days" },
  { id: "payment", title: "Payment", description: "Card ending 4242" },
  { id: "review", title: "Review", description: "Confirm and pay" },
]

function statusOf(index: number, current: number): TimelineStatus {
  if (index < current) return "complete"
  return index === current ? "current" : "upcoming"
}

export function TimelineProgressDemo() {
  const [current, setCurrent] = useState(1)
  const [run, setRun] = useState(0)

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Timeline key={run} aria-label="Checkout" appear>
        {steps.map((step, index) => (
          <TimelineItem key={step.id} value={step.id} status={statusOf(index, current)}>
            <TimelineMarker>{index + 1}</TimelineMarker>
            <TimelineConnector />
            <TimelineContent>
              <TimelineTitle>{step.title}</TimelineTitle>
              <TimelineDescription>{step.description}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" padding="sm" disabled={current === 0} onClick={() => setCurrent((step) => step - 1)}>
          Back
        </Button>
        <Button padding="sm" disabled={current === steps.length} onClick={() => setCurrent((step) => step + 1)}>
          Continue
        </Button>
        <Button variant="ghost" padding="sm" onClick={() => setRun((count) => count + 1)}>
          Replay entrance
        </Button>
      </div>
    </div>
  )
}
