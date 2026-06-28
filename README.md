# Portfolio site — v2 (ops console redesign)

Dark, instrumentation-panel aesthetic. Static site, no build step, no dependencies beyond Google Fonts.

## Before you publish

Resume PDF is already included at `assets/Pavlo_Malairov_Resume.pdf` and linked from the contact card and footer.

Email and LinkedIn are already filled in with your real details.

## Files

- `index.html` — all page content and structure
- `css/base.css` — full design system: dark console theme, all sections
- `js/node-graph.js` — hero's live animated node graph (signature element)
- `js/cases.js` — expandable case study cards
- `js/architecture.js` — expandable system map with status LEDs
- `js/lab.js` — live safety-stock formula demo
- `js/reveal.js` — scroll-reveal animations + mobile nav toggle

## Deploy to GitHub Pages (free)

1. In your repo, replace these exact files: `index.html`, `css/base.css` (this replaces the old `css/style.css` — delete the old one if it's still in the repo), and all 5 files in `js/`.
2. Delete any old JS files from the previous version that aren't listed above, if present (e.g. `loops.js` is no longer used).
3. Commit. GitHub Pages rebuilds automatically within a minute or two.

## Notes on the redesign

This replaces the previous light "industrial paper" theme with a dark technical console aesthetic — animated node-graph hero, expandable case cards with problem/intervention/result structure, a system map with live status indicators, and a redesigned lab section with clearer risk-status panels. All original content and metrics are preserved; only presentation changed.


## Review patch notes

This reviewed version corrects the email address, adds the resume PDF asset/link, removes unsupported or risky claim phrasing, adjusts SKU wording to distinguish active SKUs from tracked items, and replaces the architecture list with an actual interactive node-board/detail panel.
