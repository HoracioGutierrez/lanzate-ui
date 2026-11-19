# 0007 — Intent colors get a `-text` token for text on light surfaces

- Status: accepted
- Date: 2026-11-19

## Context

Every intent (`primary`, `secondary`, `muted`, `info`, `warning`, `success`,
`error`) had two tokens: the color itself and a `-foreground` for text on a
solid fill. Components also used the intent color as **text**: soft, outline,
ghost and dashed Buttons and Badges, `Text color="info"`, menu items and the
open state of menu triggers.

One value can't do both jobs. A fill has to be bright enough to read as the
brand; text in that color has to be dark enough to read on the page. A
browser audit of every badge, button and colored text on seven pages found,
in light mode:

| Pair | Before |
| --- | --- |
| soft primary (text on its 15% tint) | 3.26 |
| soft info | 3.19 |
| soft warning | 2.13–2.35 |
| soft error / success / muted | 3.65 / 3.79 / 3.94 |
| solid primary (white on orange) | 3.78 |
| `Text color="muted"` on a muted surface | 4.35 |

In dark mode, white or cream text on the lighter fills failed for every
intent but warning (2.5–3.4).

## Options

1. **Darken the intent colors.** Token-only, no component changes. Rejected:
   text on a tint needs a lightness of about 0.46–0.50, so every fill would
   go with it: the brand orange turns rust and warning turns brown (and then
   needs white text).
2. **Add a `-text` token per intent** for text, icons and borders on light
   surfaces, and keep the fill for fills. Chosen.

## Decision

- Each intent has `<intent>-text` (registry scope), in light and dark. The
  token build fails if an intent lacks one, or if a theme overrides an
  intent without its `-text`.
- Components read `-text` wherever the intent is text: Button and Badge set
  their accent variable (`--btn-accent`, `--badge-accent`) from it; Text,
  Frame and FloatingToolbar use `text-<intent>-text`. Fills and decorative
  marks (corner brackets, focus rings, tints) keep the intent color.
- Target: 4.5:1 for the resting state of text on its own 15% tint, laid over
  the page and over a muted surface (`--muted`/`--accent`, L 0.97 light, 0.269
  dark). Tailwind mixes `/15` tints in oklab, so the values were measured in
  the browser, not computed.
- Fills only move where text on them failed: light `primary` 0.62 → 0.575 and
  `info` 0.60 → 0.555 (white text now passes); dark `-foreground`s become dark
  ink (`neutral.950`), since white fails on the dark mode's lighter fills.
- `muted-text` (0.49 light) also replaces `muted-foreground` in `Text`'s
  `muted` color and overline, which failed on muted surfaces.

## Consequences

- After the change, an audit of 406 elements on seven pages finds none under
  4.5:1 in either mode (lowest 4.52).
- Soft hover states (`/25`) are not held to 4.5:1; reaching it there would
  need roughly 0.40 lightness.
- `primary-muted` and `secondary-muted` (60% opacity) stay below 4.5:1 by
  design: they are for decorative text.
- The site's own `--muted-foreground` (shadcn's token) still reads 4.35:1 on
  muted surfaces where the site uses it directly; registry components no
  longer do.
- Consumers who override `--primary` should override `--primary-text` too
  (see the theming page).
