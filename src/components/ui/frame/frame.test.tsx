import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createAgent } from "@ui-sdk/react/agent"
import { beforeEach, expect, test, vi } from "vitest"

import {
  Frame,
  FrameBack,
  FrameContent,
  FrameHeader,
  FrameMenu,
  FrameMenuItem,
  FrameMenuSeparator,
  FrameSubmenu,
  FrameSubmenuContent,
  FrameSubmenuTrigger,
  FrameTitle,
} from "."
import type { FrameProps } from "."

function Orders(props: Omit<FrameProps, "children">) {
  return (
    <Frame {...props}>
      <FrameHeader>
        <FrameTitle>Orders</FrameTitle>
      </FrameHeader>
      <FrameContent>Order list</FrameContent>
    </Frame>
  )
}

const title = () => screen.getByRole("button", { name: /Orders/ })

test("renders content inside a frame with four decorative corners", () => {
  const { container } = render(<Orders />)
  const corners = container.querySelectorAll('[data-slot="frame-corner"]')
  expect(corners).toHaveLength(4)
  for (const corner of corners) expect(corner.getAttribute("aria-hidden")).toBe("true")
  expect(screen.getByText("Order list")).toBeTruthy()
})

test("a non-collapsible title is not a button", () => {
  render(<Orders />)
  expect(screen.queryByRole("button")).toBeNull()
  expect(screen.getByText("Orders")).toBeTruthy()
})

test("pressing the title toggles the content", async () => {
  const user = userEvent.setup()
  render(<Orders collapsible />)
  expect(title().getAttribute("aria-expanded")).toBe("true")
  expect(screen.getByText("Order list")).toBeTruthy()
  await user.click(title())
  expect(title().getAttribute("aria-expanded")).toBe("false")
  await user.click(title())
  expect(title().getAttribute("aria-expanded")).toBe("true")
})

test("starts closed with defaultOpen={false}", () => {
  render(<Orders collapsible defaultOpen={false} />)
  expect(title().getAttribute("aria-expanded")).toBe("false")
  expect(screen.queryByText("Order list")).toBeNull()
})

test("controlled open reports toggles without changing", async () => {
  const user = userEvent.setup()
  const onOpenChange = vi.fn()
  render(<Orders collapsible open onOpenChange={onOpenChange} />)
  await user.click(title())
  expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
  expect(title().getAttribute("aria-expanded")).toBe("true")
})

test("a collapsible frame with no header still shows its content", () => {
  render(
    <Frame collapsible>
      <FrameContent>Order list</FrameContent>
    </Frame>
  )
  expect(screen.getByText("Order list")).toBeTruthy()
})

const agent = createAgent()
const tick = () => act(async () => { await new Promise((r) => setTimeout(r, 0)) })

const onBack = vi.fn()
const onAction = vi.fn()
beforeEach(() => {
  onBack.mockClear()
  onAction.mockClear()
})

function OrderCard() {
  return (
    <Frame collapsible size="sm">
      <FrameHeader>
        <FrameBack onClick={onBack} />
        <FrameTitle>Order 4189</FrameTitle>
        <FrameMenu label="Order actions" onAction={onAction}>
          <FrameMenuItem value="edit">Edit</FrameMenuItem>
          <FrameMenuSeparator />
          <FrameSubmenu>
            <FrameSubmenuTrigger>Export</FrameSubmenuTrigger>
            <FrameSubmenuContent>
              <FrameMenuItem value="csv">CSV</FrameMenuItem>
            </FrameSubmenuContent>
          </FrameSubmenu>
        </FrameMenu>
      </FrameHeader>
      <FrameContent>Items</FrameContent>
    </Frame>
  )
}

test("the back button has a default name and runs onClick", async () => {
  const user = userEvent.setup()
  render(<OrderCard />)
  await user.click(screen.getByRole("button", { name: "Back" }))
  expect(onBack).toHaveBeenCalledTimes(1)
})

