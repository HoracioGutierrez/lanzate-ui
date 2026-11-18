import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test, vi } from "vitest"

import { Frame, FrameContent, FrameHeader, FrameTitle } from "."
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
