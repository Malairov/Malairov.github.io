# PROGRESS — Pavlo Malairov portfolio

## Current version: v74 (2026-07-10)

## Scores (0–100, honest, re-audited every iteration)
Factual integrity: 99 · Metric consistency: 99 · Positioning: 98 · Typography: 99 ·
Color/aesthetic: 99 · Motion/interaction: 99 · IA/navigation: 99 · Accessibility: 99 ·
Performance: 99 · SEO/meta: 99 · Recruiter path: 99 · Page balance: 98

## LOCKED (successful elements — never regress or redesign these)
- Brand spine: “I build the operating controls behind complex technical delivery.” — strongest concise positioning; locked since v71.
- Public anonymity: unnamed AI program/company/jurisdiction and unnamed aerospace client — mandatory privacy and factual guardrail.
- No public résumé file; “Full CV and references are available on request.” — explicit user preference.
- Paper / ink / brass / burgundy / navy editorial system — restrained visual register; locked since v70.
- System serif display + quiet system sans body; no webfonts — performance and visual restraint.
- Five-tier type scale: label, body, lead, section, display; display type remains within the approved desktop/mobile limits.
- No gradients, glow, stock imagery, AI imagery, or raster content images.
- One meaningful interactive per case, native HTML/SVG, keyboard-operable, and reduced-motion safe.
- Homepage sequence: positioning → evidence → selected work → operating approach → career arc → credentials → contact.
- Three-case structure and order: Aerospace Service Delivery Controls → AI Transportation Implementation → Operational Control Failure Diagnostic.
- Next/previous case navigation, direct case inquiry path, and old AI URL noindex redirect.
- AI factual baseline: one city pilot; validated team range; Microsoft Project Phase 1; Jira Scrum Phases 2–3; debunked narratives and restricted company-scale claims remain excluded.
- Metric pairing: 1,800+ catalog items / 1,500+ active.
- Diagnostic chain confirmed directly by Pavlo: five stages (source input → Power Query → formula logic → VBA automation → review filter), zero acceptable unexplained exclusions as a control standard, four core demand-history scenarios (null / zero / sparse / mature), abnormal states routed to exception review, and one central exception-review queue.
- Visible footer copy is limited to “© 2026 Pavlo Malairov, PMP.”; minimal utility links such as Privacy are permitted. Confidentiality language appears only where it explains a specific reconstructed case artifact.

