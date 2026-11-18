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
