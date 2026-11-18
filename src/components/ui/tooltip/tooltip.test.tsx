import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"

import { Tooltip, TooltipContent, TooltipTrigger } from "."

const tick = () => act(async () => { await new Promise((r) => setTimeout(r, 0)) })

test("describes a trigger that has its own name", async () => {
  render(
    <Tooltip>
      <TooltipTrigger>Save</TooltipTrigger>
      <TooltipContent>Saves your changes</TooltipContent>
    </Tooltip>
  )
  await tick()
  const trigger = screen.getByRole("button", { name: "Save" })
  const tooltip = document.querySelector('[data-slot="tooltip-content"]')!
  expect(tooltip.getAttribute("role")).toBe("tooltip")
  expect(trigger.getAttribute("aria-describedby")).toBe(tooltip.id)
})

test("opens on keyboard focus and closes on Escape", async () => {
  const user = userEvent.setup()
  render(
    <Tooltip>
      <TooltipTrigger>Save</TooltipTrigger>
      <TooltipContent>Saves your changes</TooltipContent>
    </Tooltip>
  )
  const content = () => document.querySelector('[data-slot="tooltip-content"]')!

  await user.tab()
  await tick()
  expect(content().hasAttribute("data-open")).toBe(true)

  await user.keyboard("{Escape}")
  await tick()
  expect(content().hasAttribute("data-open")).toBe(false)
})

test("renders the arrow unless arrow is false", async () => {
  const { rerender } = render(
    <Tooltip defaultOpen>
      <TooltipTrigger>A</TooltipTrigger>
      <TooltipContent>Hint</TooltipContent>
    </Tooltip>
  )
  await tick()
  expect(document.querySelector('[data-slot="tooltip-arrow"]')).not.toBeNull()

  rerender(
    <Tooltip defaultOpen>
      <TooltipTrigger>A</TooltipTrigger>
      <TooltipContent arrow={false}>Hint</TooltipContent>
    </Tooltip>
  )
  await tick()
  expect(document.querySelector('[data-slot="tooltip-arrow"]')).toBeNull()
})
