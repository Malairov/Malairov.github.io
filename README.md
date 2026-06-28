# Pavlo Malairov — Interactive Operations Portfolio (v6)

Static site. No framework. Deploys on GitHub Pages from the repository root.

## Structure
- `index.html` — page structure (must stay in repo root)
- `css/base.css` — all styling, motion, and the v6 operating-loop visuals
- `js/data.js` — all content (metrics, architecture nodes, SKU flow, cases, diagnostic, timeline)
- `js/app.js` — all interaction logic, including the v6 animated loop system
- `assets/Pavlo_Malairov_Resume.pdf` — public resume (no phone number; email + LinkedIn only)

## What's new in v6
- The Four Operating Loops are now a live SVG system: a central "Operating System Core",
  four loop modules in a ring, three supporting modules (governance, intake, tracking),
  curved connector wires, traveling signal pulses, status LEDs, and a soft core pulse.
- Hover a node: related wires brighten. Click a node (or press Enter/Space): it locks active,
  related wires light, unrelated wires fade, and the right panel shows role, cadence,
  inputs, outputs, and why it matters.
- Node labels render as real SVG text (reliable across browsers).
- Respects `prefers-reduced-motion`: pulses and the core pulse stop, reveals show instantly.
- Keyboard accessible: each node is focusable and activatable.

## Deploy to GitHub Pages
1. Put these files in the repository root (not a subfolder): `index.html`, `css/`, `js/`, `assets/`.
2. Replace any old files (e.g. delete a stray root-level `base.css`, `loops.js`, `style.css`,
   or any duplicate JS from earlier versions — they are not used).
3. Settings → Pages → Source: `main` branch, `/ (root)`.
4. Live within a minute or two at your Pages URL.

## Privacy
- The resume PDF contains no phone number — public contact is email + LinkedIn only.
- The aerospace client is not named. Maritime is framed generically (no ships, owners, ports, flags).

## Tradeoffs / limitations
- The architecture animation uses SVG `animateMotion` + CSS, no WebGL, so it stays fast and
  has no heavy dependency. If a browser disables SMIL, the wires and nodes still render fully;
  only the moving pulse dots would be absent — comprehension is preserved without them.
- The hero command panel and KPI tiles use IntersectionObserver-driven reveals; these work in
  all current browsers.

## v7 additions
- Architecture: idle auto-cycle (loops highlight in sequence until you interact) and a
  "Replay system flow" guided tour that walks the 7-step path with captions. Respects
  prefers-reduced-motion (no auto-motion when reduced).
- SKU lifecycle flow: Previous / Next step controls, a branch point at the slot-decision
  step (fail → removed / pass → continue), and a weekly re-entry loopback note.
- Case library: each case now shows a "Proves …" badge (process architecture, root-cause
  diagnosis, governance under constraints, etc.).
- Diagnostic simulator: "Replay failure chain" button that lights each failure layer in
  sequence to show it was a multi-layer control failure, not one bad formula.
