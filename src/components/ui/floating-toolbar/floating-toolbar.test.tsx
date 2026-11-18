import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createAgent } from "@ui-sdk/react/agent"
import { Circle, Plus, Undo2 } from "lucide-react"
import { beforeEach, expect, test, vi } from "vitest"

import {
  FloatingToolbar,
  FloatingToolbarButton,
  FloatingToolbarMenu,
  FloatingToolbarMenuContent,
  FloatingToolbarMenuItem,
  FloatingToolbarMenuTrigger,
  FloatingToolbarSubmenu,
  FloatingToolbarSubmenuContent,
  FloatingToolbarSubmenuTrigger,
} from "."
import type { FloatingToolbarMenuContentProps } from "."

const agent = createAgent()
const tick = () => act(async () => { await new Promise((r) => setTimeout(r, 0)) })

const onUndo = vi.fn()
const onAction = vi.fn()
beforeEach(() => {
  onUndo.mockClear()
  onAction.mockClear()
})

function Editor() {
  return (
    <FloatingToolbar placement="inline" aria-label="Editor">
      <FloatingToolbarButton label="Undo" onClick={onUndo}>
        <Undo2 />
      </FloatingToolbarButton>
      <FloatingToolbarMenu onAction={onAction}>
        <FloatingToolbarMenuTrigger label="Insert">
          <Plus />
        </FloatingToolbarMenuTrigger>
        <FloatingToolbarMenuContent>
          <FloatingToolbarMenuItem value="image">Image</FloatingToolbarMenuItem>
          <FloatingToolbarSubmenu>
            <FloatingToolbarSubmenuTrigger>Shape</FloatingToolbarSubmenuTrigger>
            <FloatingToolbarSubmenuContent title="Shapes">
              <FloatingToolbarMenuItem value="circle" icon={<Circle />}>Circle</FloatingToolbarMenuItem>
              <FloatingToolbarMenuItem value="square">Square</FloatingToolbarMenuItem>
            </FloatingToolbarSubmenuContent>
          </FloatingToolbarSubmenu>
        </FloatingToolbarMenuContent>
      </FloatingToolbarMenu>
    </FloatingToolbar>
  )
}

const openPanels = () => [...document.querySelectorAll('[data-slot="menu-content"][data-open]')]

// Reaches the Shape item from the keyboard, the way a user does. Focusing it by hand after a click
// races ui-sdk's own initial focus, which can land on the panel and leave no item highlighted.
async function focusShape(user: ReturnType<typeof userEvent.setup>) {
  screen.getByRole("button", { name: "Insert" }).focus()
  await user.keyboard("{ArrowDown}")
  await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Image" })))
  await user.keyboard("{ArrowDown}")
  await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Shape" })))
}

test("renders a named toolbar of icon-only options, each named by its label", () => {
  render(<Editor />)
  const toolbar = screen.getByRole("toolbar", { name: "Editor" })
  expect(toolbar.getAttribute("aria-orientation")).toBe("horizontal")
  const undo = screen.getByRole("button", { name: "Undo" })
  const insert = screen.getByRole("button", { name: "Insert" })
  expect(undo.hasAttribute("aria-haspopup")).toBe(false)
  expect(insert.getAttribute("aria-haspopup")).toBe("menu")
  expect(undo.querySelector('[aria-hidden="true"] svg')).not.toBeNull()
  expect(undo.closest("[data-slot=\"toolbar\"]")).not.toBeNull()
})

test("an option without a submenu runs its action", async () => {
  const user = userEvent.setup()
  render(<Editor />)
  await user.click(screen.getByRole("button", { name: "Undo" }))
  expect(onUndo).toHaveBeenCalledTimes(1)
  expect(openPanels()).toHaveLength(0)
})

test("arrow keys move between options with one tab stop", async () => {
  const user = userEvent.setup()
  render(<Editor />)
  await user.tab()
  expect(document.activeElement).toBe(screen.getByRole("button", { name: "Undo" }))
  await user.keyboard("{ArrowRight}")
  expect(document.activeElement).toBe(screen.getByRole("button", { name: "Insert" }))
})

