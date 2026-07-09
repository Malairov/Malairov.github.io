# v70 Master Polish — Final QA Record

## Content and factual control

- [x] Correct email used throughout: `pavlomalairov@gmail.com`
- [x] MSC employment is not presented as client employment
- [x] Aerospace client identity remains generic on the public portfolio
- [x] SmartC delivery governance is separated from engineering authorship
- [x] Lean Six Sigma Green Belt remains “in progress”
- [x] No SQL or Power BI claim
- [x] Metrics use conservative or approximate language where required
- [x] Homepage and case language reviewed for repeated, defensive, and recruiter-directed wording

## Privacy and distribution control

- [x] No standalone employment-history page exists
- [x] No downloadable career-document PDF exists
- [x] No filename in the package contains `resume`
- [x] No HTML, sitemap, deployment file, or internal link exposes a removed career document
- [x] Contact remains available through email and LinkedIn only
- [x] Deployment instructions require a full repository replacement so deleted legacy files cannot remain publicly accessible

## Information architecture and editorial hierarchy

- [x] Selected work appears directly after hero proof
- [x] Homepage contains no repeated hiring-manager explanation sections
- [x] Aerospace is treated as the featured Canadian case
- [x] Every case follows a distinct management narrative
- [x] Each case uses one primary interaction rather than repeated representations
- [x] Mobile AI architecture uses a compact two-column readiness-state layout

## Accessibility and interaction

- [x] Exactly one H1 per indexed page
- [x] Skip link on all indexed pages
- [x] Main landmark is programmatically focusable
- [x] Semantic breadcrumb navigation on case pages
- [x] Full tablist, tab, and tabpanel relationships on all case interactions
- [x] Dynamic tabpanels use polite, atomic announcements
- [x] Roving tabindex with Arrow, Home, and End keyboard support
- [x] Visible focus indicators and 44px primary interactive targets
- [x] Mobile navigation is inert while closed
- [x] Desktop header uses one Contact action; Contact remains available inside the mobile menu
- [x] Mobile navigation traps focus, closes by link/outside click/Escape, and restores focus
- [x] Reduced-motion, increased-contrast, forced-colour, and no-JavaScript fallbacks
- [x] Mobile tables expose row labels rather than hiding column meaning
- [x] Core case evidence exists in HTML before JavaScript runs

## Technical, search, and sharing

- [x] Canonical URL on every indexed page
- [x] Unique title and meta description on every indexed page
- [x] Open Graph and Twitter metadata on homepage and cases
- [x] Four 1200×630 social-preview images validated
- [x] Favicon and Apple touch icon included
- [x] JSON-LD Person and CreativeWork data parses correctly
- [x] Sitemap contains exactly the four indexed public URLs
- [x] Robots file references the sitemap
- [x] Legacy SmartC URL redirects and remains noindex
- [x] Custom 404 page uses root-safe paths
- [x] CSS and JavaScript use the v70 cache key consistently
- [x] Active section and case-navigation states are visibly styled
- [x] Every button has an explicit type and every new-tab link has safe rel attributes
- [x] CSS, JavaScript, and HTML remain within defined source-size budgets
- [x] `.nojekyll` static-site marker included
- [x] JavaScript passes `node --check`

## Automated regression results

### Static suite

Command:

```bash
python tools/qa_portfolio.py
```

Result: **PASS**

- Four indexed pages checked
- Six HTML files checked for internal links and assets
- Privacy controls passed
- Metadata, JSON-LD, icons, social images, sitemap, tab semantics, heading order, button semantics, source budgets, and JavaScript syntax passed

### Chromium browser suite

Command:

```bash
python tools/browser_qa.py
```

Result: **PASS**

Protected viewport widths:

- 1440px
- 820px
- 390px
- 320px

Validated:

- five rendered surfaces, including the 404 page
- no horizontal overflow
- no uncaught JavaScript errors
- mobile-menu focus and Escape behaviour
- responsive Contact-action hierarchy
- homepage current-section navigation and visible underline state
- keyboard and click activation for all three case interactions
- reading-progress behaviour on case pages
- no-JavaScript access to navigation and core case evidence
- WCAG text-spacing resilience at 320px
- forced-colour structural resilience

## Visual regression review

- [x] Homepage reviewed at desktop, tablet, mobile, and small-mobile widths
- [x] Aerospace case reviewed at all four protected widths
- [x] AI case reviewed at all four protected widths
- [x] Diagnostic case reviewed at all four protected widths
- [x] Typography, spacing, proof grids, mobile tables, panels, and interaction states remain coherent
- [x] AI mobile architecture was compacted after visual review and revalidated

## Post-deployment checks that require the live environment

- [ ] Confirm GitHub Pages build succeeds after full replacement
- [ ] Confirm all canonical, icon, and social-image URLs load over HTTPS
- [ ] Refresh and inspect LinkedIn link preview
- [ ] Run Lighthouse against the deployed URL
- [ ] Check real Core Web Vitals after traffic is available
- [ ] Run VoiceOver on the deployed iPhone version
- [ ] Confirm old deleted career-document URLs return 404 after deployment
