# Design tokens (`tokens/`)

The single source of every visual value. Full guide:
`docs/architecture/tokens.md`.

- Format: DTCG JSON (`$value`, `$type`, `$description`, `$extensions`).
  References use `{path.to.token}`.
- Paths: `primitive.color.*` for raw values; everything else is
  `<scope>.<kind>.<name>`, with scope `registry` (ships to consumers) or
  `site` (website only), and kind `color`, `theme` or `root`.
- A color goes in both `semantic/color.light.json` and
  `semantic/color.dark.json`. Semantic colors reference primitives.
- `theme` token names start with a Tailwind namespace (`text`, `shadow`,
  `radius`, `ease`, `font`) so they become utilities.
- An intent color (a value of the components' `color` prop) has
  `"$extensions": { "lanzate": { "intent": true } }` and a `-foreground`
  partner.
- One-component tokens go in `component/<component>.json`.
- After any change, run `bun run tokens` and commit the JSON together with
  `src/styles/generated/*` and `registry.json`. Never edit generated files.
- When you add a kind, scope or naming rule, update
  `docs/architecture/tokens.md` and `tooling/tokens/build.js` validation.
