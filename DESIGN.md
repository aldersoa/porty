---
name: Gail Alderson Portfolio
description: Editorial portfolio where quiet chrome frames expressive project work.
colors:
  paper: "#f7f7f3"
  paper-bright: "#fff"
  ink: "#11110f"
  muted: "#686860"
  line: "#cecec5"
  signal: "#41413c"
  media-surface: "#e9e9e3"
typography:
  display:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "clamp(2.6rem, 6.6vw, 6rem)"
    fontWeight: 550
    lineHeight: 1.04
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.1em"
  caption:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.45
  body-em:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.55
  icon:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 500
    lineHeight: 1
  deck-arrow:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1
  standfirst:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "clamp(1.05rem, 1.6vw, 1.28rem)"
    fontWeight: 400
    lineHeight: 1.55
  project-title:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)"
    fontWeight: 550
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body-fluid:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "clamp(1rem, 1.5vw, 1.22rem)"
    fontWeight: 400
    lineHeight: 1.55
  pull:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "clamp(1.35rem, 2.3vw, 1.8rem)"
    fontWeight: 500
    lineHeight: 1.35
  private-note:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "clamp(1.3rem, 2.6vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1.3
  project-hero:
    fontFamily: "Manrope, -apple-system, Helvetica, sans-serif"
    fontSize: "clamp(2.8rem, 7.5vw, 6.8rem)"
    fontWeight: 550
    lineHeight: 0.96
    letterSpacing: "-0.05em"
rounded:
  none: "0px"
  sm: "4px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  nav-link-active:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  deck-progress-fill:
    backgroundColor: "{colors.signal}"
    height: "3px"
  pull-quote:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "12px 0 32px 26px"
---

# Design System: Gail Alderson Portfolio

## Overview

**Creative North Star: "Paper Desk, Living Work"**

The interface behaves like a neutral desk surface: calm paper tones, dark ink typography, and low-noise borders that frame content without competing with it. Project artifacts carry saturation and visual energy, while the site chrome stays quiet and deliberate.

The system uses editorial pacing instead of product-dashboard density. Large display headlines establish narrative hierarchy, then compact labels and measured body text support fast scanning. Motion is purposeful and restrained, reserved for wayfinding and direct manipulation.

**Key Characteristics:**
- Quiet neutral palette with one graphite signal color.
- Typography-first hierarchy with one family, tuned through weight and tracking.
- Sparse lines and section breaks instead of heavy containers.
- Content-led media treatment with minimal decorative effects.

## Colors

Palette character: warm paper base, soft graphite neutrals, and a single accent channel for interaction.

### Primary
- **Graphite Signal** (`#41413c`): interaction emphasis for active nav, counters, progress bars, links, and selected accents.

### Neutral
- **Paper Ground** (`#f7f7f3`): default page background.
- **Bright Paper** (`#fff`): masthead canvas where letterform artwork needs maximum contrast.
- **Ink Text** (`#11110f`): primary text and icon color.
- **Muted Editorial Gray** (`#686860`): secondary copy and metadata.
- **Rule Line** (`#cecec5`): dividers and structural rails.
- **Media Surface** (`#e9e9e3`): image/video/deck loading surfaces.

**The One-Signal Rule.** Keep `signal` rare and intentional. If everything is accented, nothing is accented.

## Typography

**Display Font:** Manrope (fallback: `-apple-system, Helvetica, sans-serif`)  
**Body Font:** Manrope (fallback: `-apple-system, Helvetica, sans-serif`)  
**Label Font:** Manrope (fallback: `-apple-system, Helvetica, sans-serif`)

**Character:** One-family editorial voice; hierarchy comes from scale, weight, casing, and tracking.

### Hierarchy
- **Display** (550, `clamp(2.6rem, 6.6vw, 6rem)`, 1.04, `-0.045em`): about and index hero statements.
- **Project Hero** (550, `clamp(2.8rem, 7.5vw, 6.8rem)`, 0.96, `-0.05em`): project detail masthead titles.
- **Title** (600, `1rem`, 1.35): section anchors and supporting headings.
- **Body** (400, `1rem`, 1.6): narrative copy with readable measure around 58ch.
- **Caption** (400, `0.88rem`, 1.45): figcaptions, deck bars, footers, and compact helper text.
- **Label** (500, `0.74rem`, `0.1em`, uppercase): kicker metadata and discipline tags.

