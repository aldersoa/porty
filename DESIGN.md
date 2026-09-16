# Design rules (short)

Source of truth: `app/globals.css`.

## Brand intent

- Paper-and-ink editorial style.
- Quiet UI chrome; work should carry the visual energy.
- One "delight" moment per page, not many.

## Tokens

- `--paper`: `#f7f7f3`
- `--ink`: `#11110f`
- `--muted`: `#686860`
- `--line`: `#cecec5`
- `--signal`: `#41413c`

Rule: use signal for interactive/annotation moments only (links, counters, accents), not body copy.

## Type

- Families: Inter (reading + hierarchy), Space Grotesk (annotation voice).
- Hierarchy is weight + spacing first, size second.
- Body measure target: about 58ch.

## Layout

- Content shell: `min(100% - 48px, 1280px)` desktop.
- One breakpoint at `700px`; collapse grids to one column.
- Article column max: `820px`.

## Content blocks

- Allowed kinds in `content/projects.json`: `sub`, `text`, `list`, `steps`, `kv`, `pull`, `figures`.
- Project structure: masthead + sections + optional gallery.
- Section arc: Context -> Approach -> Making -> Outcome -> optional Reflection.

## Motion

- Default easing: `cubic-bezier(.2,.7,.2,1)`.
- Motion must support comprehension (reveals/transitions), not decoration.
- Always honor `prefers-reduced-motion`.

## Accessibility baseline

- Never use text contrast weaker than muted-on-paper for meaningful content.
- Keep keyboard-visible focus states on all interactive elements.
- Use semantic buttons/links and informative labels.

## Explicit decisions

- Dark mode: no.
- Figure layout: auto pair, with manual `layout` override in content data.
- Accent palette: neutral graphite (no system hue).
