import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createAgent } from "@ui-sdk/react/agent"
import { expect, test } from "vitest"

import {
  Timeline,
  TimelineCollapsible,
  TimelineCollapsiblePanel,
  TimelineCollapsibleTrigger,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineLeader,
  TimelineMarker,
  TimelineStack,
  TimelineStackItem,
  TimelineTime,
  TimelineTitle,
  type TimelineProps,
  type TimelineStatus,
} from "."

const agent = createAgent()
const tick = () => act(async () => { await new Promise((r) => setTimeout(r, 0)) })
const tooltipContent = () => document.querySelector('[data-slot="tooltip-content"]')

const steps: { value: string; title: string; status: TimelineStatus }[] = [
  { value: "placed", title: "Order placed", status: "complete" },
  { value: "shipped", title: "Shipped", status: "current" },
  { value: "delivered", title: "Delivered", status: "upcoming" },
]

function OrderStatus({ orientation }: Pick<TimelineProps, "orientation">) {
  return (
    <Timeline aria-label="Order status" orientation={orientation}>
      {steps.map((step) => (
        <TimelineItem key={step.value} value={step.value} status={step.status}>
          <TimelineMarker />
          <TimelineConnector />
          <TimelineTitle>{step.title}</TimelineTitle>
          <TimelineTime dateTime="2026-11-19">Nov 19</TimelineTime>
          <TimelineDescription>About {step.title}</TimelineDescription>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

test("renders a named list of events that keep ui-sdk's slots and the size", async () => {
  render(<OrderStatus />)
  await tick()
  const list = screen.getByRole("list", { name: "Order status" })
  expect(list.getAttribute("data-slot")).toBe("timeline")
  expect(list.getAttribute("data-size")).toBe("md")
  expect(screen.getAllByRole("listitem")).toHaveLength(3)
  expect(screen.getByRole("listitem", { name: "Shipped" }).getAttribute("aria-current")).toBe("step")
  expect(document.querySelector('[data-slot="timeline-title"]')).not.toBeNull()
})

test("an item's color defaults from its status, and color overrides it", async () => {
  const { rerender } = render(<OrderStatus />)
  await tick()
  expect(screen.getByRole("listitem", { name: "Order placed" }).getAttribute("data-color")).toBe("success")
  expect(screen.getByRole("listitem", { name: "Shipped" }).getAttribute("data-color")).toBe("info")
  expect(screen.getByRole("listitem", { name: "Delivered" }).getAttribute("data-color")).toBe("muted")

  rerender(
    <Timeline aria-label="Incidents">
      <TimelineItem color="warning" status="complete">
        <TimelineTitle>Outage</TimelineTitle>
      </TimelineItem>
    </Timeline>
  )
  await tick()
  expect(screen.getByRole("listitem", { name: "Outage" }).getAttribute("data-color")).toBe("warning")
})

test("a failed event is done for ui-sdk, red, and keeps its own status", async () => {
  render(
    <Timeline aria-label="Payments">
      <TimelineItem status="failed">
        <TimelineMarker />
        <TimelineConnector />
        <TimelineTitle>Card declined</TimelineTitle>
      </TimelineItem>
      <TimelineItem status="current">
        <TimelineTitle>Retrying</TimelineTitle>
      </TimelineItem>
    </Timeline>
  )
  await tick()
  const failed = screen.getByRole("listitem", { name: "Card declined" })
  expect(failed.getAttribute("data-status")).toBe("failed")
  expect(failed.getAttribute("data-color")).toBe("error")
  expect(failed.hasAttribute("data-complete")).toBe(true)
  expect(failed.hasAttribute("aria-current")).toBe(false)
  expect(document.querySelector('[data-slot="timeline-connector"]')!.hasAttribute("data-complete")).toBe(true)
})

test("tiles put the content in the card and the tooltip button over it", async () => {
  render(
    <Timeline aria-label="Deploy" orientation="horizontal" variant="tiles">
      <TimelineItem status="complete">
        <TimelineMarker tooltip="312 tests passed" />
        <TimelineConnector />
        <TimelineTitle>Checks</TimelineTitle>
      </TimelineItem>
    </Timeline>
  )
  await tick()
  expect(screen.getByRole("list", { name: "Deploy" }).getAttribute("data-variant")).toBe("tiles")
  const tile = screen.getByRole("listitem", { name: "Checks" })
  expect(tile.className).toContain("min-h-(--timeline-tile)")
  expect(tile.className).toContain("[clip-path:inset(-8px_round_calc(var(--radius-xl)+8px))]")
  const button = screen.getByRole("button", { name: "312 tests passed" })
  expect(button.className).toContain("-inset-0.5")
  expect(document.querySelector('[data-slot="timeline-connector"]')!.className).toContain("group-data-[variant=tiles]/timeline:hidden")
})

test("arrow keys follow the orientation", async () => {
  const user = userEvent.setup()
  render(<OrderStatus orientation="horizontal" />)
  await tick()
  await user.tab()
  expect(document.activeElement).toBe(screen.getByRole("listitem", { name: "Shipped" }))
  await user.keyboard("{ArrowRight}")
  expect(document.activeElement).toBe(screen.getByRole("listitem", { name: "Delivered" }))
  await user.keyboard("{ArrowDown}")
  expect(document.activeElement).toBe(screen.getByRole("listitem", { name: "Delivered" }))
})

test("markers are decorative, take a shape and follow the status unless a variant is set", async () => {
  render(
    <Timeline aria-label="Steps">
      <TimelineItem status="current">
        <TimelineMarker shape="square" pulse />
        <TimelineTitle>Now</TimelineTitle>
      </TimelineItem>
      <TimelineItem status="upcoming">
        <TimelineMarker variant="solid" />
        <TimelineTitle>Next</TimelineTitle>
      </TimelineItem>
    </Timeline>
  )
  await tick()
  const [first, second] = document.querySelectorAll('[data-slot="timeline-marker"]')
  expect(first!.getAttribute("aria-hidden")).toBe("true")
  expect(first!.getAttribute("data-shape")).toBe("square")
  expect(first!.hasAttribute("data-current")).toBe(true)
  expect(first!.className).toContain("data-current:border-(--timeline-accent)")
  expect(first!.className).toContain("motion-safe:before:animate-ping")
  expect(second!.className).not.toContain("data-upcoming:")
  expect(second!.className).toContain("bg-(--timeline-color)")
})

test("a marker with a tooltip is a button the tooltip names, reached by Tab after its event", async () => {
  const user = userEvent.setup()
  render(
    <Timeline aria-label="Order status">
      <TimelineItem status="current">
        <TimelineMarker tooltip="Left the warehouse at 9:12" />
        <TimelineTitle>Shipped</TimelineTitle>
      </TimelineItem>
    </Timeline>
  )
  await tick()
  const button = screen.getByRole("button", { name: "Left the warehouse at 9:12" })
  expect(button.getAttribute("aria-labelledby")).toBe(tooltipContent()!.id)

  await user.tab()
  expect(document.activeElement).toBe(screen.getByRole("listitem", { name: "Shipped" }))
  await user.tab()
  await tick()
  expect(document.activeElement).toBe(button)
  expect(tooltipContent()!.hasAttribute("data-open")).toBe(true)
  await user.keyboard("{Escape}")
  await tick()
  expect(tooltipContent()!.hasAttribute("data-open")).toBe(false)
})

test("tooltipLabel names the marker button and the tooltip describes it; a press toggles it", async () => {
  const user = userEvent.setup()
  render(
    <Timeline aria-label="Order status">
      <TimelineItem>
        <TimelineMarker tooltip="Left the warehouse at 9:12" tooltipLabel="Shipping details" tooltipOptions={{ side: "bottom" }} />
        <TimelineTitle>Shipped</TimelineTitle>
      </TimelineItem>
    </Timeline>
  )
  await tick()
  const button = screen.getByRole("button", { name: "Shipping details" })
  expect(button.getAttribute("aria-describedby")).toBe(tooltipContent()!.id)
  await user.click(button)
  await tick()
  expect(tooltipContent()!.hasAttribute("data-open")).toBe(true)
  expect(tooltipContent()!.getAttribute("data-side")).toBe("bottom")
  await user.click(button)
  await tick()
  expect(tooltipContent()!.hasAttribute("data-open")).toBe(false)
})

function ActivityStatus() {
  return (
    <TimelineCollapsible>
      <TimelineCollapsibleTrigger>
        Activity status
        <TimelineLeader />
        <TimelineStack>
          {steps.map((step) => (
            <TimelineStackItem key={step.value} status={step.status} />
          ))}
        </TimelineStack>
      </TimelineCollapsibleTrigger>
      <TimelineCollapsiblePanel>
        <OrderStatus orientation="horizontal" />
      </TimelineCollapsiblePanel>
    </TimelineCollapsible>
  )
}

test("a collapsible timeline opens from a trigger named by its text, the summary hidden from readers", async () => {
  const user = userEvent.setup()
  render(<ActivityStatus />)
  await tick()
  const trigger = screen.getByRole("button", { name: "Activity status" })
  expect(trigger.getAttribute("aria-expanded")).toBe("false")
  expect(screen.queryByRole("list", { name: "Order status" })).toBeNull()
  expect(document.querySelector('[data-slot="timeline-stack"]')!.getAttribute("aria-hidden")).toBe("true")
  expect(document.querySelector('[data-slot="timeline-leader"]')!.getAttribute("aria-hidden")).toBe("true")
  const stackItems = [...document.querySelectorAll<HTMLElement>('[data-slot="timeline-stack-item"]')]
  expect(stackItems.map((item) => item.getAttribute("data-color"))).toEqual(["success", "info", "muted"])
  expect(document.querySelector('[data-slot="timeline-stack"]')!.className).toContain("[&>:nth-child(2)]:[--timeline-index:1]")

  await user.click(trigger)
  await tick()
  expect(trigger.getAttribute("aria-expanded")).toBe("true")
  expect(screen.getByRole("list", { name: "Order status" })).not.toBeNull()
  expect(document.querySelector('[data-slot="timeline-collapsible-content"]')).not.toBeNull()
})

test("appear marks the root so the events stagger in", () => {
  render(<Timeline aria-label="Feed" appear />)
  expect(screen.getByRole("list", { name: "Feed" }).hasAttribute("data-appear")).toBe(true)
})

test("an agent finds the timeline, its trigger and its marker buttons by name", async () => {
  render(
    <>
      <ActivityStatus />
      <Timeline aria-label="Checkout">
        <TimelineItem status="current">
          <TimelineMarker tooltip="Card ending 4242" />
          <TimelineTitle>Payment</TimelineTitle>
        </TimelineItem>
      </Timeline>
    </>
  )
  await tick()
  const components = agent.snapshot().filter((entry) => !entry.offPage && entry.component !== "more")
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy()
  }
  const labels = components.map((entry) => entry.label)
  expect(labels).toContain("Activity status")
  expect(labels).toContain("Checkout")
  expect(labels).toContain("Card ending 4242")
})
