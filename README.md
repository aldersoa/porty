# Gail Alderson portfolio

A self-contained React (Next.js) portfolio rebuilt from `gailalderson.com`.

## Start the site

1. Open Terminal in this folder.
2. Run `npm install` once.
3. Run `npm run dev`.
4. Open the local address shown in Terminal.

## Where things live

| What | Where |
|---|---|
| All project content (deks, sections, figures, years) | `content/projects.json` |
| Design language & rules | `DESIGN.md` |
| Running to-do list | `TODO.md` |
| Page templates | `app/` (About = `app/page.tsx`, project template = `app/[slug]/page.tsx`) |
| Header/footer | `components/site-shell.tsx` |
| PDF deck pager | `components/deck-viewer.tsx` |
| All styling | `app/globals.css` |
| Media files | `public/media/<project-slug>/` |

## Edit a project

Everything renders from `content/projects.json`. Each project = masthead (title, dek,
disciplines, year) + `sections` following the five-act outline (Context → Approach → Making →
Outcome → Reflection) + `gallery` for image-only projects. Block types and rules are documented
in `DESIGN.md` §5. The dev server hot-reloads on save.

## PDF case studies (metaphos, cutclear, my-first-sequencer)

These pages show a custom deck pager instead of embedding the PDF. When a `final.pdf` changes:

1. Re-render its pages:
   ```
   swiftc -O scripts/render-deck.swift -o /tmp/render-deck
   /tmp/render-deck public/media/<slug>/final.pdf public/media/<slug>/deck
   ```
2. If the page count changed, update `deck.pages` for that project in `content/projects.json`.
