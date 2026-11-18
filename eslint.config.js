import js from "@eslint/js"
import eslintReact from "@eslint-react/eslint-plugin"
import nextPlugin from "@next/eslint-plugin-next"
import boundaries from "eslint-plugin-boundaries"
import checkFile from "eslint-plugin-check-file"
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"

import lanzate from "./tooling/eslint/plugin.js"

// Severity of the architecture rules (layers, one component per file, types files,
// design tokens, naming, exports). They were "warn" during the migration and are
// errors now that the codebase follows them. `bun run lint` also runs with
// --max-warnings 0, so a warning from any other rule fails too.
// See docs/architecture/linting.md#severity
const ARCHITECTURE = "error"

const NO_DEFAULT_EXPORT = {
  selector: "ExportDefaultDeclaration",
  message:
    "Use named exports. Default exports are only for Next.js route files in src/app. See docs/architecture/conventions.md#exports-and-imports",
}
const NO_EXPORT_ALL = {
  selector: "ExportAllDeclaration",
  message:
    "Don't use `export *`. Re-export each public name explicitly. See docs/architecture/conventions.md#exports-and-imports",
}

export default defineConfig([
  globalIgnores(["dist", ".next", "out", "public", "next-env.d.ts", ".agents", ".claude", ".kiro"]),

  // ── Base: JS, TypeScript, React, hooks, Next ─────────────────────────────
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      reactHooks.configs.flat.recommended,
    ],
    plugins: { "@next/next": nextPlugin },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "separate-type-imports" }],
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },

  // ── Architecture: source files ───────────────────────────────────────────
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { lanzate, "check-file": checkFile, boundaries },
    settings: {
      "import/resolver": { typescript: { alwaysTryTypes: true } },
      "boundaries/include": ["src/**/*"],
      // Layers, outermost first. Dependencies flow only inward:
      // app → features → ui → lib → styles
      "boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "features", pattern: "src/features/*", capture: ["feature"] },
        { type: "ui", pattern: "src/components/ui" },
        { type: "hooks", pattern: "src/hooks" },
        { type: "lib", pattern: "src/lib" },
        { type: "styles", pattern: "src/styles" },
        { type: "test", pattern: "src/test" },
      ],
    },
    rules: {
      "lanzate/one-component-per-file": ARCHITECTURE,
      "lanzate/types-in-types-files": ARCHITECTURE,
      "lanzate/no-magic-design-values": ARCHITECTURE,
      "no-restricted-syntax": [ARCHITECTURE, NO_DEFAULT_EXPORT, NO_EXPORT_ALL],

      "check-file/filename-naming-convention": [
        ARCHITECTURE,
        { "src/**/*.{ts,tsx}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [ARCHITECTURE, { "src/**/": "NEXT_JS_APP_ROUTER_CASE" }],

      "boundaries/dependencies": [
        ARCHITECTURE,
        {
          default: "disallow",
          message:
            "A '{{from.element.type}}' file can't import from '{{to.element.type}}'. Layers only depend inward: app → features → ui → lib → styles. See docs/architecture/layers.md",
          policies: [
            { from: { element: { type: "app" } }, allow: { to: { element: { types: ["features", "ui", "hooks", "lib", "styles"] } } } },
            { from: { element: { type: "features" } }, allow: { to: { element: { types: ["features", "ui", "hooks", "lib", "styles"] } } } },
            { from: { element: { type: "ui" } }, allow: { to: { element: { types: ["ui", "hooks", "lib", "styles"] } } } },
            { from: { element: { type: "hooks" } }, allow: { to: { element: { types: ["hooks", "lib", "styles"] } } } },
            { from: { element: { type: "lib" } }, allow: { to: { element: { types: ["lib", "styles"] } } } },
            { from: { element: { type: "styles" } }, allow: { to: { element: { types: ["styles"] } } } },
            { from: { element: { type: "test" } }, allow: { to: { element: { types: ["ui", "hooks", "lib", "styles", "test"] } } } },
          ],
        },
      ],
    },
  },

  // Next.js route files must use default exports and Next's names (page.tsx, layout.tsx…).
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "lanzate/one-component-per-file": "off",
      "no-restricted-syntax": [ARCHITECTURE, NO_EXPORT_ALL],
    },
  },

  // Tests may define throwaway components, use literal values in assertions and
  // render plain <a> elements (e.g. to test the `render` prop).
  {
    files: ["src/**/*.test.{ts,tsx}"],
    rules: {
      "lanzate/one-component-per-file": "off",
      "lanzate/no-magic-design-values": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },

  // Tooling (ESLint rules, scripts) runs in Node and is plain JS.
  {
    files: ["tooling/**/*.js", "*.config.{js,ts,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
])
