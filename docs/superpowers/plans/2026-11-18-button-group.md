# ButtonGroup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `button-group` registry component: a tray of registry `Button`s that switches between options (`selection="single"`, sliding indicator) or toggles filters (`selection="multiple"`), with an optional "All" item.

**Architecture:** Compound parts in `src/components/ui/button-group/`. `ButtonGroup` renders ui-sdk `SegmentedControl` (+ `SegmentedControlIndicator`) in `single` and `ToggleGroup multiple` in `multiple`, and provides a context. `ButtonGroupItem` / `ButtonGroupAll` render `SegmentedControlItem` or `Toggle` with `render={(props, state) => <Button … />}`, like `FloatingToolbarButton`. A hook maps the consumer's value to ui-sdk's, using a reserved value for "All".

**Tech Stack:** React 19, Next.js, Tailwind v4, `@ui-sdk/react` (`segmented-control`, `toggle`, `agent`), `lucide-react` (demos), Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-18-button-group-design.md`

## Global Constraints

- Repo rules in `AGENTS.md` and `src/components/ui/AGENTS.md`: one component per file, types only in `button-group.types.ts`, class maps in `button-group.variants.ts` (`satisfies Record<Union, string>` where keyed by a union), named exports, `cn` from `@/lib/cn`, no literal design values, `"use client"` only where needed, tests import from `"."`.
- Import `Button` by exact file: `@/components/ui/button/button`. Never import from `floating-toolbar` or `frame`; the corner-bracket classes are duplicated with a comment.
- ui-sdk parts from their entries: `@ui-sdk/react/segmented-control`, `@ui-sdk/react/toggle`.
- Easing via `ease-spring`; durations with Tailwind `duration-*` utilities; every animation has a `motion-reduce:` fallback.
- Group requires `aria-label`; icon-only items need `tooltip` or `aria-label`.
- Release: `package.json` `0.11.0` → `0.12.0`, CHANGELOG entry, `bun run registry:build`, commit `public/r/`.

## Review Focus

- Controlled `value` without `onValueChange` (both modes): pressing an item must not change what's lit. → test in Task 2.
- `multiple` with no `ButtonGroupAll`: empty value must not light anything nor leak the reserved value into `onValueChange`. → test in Task 2.
- `single` with no `ButtonGroupAll` and `value={null}`: nothing checked, no indicator box, Tab still enters the group. → test in Task 2.
- Disabled item with a `tooltip`: tooltip still reachable, item not checkable/pressable. → test in Task 3.
- Long labels / many items at mobile width: tray must not overflow the page (wraps or scrolls via `max-w-full`). → browser check in Task 4.

---

### Task 1: Value mapping hook

**Files:**
- Create: `src/components/ui/button-group/use-button-group-value.ts`, `button-group.constants.ts`, `button-group.types.ts`
- Test: `src/components/ui/button-group/use-button-group-value.test.ts`

**Interfaces (produces):**
- `BUTTON_GROUP_ALL = "__button-group-all__"` (`button-group.constants.ts`)
- Pure functions exported from the hook file:
  - `toSdkMultiple(value: string[]): string[]` → `value.length === 0 ? [ALL] : value`
  - `fromSdkMultiple(next: string[], current: string[]): string[] | undefined` → `undefined` means "no change" (cancel)
  - `toSdkSingle(value: string | null): string` → `value ?? ALL`
  - `fromSdkSingle(next: string | null): string | null` → `next === ALL || next === null ? null : next`
- `useControllableValue<T>({ value, defaultValue, onValueChange }): [T, (next: T) => void]` — controlled when `value !== undefined`.

`fromSdkMultiple` rules (spec "ButtonGroupAll"):
- `next` includes `ALL` and `current` was non-empty → `[]` (All pressed).
- `next` lacks `ALL` and `current` is empty and `next` is empty → `undefined` (All pressed again).
- otherwise → `next.filter(v => v !== ALL)`.

- [ ] **Step 1: Write failing tests**
  - `toSdkMultiple([])` → `["__button-group-all__"]`; `toSdkMultiple(["a"])` → `["a"]`.
  - `fromSdkMultiple([ALL, "a"], [])` → `["a"]` (first filter from empty).
  - `fromSdkMultiple(["a", ALL], ["a"])` → `[]` (All clears).
  - `fromSdkMultiple([], [])` → `undefined`.
  - `fromSdkMultiple(["a", "b"], ["a"])` → `["a", "b"]`; `fromSdkMultiple([], ["a"])` → `[]`.
  - `toSdkSingle(null)` → ALL; `fromSdkSingle(ALL)` → `null`; `fromSdkSingle("grid")` → `"grid"`.
- [ ] **Step 2:** `bun run test src/components/ui/button-group` → FAIL (module not found).
- [ ] **Step 3:** Implement. Add to `button-group.types.ts` only what this task needs (`UseControllableValueOptions<T>`).
- [ ] **Step 4:** Tests PASS; `bun run typecheck` and `bun run lint` clean.
- [ ] **Step 5:** Commit `feat(button-group): value mapping for single, multiple and All`.

### Task 2: ButtonGroup, ButtonGroupItem, ButtonGroupAll

**Files:**
- Create: `button-group.tsx`, `button-group-item.tsx`, `button-group-all.tsx`, `button-group.variants.ts`, `index.ts`
- Modify: `button-group.types.ts`, `button-group.constants.ts` (context)
- Test: `src/components/ui/button-group/button-group.test.tsx`

**Interfaces (produces):**
- Types:
  - `ButtonGroupSelection = "single" | "multiple"`
  - `ButtonGroupBaseProps`: `div` props minus `children | className | defaultValue | onChange | dir` + `{ "aria-label": string; className?; children?; color?: ButtonColor (default "primary"); padding?: ButtonPadding (default "sm"); orientation?: "horizontal" | "vertical"; disabled?: boolean }`
  - `ButtonGroupSingleProps = ButtonGroupBaseProps & { selection: "single"; value?: string | null; defaultValue?: string | null; onValueChange?: (value: string | null) => void; name?: string; required?: boolean }`
  - `ButtonGroupMultipleProps = ButtonGroupBaseProps & { selection: "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void }`
  - `ButtonGroupProps = ButtonGroupSingleProps | ButtonGroupMultipleProps`
  - `ButtonGroupItemProps = Pick<ButtonProps, "icon" | "startIcon" | "endIcon" | "tooltip" | "disabled" | "aria-label" | "className" | "children"> & { value: string }`
  - `ButtonGroupAllProps = Omit<ButtonGroupItemProps, "value">`
  - `ButtonGroupContextValue = { selection: ButtonGroupSelection; color: ButtonColor; padding: ButtonPadding }`
- `ButtonGroupContext` in `button-group.constants.ts` (default `null`; items throw a clear error outside a group).
- `data-slot`s: `button-group`, `button-group-item`, `button-group-all`, `button-group-led`; root `data-selection`.
- Item render: `<Button {...props} variant={on ? "solid" : "ghost"} color={on ? ctx.color : "muted"} padding={ctx.padding} radius="none" …/>` where `on = state.checked ?? state.pressed`; children prefixed with the LED span unless `icon` is set.
- `ButtonGroupAll` = `ButtonGroupItem` with `value={BUTTON_GROUP_ALL}` and `data-slot="button-group-all"`.

**Variants (`button-group.variants.ts`), from the spec "Look" / "Motion":**
- `buttonGroupClasses`: `relative isolate inline-flex max-w-full flex-wrap items-center gap-1 rounded-sm border border-border bg-card p-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-disabled:opacity-60` + corner brackets copied from `floating-toolbar.variants.ts` (`cornerMarkClasses` + outer corner offsets), with a comment saying it's duplicated on purpose.
- `buttonGroupIndicatorClasses`: `absolute -z-10 top-(--segmented-control-indicator-top) left-(--segmented-control-indicator-left) w-(--segmented-control-indicator-width) h-(--segmented-control-indicator-height) bg-(--btn-accent)/15 inset-ring inset-ring-(--btn-accent)/50 transition-[left,top,width,height] duration-200 ease-spring motion-reduce:transition-none` — the indicator sits on the root, so the root also gets the `--btn-*` vars: set them with a `buttonGroupColorClasses` map `satisfies Record<ButtonColor, string>` (same values as `button.variants.ts` `colorClasses`, duplicated with a comment).
- `buttonGroupItemClasses`: `focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:inset-ring focus-visible:inset-ring-ring`
- `buttonGroupItemSingleClasses`: unchecked items transparent so the indicator shows through; checked fill fades in after the slide: `data-checked:delay-200 motion-reduce:data-checked:delay-0`.
- `buttonGroupLedClasses`: `size-1.5 shrink-0 bg-current opacity-25 transition-opacity` + on (`group-data-checked/item:opacity-100 group-data-pressed/item:opacity-100`; the Button gets `group/item`).

- [ ] **Step 1: Write failing tests** (import from `"."`)
  - `single: the default item is checked and clicking another checks it`: roles `radiogroup` named "View", radios "List"/"Grid"; `aria-checked`.
  - `single: arrow keys move the selection`: Tab, `{ArrowRight}` → "Grid" checked; `onValueChange("grid")`.
  - `single: All is checked while the value is null and checking it emits null`.
  - `single: no All and value null → nothing checked, Tab enters the first item` (Review Focus).
  - `single: renders the indicator only in single`: `[data-slot="segmented-control-indicator"]` present in single, absent in multiple.
  - `multiple: several items stay pressed`: `aria-pressed` on "Pending" and "Paid"; `onValueChange` last call `["pending", "paid"]`.
  - `multiple: All is pressed when empty, clears when pressed, and is never in the value`: start `["pending"]`, press All → `onValueChange([])`, All `aria-pressed="true"`, "Pending" `"false"`; press All again → no new call.
  - `multiple: no All and empty value → nothing pressed; first press emits ["pending"]` (Review Focus).
  - `controlled value without onValueChange doesn't change` (both modes, Review Focus).
  - `items are the registry Button`: `data-variant` `"solid"` on the lit item, `"ghost"` on the others; `data-color` group color vs `"muted"`.
  - `the LED is lit only on the active item and absent on icon-only items`.
- [ ] **Step 2:** Run tests → FAIL.
- [ ] **Step 3:** Implement. Before writing, read `node_modules/@ui-sdk/react/docs/components/segmented-control.md`, `toggle.md` and `node_modules/@ui-sdk/react/docs/rendering.md` (render-function state names). If a part's render state doesn't carry `checked`/`pressed`, read `data-checked`/`data-pressed` via CSS only and drop the state-based `variant` in favor of `data-*` classes — keep the test on `data-variant` only if state is available, otherwise assert the classes.
- [ ] **Step 4:** Tests PASS; `bun run typecheck`, `bun run lint` clean.
- [ ] **Step 5:** Commit `feat(button-group): single and multiple selection with All`.

### Task 3: Tooltips, disabled, agent test, registry, release

**Files:**
- Modify: `button-group.test.tsx`, `registry.json`, `package.json`, `CHANGELOG.md`
- Generated: `public/r/button-group.json` (and whatever `registry:build` touches)

- [ ] **Step 1: Write failing tests**
  - `an icon-only item is named by its tooltip`: `<ButtonGroupItem value="paid" icon={<svg />} tooltip="Paid" />` → `getByRole("button", { name: "Paid" })` (multiple) / `radio` (single).
  - `a disabled item with a tooltip stays focusable but can't be chosen` (Review Focus).
  - `a disabled group chooses nothing`.
  - `an agent can find and choose items`: following `node_modules/@ui-sdk/core/skills/ui-sdk/references/agent-ready.md` and the agent test in `frame.test.tsx`: `createAgent().snapshot()` lists the group and items by name; the agent presses "Paid" and checks "Grid" → corresponding `onValueChange` calls.
- [ ] **Step 2:** Run → FAIL where behavior is missing; fix in the parts (tooltip comes from `Button`'s own `tooltip`; pass `focusableWhenDisabled` through as `Button` does).
- [ ] **Step 3:** Add the `button-group` item to `registry.json` after `frame`: title "Button Group", description from the spec intent in one sentence, `dependencies` `@ui-sdk/react@0.1.0-beta.6`, `@ui-sdk/core@0.1.0-beta.6`, `registryDependencies` `button.json`, `lanzate-theme.json`, `lanzate-utils.json`. Then `node tooling/registry/check.js --fix`.
- [ ] **Step 4:** Bump `package.json` to `0.12.0`; add `## 0.12.0 / ### Added / - **Button Group** (\`button-group\`): …` in the 0.11.0 style.
- [ ] **Step 5:** `bun run registry:build`, then `bun run registry:check` → passes.
- [ ] **Step 6:** Commit `feat(button-group): tooltips, agent test and registry entry`.

### Task 4: Docs page, demos, verification

**Files:**
- Create: `src/features/docs/content/button-group.mdx`, `src/features/docs/api/button-group.api.ts`, demos in `src/features/docs/demos/button-group/`: `button-group-filters.demo.tsx` (multiple + All + counters in labels), `button-group-switch.demo.tsx` (single, icon + text), `button-group-icons.demo.tsx` (icon-only with tooltips), `button-group-vertical.demo.tsx`, `button-group-states.demo.tsx` (disabled item/group)
- Modify: `src/features/docs/types/docs.types.ts` (`DocId` + `"button-group"`), `config/docs-content.ts`, `config/docs-nav.ts` (badge "New"), `api/api-tables.ts`, `demos/demo-registry.ts`

- [ ] **Step 1:** Write the page mirroring `frame.mdx`: badge (next number, `isNew`), Lead, DependencyList, Example, "Filters", "Switching", "Icons and tooltips", "Vertical", "States", Installation, Usage, API table.
- [ ] **Step 2:** `bun run check` → all pass.
- [ ] **Step 3:** preview_start the dev server, open `/docs/button-group`: slide-then-fade on switching (and instant with reduced motion emulated), LED lighting, All behavior, tooltips, corner brackets, mobile width (Review Focus: no overflow), dark mode, no console errors. Screenshot for the user.
- [ ] **Step 4:** Commit `docs(button-group): page and demos`.
