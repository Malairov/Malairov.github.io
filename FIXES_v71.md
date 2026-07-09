# v71 — Factual integrity + premium fixes (2026-07-09)
Applied on top of the deployed v70.1 build. Design system untouched (css/site.css, js/site.js unchanged).

## P0 — factual corrections (cases/ai-transportation-delivery.html)
- Removed "460+ later installed locations" everywhere (proof strip + outcomes table). Company-scale metrics stay off the site by standing rule.
- Team scale corrected: ~7 -> ~17 replaced with ~7 -> ~11 (validated peak 8-11), in proof strip and outcomes table.
- "30-40d iterative delivery cycles" replaced with Jira sprint-based delivery cycles (validated method).
- Removed the recovery narrative: "01 / Recovery context" -> "01 / Program context"; "Program recovery" -> "Program control under ambiguity"; "recovery actions" -> "corrective actions".
- Replaced the invented "three climate tracks / South-Central-North" critical episode with the validated episode: one city pilot, live field conditions — night LED-glare vs camera (resolved by synchronizing detection with the sign cycle), winter freeze/cold-start/enclosure, real-road visibility tuning, and the PM decision separating product defects from field-adaptation packages. Same timeline markup skeleton, same design.
- Residual "climate" wording neutralized ("site and weather adaptations", "field conditions").

## P1 — positioning, consistency, metadata
- Title/og:title: "Technical Operations & Implementation Portfolio" -> "Technical Program & Implementation Delivery" (senior-PM positioning).
- Header tagline on all pages: "Technical operations · implementation" -> "Technical program delivery · implementation".
- Contact availability line updated to Project Management / Technical Program Delivery; added "Full CV and references are available on request."
- Index proof bar: "1,800+ tracked records" -> "1,800+ catalog records · 1,500+ active" (explicit catalog-vs-active pair; four-loops already shows both adjacent).
- JSON-LD Person schema added to index (name, PMP, jobTitle, sameAs LinkedIn, email).
- og:image:width/height verified present on all pages (index duplicate avoided).
- sitemap lastmod = 2026-07-09.

## Untouched by design
- Palette, typography (system serif stack), motion system, interactive widgets, prev/next case navigation, redirect stub, og images, favicon.