## CHANGED THIS ITERATION
- Files changed: index.html; privacy.html; 404.html; cases/four-operating-loops.html; cases/ai-transportation-delivery.html; cases/safety-stock-diagnostic.html; cases/smartc-ai-delivery.html; css/site.css; js/site.js; sitemap.xml; PROGRESS.md; _config.yml; .nojekyll removed.
- Removed the public AI product name from production-facing page copy; the public phase wording is now "Pedestrian-warning system." The legacy noindex redirect filename remains because the validated fact sheet requires that old URL to keep redirecting.
- Preserved validated AI facts: one city pilot, ~7 to ~11 team range, Microsoft Project in Phase 1, Jira Scrum in Phases 2-3, three rejected Phase 1 change requests, weekly sponsor syncs, LED sign glare, wind-related camera displacement, winter adaptations, product/site adaptation separation, and sponsor-controlled approval governance.
- AI case body copy reduced from 855 to 787 words in this pass, primarily by trimming repeated uses of control, evidence, readiness, visible, delivery, governance, explicit, and operating while keeping role boundaries and validated facts.
- Exact case CTA changes: all three case inquiry labels now read "Discuss an opportunity"; the case paragraphs are first-person and use the approved wording for aerospace, AI, and diagnostic opportunities; all CTA buttons still read "Discuss an opportunity" and keep the existing mailto subject.
- Added Cloudflare Web Analytics as a dynamic loader in site.js, not as unconditional static script tags. The loader runs only after the owner opt-out check and only when a real token replaces `YOUR_CLOUDFLARE_WEB_ANALYTICS_TOKEN`; analytics is inactive until that replacement happens. No secret token was added. 404 and the old noindex redirect do not include analytics.
- Added owner analytics opt-out: `?analytics=off` stores `localStorage["pm_portfolio_analytics_opt_out"] = "1"`, removes only the analytics parameter with history.replaceState, preserves other valid parameters such as ref, does not reload, and does not show UI. `?analytics=on` removes the localStorage value and cleans only the analytics parameter; analytics can resume on the next normal page load after a real token is configured.
- Private owner instructions: disable analytics in the current browser with `https://malairov.github.io/?analytics=off`; re-enable analytics in the current browser with `https://malairov.github.io/?analytics=on`.
- Owner opt-out limitations: opt-out is specific to the current browser profile; it must be activated separately on every browser and device; clearing site data removes it; private/incognito mode has separate storage; previous visits cannot be removed retroactively.
- Added semantic analytics hooks only: `data-analytics-page`, `data-analytics-event`, `data-analytics-case`, and `data-analytics-location` for page identity and trackable links. These attributes are hooks only and do not currently provide custom click-event reports. No fake custom-event emitter, Google Analytics, Meta Pixel, LinkedIn Insight Tag, Hotjar, Microsoft Clarity, cookies, fingerprinting, or visitor identification was added.
- Added optional `ref` query handling in site.js: accepts only letters, numbers, hyphens, and underscores up to 64 characters; ignores malformed values; does not store values; keeps ref out of canonical, Open Graph, sitemap, and JSON-LD URLs; preserves valid ref values only on marked internal case, return, and Privacy links.
- Added privacy.html using the existing v73 design system, metadata, canonical URL, favicon/social image references, current CSS/JS, no new visual features, and no internal project facts. Added privacy.html to sitemap.xml.
- Footer change: every production content footer keeps the exact visible copyright text "© 2026 Pavlo Malairov, PMP." and now includes only one minimal Privacy link.
- Deployment hygiene: `_config.yml` excludes PROGRESS.md from GitHub Pages and `.nojekyll` was removed so GitHub Pages can honor the exclusion; robots.txt still disallows PROGRESS.md. No branch or /docs restructuring was performed.
- Release hygiene: public build markers and CSS/JS cache-busting query strings now use v74 while preserving the locked v73 visual system. Added a narrow proof-list wrapping safeguard in css/site.css to prevent a 1024px hero-sidebar label from creating horizontal overflow.
- QA results: local parser/link validation passed across 404.html, index.html, privacy.html, all three case pages, and the legacy redirect; 107 local references checked, 0 missing targets, 0 missing anchors, 0 ref values in metadata, 0 static Cloudflare script tags, and 0 data-cf-beacon attributes.
- QA results: Chrome validation passed across 360px, 390px, 768px, 1024px, and 1440px in normal and prefers-reduced-motion modes; 70 page/viewport/motion combinations checked, 0 horizontal-overflow failures, 0 browser console errors, 0 unexpected Cloudflare requests, 0 bad v74 build markers, 0 reduced-motion mismatches, and 0 footer-copy failures.
- QA results: analytics opt-out network verification confirmed `?analytics=off` sets the local opt-out, removes only the analytics parameter, preserves ref, and makes no request to static.cloudflareinsights.com, including when the script is tested with a simulated real Cloudflare token. Placeholder-token visits also make no beacon request. A simulated real-token normal visit injected the beacon after the opt-out check and requested static.cloudflareinsights.com once. `?analytics=on` removed the local opt-out, preserved ref, cleaned only the analytics parameter, and did not count that activation visit.
- QA results: keyboard validation passed for mobile menu open/close, Escape-to-close, focus return, and Arrow/Home/End tab behaviour across all three case interactives.
- QA results: JavaScript syntax passed via `node --check js/site.js`; reduced-motion remains implemented by CSS media query and the JS animation guard.
- Restricted-term results: no remaining non-git content matches for the prohibited company, client, jurisdiction, product-name, debunked-metric, public-resume, or obsolete CTA/footer phrases listed in the request. One filename-only match remains for the locked legacy noindex redirect path required by the fact sheet.
- Remaining limitations: Cloudflare analytics uses a placeholder token until Pavlo inserts the real token, so live production beacon loading with the real production token should still be reverified after that configuration. External link HEAD checks could not complete in this local PowerShell/curl environment because TLS credential handling failed, so external endpoints were not independently confirmed from the shell.

## REJECTED IDEAS (do not re-propose)
- Public résumé download or public CV file — explicitly rejected by Pavlo.
- Full redesign — the current system is successful and locked.
- Webfonts — no verified cross-platform defect justifies the performance and consistency trade-off.
- Stock photography, AI imagery, decorative node maps, dark cyber panels, gradients, glow, parallax, particles, autoplay carousels, marquees, badge walls, skill bars, loud hover effects, or multiple interactives per page.
- Reintroducing any company/client/jurisdiction identifiers or any narrative, metric, team size, budget, cycle length, or technical claim listed as debunked in the validated fact sheet.
- Additional sections or features without observed recruiter behaviour supporting them.

## NEXT (max 3 items, highest impact first)
1. Deploy the current production build after approval.
2. Insert the real Cloudflare Web Analytics token only when ready, then verify normal beacon loading and owner opt-out behaviour on the live site.
3. Verify the live build marker, locked headline, all three case URLs, Privacy page, PROGRESS.md exclusion, and current CSS/JS requests after GitHub Pages completes deployment.

## OPEN QUESTIONS FOR PAVLO
- None.