**The Weight-First Rule.** Build hierarchy with weight and rhythm before adding another typeface.

**The No-Roman-Numerals Rule.** Do not prefix section headings with Roman numerals. Let headings and spacing communicate section hierarchy. Decimal counters may remain where they clarify sequence or position.

Supporting implementation steps intentionally in use: `0.95rem`, `1.3rem`, `1.5rem`, `clamp(1.05rem, 1.6vw, 1.28rem)`, `clamp(1.05rem, 1.8vw, 1.4rem)`, `clamp(1rem, 1.5vw, 1.22rem)`, `clamp(1.35rem, 2.3vw, 1.8rem)`, and `clamp(1.3rem, 2.6vw, 2.1rem)`.

## Layout

The shell width is `min(100% - 48px, 1280px)` on desktop and `min(100% - 28px, 1280px)` on mobile. A single breakpoint at `700px` collapses multi-column systems to one column. Project article content stays centered in an `820px` measure for long-form readability.

Grid usage is contextual: two-column spreads for paired narrative/media blocks, two-column project indexes that collapse cleanly, and full-bleed moments only when artifact impact matters. Section rhythm relies on recurring vertical intervals (`48px` to `96px`) separated by quiet rules.

On the About page, major sections no longer use hard divider rules between blocks; spacing now carries the separation while list-level lines still provide scanability.

**The Breathing-Room Rule.** Preserve generous vertical cadence; do not compress spacing to force density.

## Elevation & Depth

Depth is tonal, not shadow-driven. The system avoids card stacks and synthetic lift; separation is communicated with rule lines, contrast shifts, and whitespace.

**The Flat-By-Default Rule.** Resting surfaces stay flat. State changes use subtle transform and color shifts instead of default shadows.

## Shapes

Form language is square and architectural. Containers, media frames, and rails use sharp edges by default (`0px` radius). Rounded corners are reserved for focus affordances and small control hit areas (`4px`).

Borders are thin and quiet (`1px`), including the softened pull-quote rule that mixes `signal` with `paper`.

## Components

### Buttons
- **Shape:** mostly borderless interaction zones with occasional `4px` focus affordance.
- **Primary behavior:** deck edge controls and utility actions stay transparent at rest.
- **Hover / Focus:** hover reveals directional cues; focus uses visible `2px` outlines.

### Cards / Project Tiles
- **Corner Style:** square frames on neutral media surfaces.
- **State:** subtle media zoom (`scale(1.025)`) with `cubic-bezier(.2, .7, .2, 1)`.
- **Internal Structure:** index number aligns to the title baseline; description locks to the title column for a clean reading edge.

### Navigation
- **Style:** muted small links that darken on hover and active state.
- **Home Wordmark:** centered `gail alderson` now matches nav link typography and interaction exactly (muted default, `1rem`, `400`, hover/active-like `500`).
- **Active State:** hand-drawn underline motif in `signal`.
- **Mobile Treatment:** same tone, tighter spacing, and caption-size links.

### Signature Component
- **ALDERSON Letter Switch:** interactive letterforms with restrained hover float and switch-pop, respecting reduced-motion preferences.

## Do's and Don'ts

### Do:
- **Do** keep chrome quiet and let project artifacts carry color energy.
- **Do** use `signal` for wayfinding and actionable emphasis only.
- **Do** maintain generous vertical spacing bands with line-based section breaks.
- **Do** preserve readable text rhythm through tokenized caption/body/label roles.
- **Do** use decimal counters when they clarify sequence or position.

### Don't:
- **Don't** introduce additional accent hues without an explicit identity shift.
- **Don't** rely on heavy shadows, thick rails, or glossy gradients as default language.
- **Don't** tilt documentary imagery; keep photos and figure media level unless rotation communicates data.
- **Don't** animate layout properties (`width`, `height`, `padding`, `margin`) for routine UI state changes.
- **Don't** add Roman-numeral prefixes to section headings.
