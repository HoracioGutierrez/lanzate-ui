import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createAgent } from "@ui-sdk/react/agent"
import { expect, test } from "vitest"

import { Badge, BadgeDot, BadgeTag } from "."

const agent = createAgent()
const tick = () => act(async () => { await new Promise((r) => setTimeout(r, 0)) })
const tooltipContent = () => document.querySelector('[data-slot="tooltip-content"]')

test("renders a span with its defaults as data attributes", () => {
  render(<Badge>New</Badge>)
  const badge = screen.getByText("New")
  expect(badge.tagName).toBe("SPAN")
  expect(badge.getAttribute("data-slot")).toBe("badge")
  expect(badge.getAttribute("data-color")).toBe("primary")
  expect(badge.getAttribute("data-variant")).toBe("soft")
  expect(badge.getAttribute("data-size")).toBe("md")
  expect(badge.getAttribute("data-radius")).toBe("full")
})

test("render turns it into a link and className merges last", () => {
  render(
    <Badge variant="surface" className="bg-card/30" render={<a href="#changelog" />}>
      Changelog
    </Badge>
  )
  const link = screen.getByRole("link", { name: "Changelog" })
  expect(link.getAttribute("data-slot")).toBe("badge")
  expect(link.className).toContain("bg-card/30")
  expect(link.className).not.toContain("bg-card/70")
})

test("a tag keeps its own color and variant", () => {
  render(
    <Badge color="info" variant="outline">
      <BadgeTag color="success">Stable</BadgeTag>
      v1
    </Badge>
  )
  const tag = screen.getByText("Stable")
  expect(tag.getAttribute("data-slot")).toBe("badge-tag")
  expect(tag.getAttribute("data-color")).toBe("success")
  expect(tag.getAttribute("data-variant")).toBe("solid")
})

test("the dot is decorative and pulses only when asked", () => {
  const { container, rerender } = render(<BadgeDot />)
  const dot = () => container.querySelector('[data-slot="badge-dot"]')!
  expect(dot().getAttribute("aria-hidden")).toBe("true")
  expect(dot().hasAttribute("data-pulse")).toBe(false)

  rerender(<BadgeDot pulse color="success" />)
  expect(dot().hasAttribute("data-pulse")).toBe(true)
  expect(dot().className).toContain("motion-safe:before:animate-ping")
})

test("with a tooltip, a plain badge is a focusable button the tooltip describes", async () => {
  const user = userEvent.setup()
  render(<Badge tooltip="May change before 1.0">Beta</Badge>)
  await tick()
  const trigger = screen.getByRole("button", { name: "Beta" })
  expect(trigger.getAttribute("data-slot")).toBe("badge")
  expect(trigger).toHaveProperty("type", "button")
  expect(trigger.getAttribute("aria-describedby")).toBe(tooltipContent()!.id)

  await user.tab()
  await tick()
  expect(tooltipContent()!.hasAttribute("data-open")).toBe(true)
  await user.keyboard("{Escape}")
  await tick()
  expect(tooltipContent()!.hasAttribute("data-open")).toBe(false)
})

test("a plain badge's tooltip toggles on press, for touch screens", async () => {
  const user = userEvent.setup()
  render(<Badge tooltip="May change before 1.0">Beta</Badge>)
  await tick()
  const trigger = screen.getByRole("button", { name: "Beta" })
  await user.click(trigger)
  await tick()
  expect(tooltipContent()!.hasAttribute("data-open")).toBe(true)
  await user.click(trigger)
  await tick()
  expect(tooltipContent()!.hasAttribute("data-open")).toBe(false)
})

test("a link badge is its own tooltip trigger, and options reach the content", async () => {
  const user = userEvent.setup()
  render(
    <Badge render={<a href="#changelog" />} tooltip="What's new" tooltipOptions={{ side: "bottom", arrow: false }}>
      v0.13.0
    </Badge>
  )
  await tick()
  const link = screen.getByRole("link", { name: "v0.13.0" })
  expect(link.getAttribute("aria-describedby")).toBe(tooltipContent()!.id)
  expect(screen.queryByRole("button")).toBeNull()

  await user.tab()
  await tick()
  expect(tooltipContent()!.getAttribute("data-side")).toBe("bottom")
  expect(document.querySelector('[data-slot="tooltip-arrow"]')).toBeNull()
})

test("an agent finds a badge with a tooltip by its text", async () => {
  render(
    <>
      <Badge>Static</Badge>
      <Badge tooltip="May change before 1.0">Beta</Badge>
    </>
  )
  await tick()
  const components = agent.snapshot().filter((entry) => !entry.offPage && entry.component !== "more")
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy()
  }
  expect(components.map((entry) => entry.label)).toContain("Beta")
})
