import { render, screen } from "@testing-library/react"
import { renderToStaticMarkup } from "react-dom/server"
import { expect, test } from "vitest"

import { Text } from "."

test("renders a paragraph with its variant attributes by default", () => {
  render(<Text size="sm" color="muted">Hello</Text>)
  const el = screen.getByText("Hello")
  expect(el.tagName).toBe("P")
  expect(el.getAttribute("data-slot")).toBe("text")
  expect(el.getAttribute("data-size")).toBe("sm")
  expect(el.getAttribute("data-color")).toBe("muted")
  expect(el.className).toContain("text-muted-foreground")
})

test("render swaps the element and keeps the variant classes", () => {
  render(<Text render={<h1 />} size="display" className="mt-2">Title</Text>)
  const heading = screen.getByRole("heading", { level: 1, name: "Title" })
  expect(heading.getAttribute("data-slot")).toBe("text")
  expect(heading.className).toContain("text-display")
  expect(heading.className).toContain("mt-2")
})

test("className overrides the size utility instead of stacking", () => {
  render(<Text size="display" className="text-xl">Big</Text>)
  const el = screen.getByText("Big")
  expect(el.className).toContain("text-xl")
  expect(el.className).not.toContain("text-display")
})

test("renders on the server without a client boundary", () => {
  expect(renderToStaticMarkup(<Text render={<label htmlFor="email" />}>Email</Text>)).toBe(
    '<label for="email" data-slot="text" class="text-foreground text-base leading-normal">Email</label>'
  )
})

test("the error color reads the error token", () => {
  render(<Text color="error">Required</Text>)
  expect(screen.getByText("Required").className).toContain("text-error")
})

test("heading variant is semibold with tight tracking; weight overrides it", () => {
  const { rerender } = render(<Text variant="heading" size="display">Title</Text>)
  const el = () => screen.getByText("Title")
  expect(el().getAttribute("data-variant")).toBe("heading")
  expect(el().className).toContain("font-heading")
  expect(el().className).toContain("font-semibold")
  expect(el().className).toContain("tracking-tight")
  expect(el().className).not.toContain("tracking-tighter")

  rerender(<Text variant="heading" weight="medium">Title</Text>)
  expect(el().className).toContain("font-medium")
  expect(el().className).not.toContain("font-semibold")
})

test("overline variant is mono caps and muted, and color overrides the muted", () => {
  const { rerender } = render(<Text variant="overline" size="2xs">Label</Text>)
  const el = () => screen.getByText("Label")
  expect(el().className).toContain("font-mono")
  expect(el().className).toContain("uppercase")
  expect(el().className).toContain("tracking-wider")
  expect(el().className).not.toContain("tracking-wide ")
  expect(el().className).toContain("text-muted-foreground")
  expect(el().className).toContain("text-2xs")

  rerender(<Text variant="overline" color="primary">Label</Text>)
  expect(el().className).toContain("text-primary")
  expect(el().className).not.toContain("text-muted-foreground")
})

test("color inherit takes the parent's color, for text inside a control that sets its own", () => {
  render(<Text render={<span />} variant="overline" color="inherit">Label</Text>)
  const el = screen.getByText("Label")
  expect(el.className).toContain("text-inherit")
  expect(el.className).not.toContain("text-foreground")
  expect(el.className).not.toContain("text-muted-foreground")
})

test("leading overrides the size's line height", () => {
  render(<Text size="lg" leading="none">Tight</Text>)
  const el = screen.getByText("Tight")
  expect(el.className).toContain("leading-none")
  expect(el.className).not.toContain("leading-relaxed")
})

test("font overrides the heading variant's family", () => {
  render(<Text variant="heading" font="mono">Title</Text>)
  const el = screen.getByText("Title")
  expect(el.className).toContain("font-mono")
  expect(el.className).not.toContain("font-heading")
})

test("font and weight set the family and weight", () => {
  render(<Text font="mono" weight="medium">Code</Text>)
  const el = screen.getByText("Code")
  expect(el.className).toContain("font-mono")
  expect(el.className).toContain("font-medium")
})

test("size inherit adds no size or line-height class, for inline text", () => {
  render(<Text render={<span />} size="inherit" color="muted">UI</Text>)
  const el = screen.getByText("UI")
  expect(el.tagName).toBe("SPAN")
  expect(el.className).not.toMatch(/\btext-(base|sm|xs|lg)\b/)
  expect(el.className).not.toContain("leading-")
})
