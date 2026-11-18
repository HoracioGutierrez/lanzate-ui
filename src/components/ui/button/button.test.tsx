import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createAgent } from "@ui-sdk/react/agent"
import { Trash2 } from "lucide-react"
import { expect, test, vi } from "vitest"

import { Button } from "."

const agent = createAgent()

test("renders a native button named by its text", () => {
  render(<Button>Save</Button>)
  const button = screen.getByRole("button", { name: "Save" })
  expect(button.tagName).toBe("BUTTON")
  expect(button).toHaveProperty("type", "button")
  expect(button.getAttribute("data-slot")).toBe("button")
  expect(button.hasAttribute("aria-disabled")).toBe(false)
  expect(button.hasAttribute("aria-busy")).toBe(false)
})

test("click runs onClick; disabled blocks it and leaves the tab order", async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  const { rerender } = render(<Button onClick={onClick}>Save</Button>)
  await user.click(screen.getByRole("button", { name: "Save" }))
  expect(onClick).toHaveBeenCalledTimes(1)

  rerender(<Button onClick={onClick} disabled>Save</Button>)
  const button = screen.getByRole("button", { name: "Save" })
  expect(button).toHaveProperty("disabled", true)
  expect(button.hasAttribute("data-disabled")).toBe(true)
  await user.click(button)
  expect(onClick).toHaveBeenCalledTimes(1)
})

test("isLoading disables the button, marks it busy and swaps the text", () => {
  render(<Button isLoading loadingText="Saving...">Save</Button>)
  const button = screen.getByRole("button", { name: "Saving..." })
  expect(button).toHaveProperty("disabled", true)
  expect(button.getAttribute("aria-busy")).toBe("true")
})

test("a Promise from onClick keeps the button pending until it settles", async () => {
  const user = userEvent.setup()
  let finish = () => {}
  const onClick = vi.fn(() => new Promise<void>((resolve) => { finish = resolve }))
  render(<Button onClick={onClick}>Save</Button>)
  const button = screen.getByRole("button", { name: "Save" })

  expect(button.querySelector('[data-slot="button-spinner"]')).toBeNull()

  await user.click(button)
  expect(button.hasAttribute("data-pending")).toBe(true)
  expect(button.getAttribute("aria-busy")).toBe("true")
  expect(button.querySelector('[data-slot="button-spinner"]')).not.toBeNull()

  await user.click(button)
  expect(onClick).toHaveBeenCalledTimes(1)

  await act(async () => finish())
  expect(button.hasAttribute("data-pending")).toBe(false)
  expect(button.querySelector('[data-slot="button-spinner"]')).toBeNull()
})

test("the spinner enters through ui-sdk's animateIn starting style", async () => {
  render(<Button isLoading>Save</Button>)
  const spinner = screen.getByRole("button").querySelector('[data-slot="button-spinner"]')!
  expect(spinner).not.toBeNull()
  expect(spinner.hasAttribute("data-starting-style")).toBe(true)
  await act(async () => { await new Promise((r) => setTimeout(r, 100)) })
  expect(spinner.hasAttribute("data-starting-style")).toBe(false)
})

test("tap animation is plain CSS, off when tapAnimation is false", () => {
  const { rerender } = render(<Button>Save</Button>)
  expect(screen.getByRole("button").className).toContain("active:not-data-disabled:not-data-pending:scale-[0.97]")
  rerender(<Button tapAnimation={false}>Save</Button>)
  expect(screen.getByRole("button").className).not.toContain("scale-[0.97]")
})

test("an icon-only button is named by its tooltip", async () => {
  render(<Button icon={<Trash2 aria-hidden="true" />} tooltip="Delete record" />)
  await act(async () => { await new Promise((r) => setTimeout(r, 0)) })
  expect(screen.getByRole("button", { name: "Delete record" })).toBeTruthy()
})

test("a disabled button with a tooltip stays focusable through aria-disabled", async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<Button disabled tooltip="Fill in the form" onClick={onClick}>Submit</Button>)
  const button = screen.getByRole("button", { name: "Submit" })
  expect(button).toHaveProperty("disabled", false)
  expect(button.getAttribute("aria-disabled")).toBe("true")

  await user.tab()
  expect(document.activeElement).toBe(button)
  await user.click(button)
  expect(onClick).not.toHaveBeenCalled()
})

test("mobile only-icon keeps the text for screen readers", () => {
  render(<Button mobile="only-icon" startIcon={<Trash2 aria-hidden="true" />}>Search</Button>)
  expect(screen.getByRole("button", { name: "Search" })).toBeTruthy()
})

test("render swaps the element, like a link", () => {
  render(<Button render={<a href="/docs" />}>Docs</Button>)
  expect(screen.getByRole("link", { name: "Docs" }).getAttribute("href")).toBe("/docs")
})

test("an agent can find and press every button by name", async () => {
  const onSave = vi.fn()
  const onDelete = vi.fn()
  render(
    <>
      <Button onClick={onSave}>Save changes</Button>
      <Button icon={<Trash2 aria-hidden="true" />} tooltip="Delete record" onClick={onDelete} />
    </>
  )
  await act(async () => { await new Promise((r) => setTimeout(r, 0)) })

  const components = agent.snapshot().filter((entry) => !entry.offPage && entry.component !== "more")
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy()
  }
  const labels = components.map((entry) => entry.label)
  expect(labels).toContain("Save changes")
  expect(labels).toContain("Delete record")

  const result = await agent.act({
    steps: [
      { ref: "Save changes", action: "press" },
      { ref: "Delete record", action: "press" },
    ],
  })
  expect(result.ok, result.error?.message).toBe(true)
  expect(onSave).toHaveBeenCalledTimes(1)
  expect(onDelete).toHaveBeenCalledTimes(1)
})

test("effect applies one depth treatment at a time", () => {
  const { rerender } = render(<Button>Save</Button>)
  const button = () => screen.getByRole("button", { name: "Save" })
  expect(button().className).not.toContain("shadow-elevated")
  expect(button().className).not.toContain("shadow-button-glow")

  rerender(<Button effect="elevated">Save</Button>)
  expect(button().getAttribute("data-effect")).toBe("elevated")
  expect(button().className).toContain("shadow-elevated")

  rerender(<Button effect="glow">Save</Button>)
  expect(button().className).toContain("shadow-button-glow")
  expect(button().className).not.toContain("shadow-elevated")
})

test("the soft variant tints the background with the accent color", () => {
  render(<Button variant="soft">Save</Button>)
  const button = screen.getByRole("button", { name: "Save" })
  expect(button.getAttribute("data-variant")).toBe("soft")
  expect(button.className).toContain("bg-(--btn-accent)/15")
})

test("the subtle variant is neutral: theme border, card fill, accent hover", () => {
  render(<Button variant="subtle" color="error">Copy</Button>)
  const button = screen.getByRole("button", { name: "Copy" })
  expect(button.getAttribute("data-variant")).toBe("subtle")
  expect(button.className).toContain("border-border")
  expect(button.className).toContain("bg-card")
  expect(button.className).toContain("hover:bg-accent")
  expect(button.className).not.toContain("bg-(--btn-color)")
})

test("intent colors read their fill and foreground from tokens", () => {
  render(<Button color="error">Delete</Button>)
  const button = screen.getByRole("button", { name: "Delete" })
  expect(button.className).toContain("[--btn-color:var(--error)]")
  expect(button.className).toContain("[--btn-fg:var(--error-foreground)]")
})
