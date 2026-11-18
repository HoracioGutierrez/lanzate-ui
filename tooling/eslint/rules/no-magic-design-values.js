// Design values (colors, type scale, shadows, easings) come from design tokens, never literals.
// See docs/architecture/tokens.md#no-magic-values

const PATTERNS = [
  // `oklch(from var(--token) …)` derives a color from a token, so it's allowed.
  { re: /\b(?:oklch|oklab|rgba?|hsla?|lab|lch|hwb)\((?!from\s+var\()/, what: "a raw color" },
  { re: /-\[#[0-9a-fA-F]{3,8}\]/, what: "an arbitrary hex color" },
  { re: /\b(?:text|leading|tracking)-\[-?[\d.]+(?:px|rem|em)\]/, what: "an arbitrary type-scale value" },
  { re: /\bshadow-\[(?!var\()/, what: "an arbitrary shadow" },
  { re: /\bease-\[cubic-bezier/, what: "an arbitrary easing curve" },
]

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    docs: { description: "Use design tokens instead of literal design values." },
    messages: {
      magic:
        "This string has {{what}} ('{{match}}'). Use a design token (Tailwind utility or var(--token)) instead. See docs/architecture/tokens.md#no-magic-values",
    },
    schema: [],
  },
  create(context) {
    function check(node, text) {
      if (typeof text !== "string") return
      for (const { re, what } of PATTERNS) {
        const match = text.match(re)
        if (match) {
          context.report({ node, messageId: "magic", data: { what, match: match[0] } })
          return
        }
      }
    }
    return {
      Literal: (node) => check(node, node.value),
      TemplateElement: (node) => check(node, node.value.raw),
    }
  },
}
