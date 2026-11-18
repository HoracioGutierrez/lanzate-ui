import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createAgent } from "@ui-sdk/react/agent"
import { Trash2 } from "lucide-react"
import { expect, test, vi } from "vitest"

import { Button } from "./button"

const agent = createAgent()

test("renders a native button named by its text", () => {
  render(<Button>Guardar</Button>)
  const button = screen.getByRole("button", { name: "Guardar" })
  expect(button.tagName).toBe("BUTTON")
  expect(button).toHaveProperty("type", "button")
  expect(button.getAttribute("data-slot")).toBe("button")
  expect(button.hasAttribute("aria-disabled")).toBe(false)
  expect(button.hasAttribute("aria-busy")).toBe(false)
})

test("click runs onClick; disabled blocks it and leaves the tab order", async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  const { rerender } = render(<Button onClick={onClick}>Guardar</Button>)
  await user.click(screen.getByRole("button", { name: "Guardar" }))
  expect(onClick).toHaveBeenCalledTimes(1)

  rerender(<Button onClick={onClick} disabled>Guardar</Button>)
  const button = screen.getByRole("button", { name: "Guardar" })
  expect(button).toHaveProperty("disabled", true)
  expect(button.hasAttribute("data-disabled")).toBe(true)
  await user.click(button)
  expect(onClick).toHaveBeenCalledTimes(1)
})

test("isLoading disables the button, marks it busy and swaps the text", () => {
  render(<Button isLoading loadingText="Guardando...">Guardar</Button>)
  const button = screen.getByRole("button", { name: "Guardando..." })
  expect(button).toHaveProperty("disabled", true)
  expect(button.getAttribute("aria-busy")).toBe("true")
})

test("a Promise from onClick keeps the button pending until it settles", async () => {
  const user = userEvent.setup()
  let finish = () => {}
  const onClick = vi.fn(() => new Promise<void>((resolve) => { finish = resolve }))
  render(<Button onClick={onClick}>Guardar</Button>)
  const button = screen.getByRole("button", { name: "Guardar" })

  await user.click(button)
  expect(button.hasAttribute("data-pending")).toBe(true)
  expect(button.getAttribute("aria-busy")).toBe("true")

  await user.click(button)
  expect(onClick).toHaveBeenCalledTimes(1)

  await act(async () => finish())
  expect(button.hasAttribute("data-pending")).toBe(false)
})

test("an icon-only button is named by its tooltip", async () => {
  render(<Button icon={<Trash2 aria-hidden="true" />} tooltip="Eliminar registro" />)
  await act(async () => { await new Promise((r) => setTimeout(r, 0)) })
  expect(screen.getByRole("button", { name: "Eliminar registro" })).toBeTruthy()
})

test("a disabled button with a tooltip stays focusable through aria-disabled", async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<Button disabled tooltip="Completá el formulario" onClick={onClick}>Enviar</Button>)
  const button = screen.getByRole("button", { name: "Enviar" })
  expect(button).toHaveProperty("disabled", false)
  expect(button.getAttribute("aria-disabled")).toBe("true")

  await user.tab()
  expect(document.activeElement).toBe(button)
  await user.click(button)
  expect(onClick).not.toHaveBeenCalled()
})

test("mobile only-icon keeps the text for screen readers", () => {
  render(<Button mobile="only-icon" startIcon={<Trash2 aria-hidden="true" />}>Buscar</Button>)
  expect(screen.getByRole("button", { name: "Buscar" })).toBeTruthy()
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
      <Button onClick={onSave}>Guardar cambios</Button>
      <Button icon={<Trash2 aria-hidden="true" />} tooltip="Eliminar registro" onClick={onDelete} />
    </>
  )
  await act(async () => { await new Promise((r) => setTimeout(r, 0)) })

  const components = agent.snapshot().filter((entry) => !entry.offPage && entry.component !== "more")
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy()
  }
  const labels = components.map((entry) => entry.label)
  expect(labels).toContain("Guardar cambios")
  expect(labels).toContain("Eliminar registro")

  const result = await agent.act({
    steps: [
      { ref: "Guardar cambios", action: "press" },
      { ref: "Eliminar registro", action: "press" },
    ],
  })
  expect(result.ok, result.error?.message).toBe(true)
  expect(onSave).toHaveBeenCalledTimes(1)
  expect(onDelete).toHaveBeenCalledTimes(1)
})
