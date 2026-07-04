# Portfolio v62 — Rainforest Orbital Redesign — Pavlo Malairov, PMP

Upload the CONTENTS of this folder to the GitHub Pages repository root.
Do NOT delete existing files that are not in this folder — css/base.css, js/app.js,
and the /cases/*.html pages are still used by the case studies and must remain.

## What changed (v61 → v62)
- index.html fully rebuilt as an immersive "rainforest orbital" journey:
  1 Orbital Hero · 2 Hiring Signal · 3 Career Constellation · 4 Proof Constellation ·
  5 Operating Control Model (interactive orbital map, signature element) ·
  6 Case Universe · 7 Role/Environment Fit · 8 Contact.
- New design system: css/cosmos.css (tokens: color, type, spacing, motion, z-layers).
- New js/cosmos.js: canvas starfield + bioluminescent fireflies, hero parallax,
  scroll reveals, journey progress dots, accessible tab panels (proof + model),
  mobile nav, mobile fallback strip for the control-model map.
- Fonts: Fraunces (display) + Instrument Sans (body) + JetBrains Mono (labels)
  via Google Fonts.
- base.css / app.js untouched — case pages keep working unchanged.
- sitemap lastmod bumped to 2026-07-04. robots.txt and 404.html unchanged.

## Accessibility & performance
- Skip link, visible focus states, aria tablist/tabpanel with aria-live panels,
  no hover-only information, prefers-reduced-motion disables canvas/parallax/
  animations entirely.
- No frameworks, no build step, no images — all visuals are CSS/SVG/canvas.
  Two small static assets total (~30 KB CSS+JS before gzip).

## Guardrails preserved
- No visible SmartC anywhere. No jurisdiction references. No public resume
  download. No company-scale metrics. Cache string v62 on css/js.
