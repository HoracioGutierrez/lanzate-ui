import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, expect, test, vi } from "vitest"

import { ButtonGroup, ButtonGroupAll, ButtonGroupItem } from "."
import type { ButtonGroupMultipleProps, ButtonGroupSingleProps } from "."

afterEach(cleanup)

const radio = (name: string) => screen.getByRole("radio", { name })
const toggle = (name: string) => screen.getByRole("button", { name })

// Helpers are called as functions, not elements: `all` adds a ButtonGroupAll.
function Views(props: Partial<ButtonGroupSingleProps>, all = false) {
  return (
    <ButtonGroup {...props} selection="single" aria-label="View">
      {all && <ButtonGroupAll>All</ButtonGroupAll>}
      <ButtonGroupItem value="list">List</ButtonGroupItem>
      <ButtonGroupItem value="grid">Grid</ButtonGroupItem>
    </ButtonGroup>
  )
}

function Filters(props: Partial<ButtonGroupMultipleProps>, all = false) {
  return (
    <ButtonGroup {...props} selection="multiple" aria-label="Status">
      {all && <ButtonGroupAll>All</ButtonGroupAll>}
      <ButtonGroupItem value="pending">Pending</ButtonGroupItem>
      <ButtonGroupItem value="paid">Paid</ButtonGroupItem>
    </ButtonGroup>
  )
}

test("single: the default item is checked and clicking another checks it", async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(Views({ defaultValue: "list", onValueChange }))
  expect(screen.getByRole("radiogroup", { name: "View" })).toBeTruthy()
  expect(radio("List").getAttribute("aria-checked")).toBe("true")
  await user.click(radio("Grid"))
  expect(radio("Grid").getAttribute("aria-checked")).toBe("true")
  expect(radio("List").getAttribute("aria-checked")).toBe("false")
  expect(onValueChange).toHaveBeenLastCalledWith("grid")
})

test("single: arrow keys move the selection", async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(Views({ defaultValue: "list", onValueChange }))
  await user.tab()
  await user.keyboard("{ArrowRight}")
  expect(radio("Grid").getAttribute("aria-checked")).toBe("true")
  expect(onValueChange).toHaveBeenLastCalledWith("grid")
})

test("single: All is checked while the value is null and checking it emits null", async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(Views({ defaultValue: null, onValueChange }, true))
  expect(radio("All").getAttribute("aria-checked")).toBe("true")
  await user.click(radio("Grid"))
  expect(onValueChange).toHaveBeenLastCalledWith("grid")
  await user.click(radio("All"))
  expect(onValueChange).toHaveBeenLastCalledWith(null)
  expect(radio("All").getAttribute("aria-checked")).toBe("true")
})

test("single: without All, a null value checks nothing and Tab enters the first item", async () => {
  const user = userEvent.setup()
  render(Views({ defaultValue: null }))
  expect(radio("List").getAttribute("aria-checked")).toBe("false")
  expect(radio("Grid").getAttribute("aria-checked")).toBe("false")
  await user.tab()
  expect(document.activeElement).toBe(radio("List"))
})

test("only single renders the sliding indicator", () => {
  const { unmount } = render(Views({ defaultValue: "list" }))
  expect(document.querySelector('[data-slot="segmented-control-indicator"]')).not.toBeNull()
  unmount()
  render(Filters({}))
  expect(document.querySelector('[data-slot="segmented-control-indicator"]')).toBeNull()
})

test("multiple: several items stay pressed", async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(Filters({ onValueChange }))
  expect(screen.getByRole("group", { name: "Status" })).toBeTruthy()
  await user.click(toggle("Pending"))
  await user.click(toggle("Paid"))
  expect(toggle("Pending").getAttribute("aria-pressed")).toBe("true")
  expect(toggle("Paid").getAttribute("aria-pressed")).toBe("true")
  expect(onValueChange).toHaveBeenLastCalledWith(["pending", "paid"])
})

test("multiple: All is pressed when empty, clears when pressed, and is never in the value", async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(Filters({ defaultValue: ["pending"], onValueChange }, true))
  expect(toggle("All").getAttribute("aria-pressed")).toBe("false")
  await user.click(toggle("All"))
  expect(onValueChange).toHaveBeenLastCalledWith([])
  expect(toggle("All").getAttribute("aria-pressed")).toBe("true")
  expect(toggle("Pending").getAttribute("aria-pressed")).toBe("false")
  await user.click(toggle("All"))
  expect(onValueChange).toHaveBeenCalledTimes(1)
  expect(toggle("All").getAttribute("aria-pressed")).toBe("true")
  await user.click(toggle("Paid"))
  expect(onValueChange).toHaveBeenLastCalledWith(["paid"])
})

test("multiple: without All, an empty value presses nothing and the first press emits that item", async () => {
  const user = userEvent.setup()
  const onValueChange = vi.fn()
  render(Filters({ onValueChange }))
  expect(toggle("Pending").getAttribute("aria-pressed")).toBe("false")
  expect(toggle("Paid").getAttribute("aria-pressed")).toBe("false")
  await user.click(toggle("Pending"))
  expect(onValueChange).toHaveBeenLastCalledWith(["pending"])
})

test("a controlled value without onValueChange doesn't change", async () => {
  const user = userEvent.setup()
  const { unmount } = render(Views({ value: "list" }))
  await user.click(radio("Grid"))
  expect(radio("List").getAttribute("aria-checked")).toBe("true")
  unmount()
  render(Filters({ value: ["pending"] }))
  await user.click(toggle("Paid"))
  expect(toggle("Paid").getAttribute("aria-pressed")).toBe("false")
})

test("items are the registry Button: solid in the group color when lit, muted ghost otherwise", () => {
  render(
    <ButtonGroup selection="multiple" aria-label="Status" color="success" defaultValue={["paid"]}>
      <ButtonGroupItem value="pending">Pending</ButtonGroupItem>
      <ButtonGroupItem value="paid">Paid</ButtonGroupItem>
    </ButtonGroup>
  )
  expect(toggle("Paid").getAttribute("data-variant")).toBe("solid")
  expect(toggle("Paid").getAttribute("data-color")).toBe("success")
  expect(toggle("Pending").getAttribute("data-variant")).toBe("ghost")
  expect(toggle("Pending").getAttribute("data-color")).toBe("muted")
})

test("the LED is lit only on the active item and absent on icon-only items", () => {
  render(
    <ButtonGroup selection="multiple" aria-label="Status" defaultValue={["paid"]}>
      <ButtonGroupItem value="pending">Pending</ButtonGroupItem>
      <ButtonGroupItem value="paid">Paid</ButtonGroupItem>
      <ButtonGroupItem value="late" icon={<svg />} aria-label="Late" />
    </ButtonGroup>
  )
  const led = (name: string) => toggle(name).querySelector('[data-slot="button-group-led"]')
  expect(led("Paid")?.hasAttribute("data-on")).toBe(true)
  expect(led("Pending")?.hasAttribute("data-on")).toBe(false)
  expect(led("Late")).toBeNull()
})
