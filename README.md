# Pavlo Malairov Portfolio - v31 Final Readable Type Fix

## Purpose
This version fixes the visible issues from screenshots:
- large serif headings still appearing due to cached/stacked CSS;
- SmartC preview heading too huge;
- Four Operating Loops node cards visually colliding;
- old CSS cache not being reliably bypassed.

## Key technical fix
A new stylesheet is added and linked after the main CSS:
`css/v31-readable-fix.css?v=31`

This beats older cached/stacked styles and forces readable medium sans typography.

## Changed files
- index.html
- css/v31-readable-fix.css
- cases/*.html
- cases/four-operating-loops.html
- cases/smartc-ai-delivery.html
- README.md

## QA status
- JS syntax: passed.
- Local links: passed.
- Bad-term check: passed.
- v31 CSS linked: passed.

## Deployment
Upload root contents to the GitHub Pages repository root. Open `https://malairov.github.io/index.html?v=31`.
