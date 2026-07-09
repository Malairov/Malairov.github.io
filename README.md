# Portfolio v64 SmartC Actualization + Timeline + LinkedIn URL — Pavlo Malairov, PMP

Upload the CONTENTS of this folder to the GitHub Pages repository root.
css/, js/, and assets/ are unchanged from v61 — only HTML content, sitemap, and docs changed.

Content changes (v61 -> v63), AI Transportation Delivery case + homepage:
- Removed the unverified "recovery / redesigned product" narrative everywhere.
  The case is now framed around the real, validated three-phase program:
  Phase 1 (2022): AI-enabled pedestrian crossing detection system — prototype, city pilot, scaled deployment.
  Phase 2 (2023–2024): equipment-monitoring platform for deployed field units.
  Phase 3 (2024–2025): micromobility (e-scooter) violation-detection module.
- Corrected contributor metric: ~7 -> ~11 (previous ~17 was flagged as inflated; validated peak 8–11).
- Replaced "30–40 day cycles" with validated delivery method: sprint-based cycles in Jira,
  MS Project baseline early on, weekly sponsor-facing syncs.
- "Change visibility" control upgraded to the real sponsor-controlled change board,
  with decision packages + impact analysis prepared by the PM.
- Removed jurisdiction-specific "T7 signal elements" token (replaced with neutral
  "flashing warning beacons").
- Added program duration "just under three years (2022–2025)".
- Homepage: case card, AI-delivery metric card, and duplicate hero chip updated to match.
- Old /cases/smartc-ai-delivery.html path kept as noindex mirror with canonical to the new URL.
- sitemap lastmod bumped to 2026-07-08. robots.txt and 404.html unchanged.

Guardrails preserved:
- No visible SmartC in any HTML. No client, jurisdiction, or country references.
- No company-scale metrics (no 460+ locations, no budget figures, no accident-% claims).
- Role boundary intact: delivery leadership and implementation governance, no engineering authorship.
- No public resume download. Conservative, verifiable metrics only.

v63 -> v64:
- LinkedIn URL replaced everywhere (header, footer, CTA on all 5 pages):
  /in/pavlo-malairov-b51840219 -> /in/pavlomalairov (15 occurrences).
- Native SVG phase timeline added to the AI Transportation case (Program phases section):
  three phase bars 2022–2025 with milestone markers (city pilot, scaled deployment,
  platform client testing, detection validation) and a tools footnote.
  Implemented as inline SVG in site palette; page-scoped <style> only, base.css untouched.
  Mobile: horizontal scroll (min-width 640px) so label text stays legible.
- noindex mirror (smartc-ai-delivery.html) regenerated from the updated page.

v64 -> v65:
- Interactive system walkthrough added to the AI Transportation case (top of System view section):
  play button runs a Detect -> Decide -> Warn -> Capture cycle (car decelerates, pedestrian
  crosses, projected marking illuminates, beacon flashes, event archived); five clickable
  pole components map to the delivery streams. Native inline SVG + page-scoped CSS/JS,
  zero libraries, zero raster images, mobile horizontal scroll, prefers-reduced-motion
  and keyboard access supported. base.css / js files untouched.
