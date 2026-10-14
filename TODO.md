# Portfolio TODO (lean)

Keep this file short. Only active work goes here.

## Do now (launch blockers)

- [ ] Accessibility pass: add meaningful `alt` text for non-decorative gallery/case-study media.
- [ ] SEO basics: OG image, per-page meta, sitemap.
- [ ] Media optimization: compress large images and convert heavy GIFs to MP4/WebM where possible.
- [ ] Create a loading state for project artifacts.
- [ ] Lighthouse sanity pass after media optimization.
- [ ] Domain cutover plan: Adobe URLs -> new slugs with 301 redirects.

## Content pass (in progress)

- [x] Compress dense copy in `crm`, `benchmarking`, and `modhaus`.
- [ ] Tighten remaining long deks to one sentence and <= 20 words where possible.
- [ ] Decide whether `personas` stays listed or is removed from index pages.

## Quality checks before launch

- [ ] 5 quick portfolio reviews (peers/recruiters): can they state role, strengths, and one memorable project?
- [ ] Mobile device pass on About, Work/Play grids, and project pages.
- [ ] Keyboard-only navigation pass for nav, cards, deck controls, and footer links.

## Nice-to-have (only after launch blockers)

- [ ] Add a simple 404 page with hand-drawn identity.
- [ ] Add one subtle hover/transition delight per key page.

## Done recently

- [x] Replace the Personas link with a password dialog and block direct access to `/personas`.
- [x] Cover the baked-in white bands on all five Work thumbnails without cropping their artwork.
- [x] Remove Roman-numeral section prefixes throughout the site and document the rule in `DESIGN.md`.
- [x] Animate the nav squiggle between hovered/focused links with a restrained dance.
- [x] Add blur-up previews and progressive loading across site imagery.
- [x] Preview the interactive ALDERSON letters on arrival so the interaction is discoverable.
- [x] Remove pointer-click focus artifacts while preserving keyboard-visible focus states.
- [x] Lint errors reduced to zero (warnings remain by choice for now).
- [x] Internal links migrated to `next/link` in nav + About internal project links.
- [x] Content/media references verified (no missing files in `content/projects.json`).