test("an option opens its panel, and an item runs and closes it", async () => {
  const user = userEvent.setup()
  render(<Editor />)
  await user.click(screen.getByRole("button", { name: "Insert" }))
  await tick()
  expect(screen.getByRole("menuitem", { name: "Image" })).toBeTruthy()
  await user.click(screen.getByRole("menuitem", { name: "Image" }))
  await tick()
  expect(onAction).toHaveBeenCalledWith("image", expect.anything())
  expect(openPanels()).toHaveLength(0)
})

test("a sub-item opens a nested panel over the first, with a back item and title", async () => {
  const user = userEvent.setup()
  render(<Editor />)
  await user.click(screen.getByRole("button", { name: "Insert" }))
  await tick()
  const shape = screen.getByRole("menuitem", { name: "Shape" })
  expect(shape.getAttribute("aria-haspopup")).toBe("menu")
  await user.click(shape)
  await tick()

  const nested = openPanels().find((panel) => panel.hasAttribute("data-nested"))!
  expect(nested).toBeTruthy()
  expect(nested.parentElement?.closest('[data-slot="menu-content"]')).not.toBeNull()
  expect(nested.querySelector('[data-slot="menu-group-label"]')?.textContent).toBe("Shapes")
  expect(screen.getByRole("menuitem", { name: "Back" })).toBeTruthy()
  expect(screen.getByRole("menuitem", { name: "Circle" })).toBeTruthy()
})

test("Back closes only the nested panel and returns focus to its trigger", async () => {
  const user = userEvent.setup()
  render(<Editor />)
  await focusShape(user)
  await user.keyboard("{Enter}")
  // Opening and closing a panel moves focus over more than one task: wait for it to settle.
  await waitFor(() => {
    expect(openPanels()).toHaveLength(2)
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Back" }))
  })

  await user.keyboard("{Enter}")
  await waitFor(() => {
    expect(openPanels()).toHaveLength(1)
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Shape" }))
  })
})

test("Escape in the nested panel also goes back to the first panel", async () => {
  const user = userEvent.setup()
  render(<Editor />)
  await focusShape(user)
  await user.keyboard("{ArrowRight}")
  await waitFor(() => expect(openPanels()).toHaveLength(2))
  await user.keyboard("{Escape}")
  await waitFor(() => {
    expect(openPanels()).toHaveLength(1)
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Shape" }))
  })
})

test("a sub-item runs with the menu's onAction and closes every panel", async () => {
  const user = userEvent.setup()
  render(<Editor />)
  await user.click(screen.getByRole("button", { name: "Insert" }))
  await tick()
  await user.click(screen.getByRole("menuitem", { name: "Shape" }))
  await tick()
  await user.click(screen.getByRole("menuitem", { name: "Circle" }))
  await tick()
  expect(onAction).toHaveBeenCalledWith("circle", expect.anything())
  expect(openPanels()).toHaveLength(0)
})

test("placement sets the wrapper's position", () => {
  const { rerender } = render(
    <FloatingToolbar aria-label="Tools">
      <FloatingToolbarButton label="Undo">
        <Undo2 />
      </FloatingToolbarButton>
    </FloatingToolbar>
  )
  const wrapper = () => document.querySelector('[data-slot="floating-toolbar-wrapper"]')!
  expect(wrapper().getAttribute("data-placement")).toBe("bottom")
  expect(wrapper().className).toContain("fixed")
  rerender(
    <FloatingToolbar placement="inline" aria-label="Tools">
      <FloatingToolbarButton label="Undo">
        <Undo2 />
      </FloatingToolbarButton>
    </FloatingToolbar>
  )
  expect(wrapper().className).not.toContain("fixed")
})

