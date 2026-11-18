import { RuleTester } from "eslint"
import tseslint from "typescript-eslint"
import { describe, it } from "vitest"

import noMagicDesignValues from "./no-magic-design-values.js"
import oneComponentPerFile from "./one-component-per-file.js"
import typesInTypesFiles from "./types-in-types-files.js"

RuleTester.describe = describe
RuleTester.it = it
RuleTester.itOnly = it.only

const tester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
})

tester.run("one-component-per-file", oneComponentPerFile, {
  valid: [
    { filename: "button.tsx", code: "export function Button() { return <button /> }" },
    { filename: "button.tsx", code: "export function Button() {}\nfunction useThing() {}\nconst helper = () => 1" },
    { filename: "button.tsx", code: "const Button = memo(function Button() { return null })" },
    { filename: "config.ts", code: "export const SIZES = ['sm', 'md']" },
  ],
  invalid: [
    {
      filename: "button.tsx",
      code: "export function Button() {}\nfunction ButtonSpinner() {}",
      errors: [{ messageId: "extra", data: { name: "ButtonSpinner", first: "Button", file: "button-spinner" } }],
    },
    {
      filename: "docs.tsx",
      code: "export const A = () => null\nexport const B = React.memo(() => null)\nclass C extends Component {}",
      errors: [{ messageId: "extra" }, { messageId: "extra" }],
    },
  ],
})

tester.run("types-in-types-files", typesInTypesFiles, {
  valid: [
    { filename: "button.types.ts", code: "import type { ReactNode } from 'react'\nexport type ButtonProps = { children?: ReactNode }\nexport interface X { a: string }" },
    { filename: "button.types.ts", code: "export type { ButtonProps } from './other.types'" },
    { filename: "button.tsx", code: "import type { ButtonProps } from './button.types'\nexport function Button({ a }: ButtonProps) {}" },
    { filename: "env.d.ts", code: "type Anything = string" },
    { filename: "utils.ts", code: "export function f(a: string, b: Record<string, number>) {}" },
  ],
  invalid: [
    { filename: "button.tsx", code: "type ButtonProps = { a: string }", errors: [{ messageId: "declaration" }] },
    { filename: "button.tsx", code: "interface ButtonProps { a: string }", errors: [{ messageId: "declaration" }] },
    {
      filename: "card.tsx",
      code: "export function Card({ title }: { title: string }) {}",
      errors: [{ messageId: "inline", data: { fn: "Card" } }],
    },
    {
      filename: "card.tsx",
      code: "const Card = ({ title } : { title: string }) => null",
      errors: [{ messageId: "inline", data: { fn: "Card" } }],
    },
    { filename: "card.tsx", code: "enum Size { Sm, Md }", errors: [{ messageId: "enum" }] },
    { filename: "card.types.ts", code: "export const SIZES = ['sm']", errors: [{ messageId: "runtime" }] },
    { filename: "card.types.ts", code: "import { ReactNode } from 'react'", errors: [{ messageId: "runtime" }] },
  ],
})

tester.run("no-magic-design-values", noMagicDesignValues, {
  valid: [
    { code: "const c = 'bg-primary text-sm shadow-soft'" },
    { code: "const c = 'shadow-[var(--shadow-pop)] text-(--btn-fg)'" },
    { code: "const c = 'color-mix(in oklch, var(--border) 60%, transparent)'" },
    { code: "const c = 'w-[22rem] min-h-[16rem]'" },
    { code: "const c = 'oklch(from var(--foreground) l c h / 0.65)'" },
  ],
  invalid: [
    { code: "const c = '[--btn-fg:oklch(1_0_0)]'", errors: [{ messageId: "magic" }] },
    { code: "const c = 'bg-[#7c3aed]'", errors: [{ messageId: "magic" }] },
    { code: "const c = `text-[13px] ${x}`", errors: [{ messageId: "magic" }] },
    { code: "const c = 'shadow-[0_4px_12px_rgba(0,0,0,0.15)]'", errors: [{ messageId: "magic" }] },
    { code: "const c = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'", errors: [{ messageId: "magic" }] },
  ],
})