test("the menu opens from the three-dot button and runs an item", async () => {
  const user = userEvent.setup()
  render(<OrderCard />)
  await user.click(screen.getByRole("button", { name: "Order actions" }))
  await user.click(await screen.findByRole("menuitem", { name: "Edit" }))
  expect(onAction).toHaveBeenCalledWith("edit", expect.anything())
})

test("submenu items are reachable", async () => {
  const user = userEvent.setup()
  render(<OrderCard />)
  await user.click(screen.getByRole("button", { name: "Order actions" }))
  await user.click(await screen.findByRole("menuitem", { name: "Export" }))
  await user.click(await screen.findByRole("menuitem", { name: "CSV" }))
  expect(onAction).toHaveBeenCalledWith("csv", expect.anything())
})

test("back and menu buttons don't toggle a collapsible frame", async () => {
  const user = userEvent.setup()
  render(<OrderCard />)
  await user.click(screen.getByRole("button", { name: "Back" }))
  await user.click(screen.getByRole("button", { name: "Order actions" }))
  await user.keyboard("{Escape}")
  expect(screen.getByRole("button", { name: /Order 4189/ }).getAttribute("aria-expanded")).toBe("true")
})

test("an agent can find and run the header controls", async () => {
  render(<OrderCard />)
  await tick()

  const components = agent.snapshot().filter((entry) => !entry.offPage)
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy()
  }
  const labels = components.map((entry) => entry.label)
  for (const label of ["Back", "Order actions"]) {
    expect(labels, `${label} is missing from the snapshot`).toContain(label)
  }

  const result = await agent.act({
    steps: [
      { ref: "Back", action: "press" },
      { ref: "Order actions", action: "press", args: ["Edit"] },
    ],
  })
  expect(result.ok, result.error?.message).toBe(true)
  expect(onBack).toHaveBeenCalledTimes(1)
  expect(onAction).toHaveBeenCalledWith("edit", expect.anything())
})

test("color tints the frame and its corners with the intent token", () => {
  const { container } = render(
    <Frame color="warning">
      <FrameContent>Low stock</FrameContent>
    </Frame>
  )
  const frame = container.querySelector('[data-slot="frame"]')
  expect(frame?.getAttribute("data-color")).toBe("warning")
  expect(frame?.className).toContain("--frame-accent:var(--warning)")
  for (const corner of container.querySelectorAll('[data-slot="frame-corner"]')) {
    expect(corner.className).toContain("border-(--frame-accent)")
  }
})

test("the default color keeps the card background with primary corners", () => {
  const { container } = render(
    <Frame>
      <FrameContent>Orders</FrameContent>
    </Frame>
  )
  const frame = container.querySelector('[data-slot="frame"]')
  expect(frame?.getAttribute("data-color")).toBe("primary")
  expect(frame?.className).toContain("--frame-accent:var(--primary)")
  expect(frame?.className).not.toContain("from-(--frame-accent)")
})

test("a long title ends in an ellipsis: the truncating box is a block, not a flex row", () => {
  render(<Orders collapsible />)
  const label = screen.getByText("Orders")
  expect(label.className).toContain("truncate")
  expect(label.className.split(" ")).not.toContain("flex")
})

test("a collapsible frame keeps its own slots for styling", () => {
  const { container } = render(<Orders collapsible color="error" />)
  const frame = container.querySelector('[data-slot="frame"]')
  expect(frame?.getAttribute("data-color")).toBe("error")
  expect(frame?.querySelectorAll('[data-slot="frame-corner"]')).toHaveLength(4)
  expect(container.querySelector('[data-slot="frame-content"]')?.textContent).toBe("Order list")
})

test("a folded frame opts out of row stretching so it shrinks to its header", async () => {
  const user = userEvent.setup()
  const { container } = render(<Orders collapsible />)
  const frame = container.querySelector('[data-slot="frame"]')
  expect(frame?.className).toContain("has-[>[data-slot=collapsible][data-closed]]:self-start")
  await user.click(title())
  expect(frame?.querySelector(':scope > [data-slot="collapsible"][data-closed]')).not.toBeNull()
})