test("marks which edges have hidden options as the toolbar scrolls", () => {
  render(<Editor />)
  const toolbar = screen.getByRole("toolbar", { name: "Editor" })
  Object.defineProperty(toolbar, "scrollWidth", { configurable: true, value: 300 })
  Object.defineProperty(toolbar, "clientWidth", { configurable: true, value: 200 })
  const scrollTo = (left: number) => {
    toolbar.scrollLeft = left
    toolbar.dispatchEvent(new Event("scroll"))
  }
  const edges = () => [toolbar.hasAttribute("data-more-start"), toolbar.hasAttribute("data-more-end")]

  scrollTo(0)
  expect(edges()).toEqual([false, true])
  scrollTo(50)
  expect(edges()).toEqual([true, true])
  scrollTo(100)
  expect(edges()).toEqual([true, false])
  expect(toolbar.parentElement?.getAttribute("data-slot")).toBe("floating-toolbar-surface")
  expect(toolbar.className).not.toContain("bg-popover")
})

test("an agent can find every option and run items at both levels", async () => {
  render(<Editor />)
  await tick()

  const components = agent.snapshot().filter((entry) => !entry.offPage && entry.component !== "more")
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy()
  }
  const labels = components.map((entry) => entry.label)
  for (const label of ["Editor", "Undo", "Insert"]) {
    expect(labels, `${label} is missing from the snapshot`).toContain(label)
  }

  const result = await agent.act({
    steps: [
      { ref: "Undo", action: "press" },
      { ref: "Insert", action: "press", args: ["Image"] },
    ],
  })
  expect(result.ok, result.error?.message).toBe(true)
  expect(onUndo).toHaveBeenCalledTimes(1)
  expect(onAction).toHaveBeenCalledWith("image", expect.anything())

  const nested = await agent.act({
    steps: [
      { ref: "Insert", action: "press", args: ["Shape"] },
      { ref: "Shape", action: "press", args: ["Circle"] },
    ],
  })
  expect(nested.ok, nested.error?.message).toBe(true)
  expect(onAction).toHaveBeenCalledWith("circle", expect.anything())
})

function NumberedEditor({ numbering }: Pick<FloatingToolbarMenuContentProps, "numbering">) {
  return (
    <FloatingToolbar placement="inline" aria-label="Numbered">
      <FloatingToolbarMenu defaultOpen>
        <FloatingToolbarMenuTrigger label="Insert">
          <Plus />
        </FloatingToolbarMenuTrigger>
        <FloatingToolbarMenuContent numbering={numbering}>
          <FloatingToolbarMenuItem value="image">Image</FloatingToolbarMenuItem>
          <FloatingToolbarSubmenu defaultOpen>
            <FloatingToolbarSubmenuTrigger>Shape</FloatingToolbarSubmenuTrigger>
            <FloatingToolbarSubmenuContent>
              <FloatingToolbarMenuItem value="circle">Circle</FloatingToolbarMenuItem>
            </FloatingToolbarSubmenuContent>
          </FloatingToolbarSubmenu>
        </FloatingToolbarMenuContent>
      </FloatingToolbarMenu>
    </FloatingToolbar>
  )
}

test("numbering is off by default and counts items per panel when on", async () => {
  const { rerender } = render(<NumberedEditor />)
  await tick()
  const item = (name: string) => screen.getByRole("menuitem", { name })
  expect(item("Image").className).not.toContain("counter-increment")

  rerender(<NumberedEditor numbering="hierarchical" />)
  await tick()
  const panels = [...document.querySelectorAll('[data-slot="menu-content"]')]
  expect(panels.map((panel) => panel.getAttribute("data-numbering"))).toEqual(["hierarchical", "hierarchical"])
  expect(item("Image").className).toContain("[counter-increment:ft-item]")
  expect(item("Shape").className).toContain("[counter-increment:ft-item]")
  expect(item("Circle").className).toContain("[counter-increment:ft-sub]")
  expect(item("Circle").className).toContain('counter(ft-item,decimal-leading-zero)_"."_counter(ft-sub)')
  expect(item("Back").className).not.toContain("counter-increment")
})
