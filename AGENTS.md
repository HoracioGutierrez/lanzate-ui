<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## ui-sdk

Components with behavior (focus, keyboard, popups, ARIA) are built on ui-sdk (`@ui-sdk/react` + `@ui-sdk/core`), not Radix.

- Before using ui-sdk, follow the ui-sdk skill if it's installed (`npx skills@latest add vercel-labs/ui --skill ui-sdk`; it also ships at `node_modules/@ui-sdk/core/skills/ui-sdk/SKILL.md`), and read `node_modules/@ui-sdk/react/docs/llms.txt`. Then read only the component pages you need, like `docs/components/tooltip.md`.
- To build a new component, also search `node_modules/@ui-sdk/react/docs/core.md` by heading (it's large; don't read it whole), and read `rendering.md` next to it.
- Import each component from its own entry (`@ui-sdk/react/tooltip`), never from the package root or `@ui-sdk/core/internal/*`. Change a part's element with `render`, not `asChild` or `as`.
- Style from state: `data-slot`, state attributes (`data-open`, `data-side`, `data-pending`…) and the CSS variables each component lists.
- Name every control (visible label or `aria-label`) so screen readers and agents (`createAgent` from `@ui-sdk/react/agent`) can find it.
- Every registry component gets tests in `src/**/*.test.tsx` (Vitest + jsdom, setup in `src/test/setup.ts`), including the agent test from the skill's `references/agent-ready.md`. Run `bun run test`, `bunx tsc --noEmit` and `bun run lint` before finishing.
