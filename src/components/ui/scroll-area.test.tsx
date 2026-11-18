import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"

import { ScrollArea } from "./scroll-area"

test("puts content in a named, scrollable viewport", () => {
  render(
    <ScrollArea viewportProps={{ role: "region", "aria-label": "Notas" }}>
      <p>Contenido</p>
    </ScrollArea>
  )
  const viewport = screen.getByRole("region", { name: "Notas" })
  expect(viewport.getAttribute("data-slot")).toBe("scroll-area-viewport")
  expect(viewport.textContent).toBe("Contenido")
})

test("renders one scrollbar per requested axis and the corner only for both", () => {
  const scrollbars = () =>
    [...document.querySelectorAll('[data-slot="scroll-area-scrollbar"]')].map((el) =>
      el.getAttribute("data-orientation")
    )
  const corner = () => document.querySelector('[data-slot="scroll-area-corner"]')

  const { rerender } = render(<ScrollArea>x</ScrollArea>)
  expect(scrollbars()).toEqual(["vertical"])
  expect(corner()).toBeNull()

  rerender(<ScrollArea orientation="horizontal">x</ScrollArea>)
  expect(scrollbars()).toEqual(["horizontal"])

  rerender(<ScrollArea orientation="both">x</ScrollArea>)
  expect(scrollbars()).toEqual(["vertical", "horizontal"])
  expect(corner()).not.toBeNull()
})
