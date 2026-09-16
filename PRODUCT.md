# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary audience: design peers and creative community members reviewing work quality and craft.
- Their core job: quickly understand what Gail makes, how she works, and whether the outcomes are credible.

## Product Purpose

This site presents Gail Alderson's portfolio as a browsable record of shipped and exploratory work across product design, engineering, and research. Success means visitors can understand her capabilities, process, and outcomes through project pages, then continue the conversation (for example via LinkedIn or email).

## Positioning

The portfolio position to preserve is a hybrid maker profile: designer + engineer + researcher, backed by both case-study outcomes and hands-on build projects.

## Operating Context

- Content is maintained in `content/projects.json` and rendered through shared templates.
- Visitors browse three top-level areas: `about`, `work`, and `play`.
- Some projects are intentionally private and remain listed with hidden internals.
- Deck-style projects are delivered as swipeable, page-by-page experiences with optional original PDF access.

## Capabilities and Constraints

- Must preserve factual project claims and outcomes; no fabricated business impact.
- Must preserve the current information architecture (`about`, `work`, `play`) unless explicitly changed.
- Must preserve private project gating behavior.
- URL continuity matters during migration/cutover (legacy route redirects are in place).
- Current product truth is established from the existing code and content files; no contradictory source-of-truth docs are kept.

## Brand Commitments

- Keep the paper-and-ink editorial tone.
- Keep the interface quiet so project artifacts carry the visual energy.
- Preserve current personal voice (direct, modest, and craft-forward).

## Evidence on Hand

- Project dataset and copy: `content/projects.json`
- Site templates and interaction patterns: `app/`, `components/`
- Visual system rules: `DESIGN.md`
- Public media artifacts: `public/media/`
- Contact channels present in UI: LinkedIn and email links

No testimonials, pricing, client rosters, or benchmark claims beyond documented project outcomes should be invented.

## Product Principles

1. Lead with real work, not interface decoration.
2. Preserve truth and specificity in every case study.
3. Make technical and design craft equally legible.
4. Keep navigation simple and browsing friction low.
5. Show personality through restraint and selective delight.

## Accessibility & Inclusion

- Honor reduced-motion user preferences.
- Maintain keyboard-reachable navigation and controls.
- Keep readable contrast and clear text hierarchy across all pages.
