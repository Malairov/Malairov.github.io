# v70 Master Polish Log

This file is the persistent decision record. Later passes must preserve completed improvements unless a documented regression requires a change.

## Baseline locked: v68

Preserved facts and controls:

- Three public case studies
- Correct email: `pavlomalairov@gmail.com`
- 1,800+ tracked records, including 1,500+ active standardized SKUs
- Five buildings, 17 vending systems, 30+ suppliers
- Manual review reduced from roughly five hours to roughly thirty minutes
- SmartC role boundary: project and delivery governance, not engineering authorship
- Mobile navigation, keyboard controls, reduced-motion support, canonical URLs, sitemap, and legacy SmartC path protection

## Pass 1 - Strategic positioning and information architecture

Completed:

- Reduced role positioning to Technical Operations, Implementation, and Operations Project Management
- Removed transition language, PMP self-justification, and repeated hiring-manager explanations
- Rebuilt homepage order: Hero -> proof -> selected work -> approach -> background -> credentials -> contact
- Moved case studies immediately after the first proof layer
- Reduced hero information units and removed large chip collections

Protected decision:

- Homepage must show proof before explanation.
- Do not reintroduce standalone “Fit”, “Hiring-manager scan”, or “Portfolio structure” sections.

## Pass 2 - Royal / quiet-luxury visual system

Completed:

- Replaced rounded SaaS components with editorial rules and low-radius geometry
- Removed glow, radial-gradient, pill-navigation, and universal hover-lift language
- Added warm ivory canvas, deep navy, restrained burgundy, and darkened brass
- Added serif display typography with neutral sans-serif body typography
- Created asymmetrical 12-column compositions and varied vertical rhythm
- Promoted Aerospace as the featured case rather than using three equal cards
- Limited ornamental behaviour to fine rules, monogram, measured spacing, and case-specific composition

Protected decision:

- Brass is a ceremonial accent, not a default text colour.
- Cards are used only for distinct objects, not every paragraph.

## Pass 3 - Case-study narrative and interaction

Completed:

- Aerospace: situation -> mandate -> interactive control system -> management decisions -> outcomes -> transferability
- AI: one role-boundary statement, one architecture interaction, one climate-pilot management episode, no repeated system visualisations
- Diagnostic: repositioned from Excel repair to operational control assurance
- Added evidence notes and clarified scale, action, outcome, and artifact types
- Limited each case to one primary interactive mechanism

Protected decision:

- No repeated defensive engineering disclaimer.
- No “strongest case”, “recruiter takeaway”, or instructions telling the reader what to think.

## Pass 4 - Conversion and trust

Completed:

- Added Open Graph images for homepage and cases
- Added JSON-LD Person and CreativeWork data
- Added legacy SmartC URL redirect
- Added custom 404, current sitemap, robots file, and deployment instructions

Protected decision:

- Correct email and LinkedIn URL must remain consistent across all files.

## Pass 5 - Accessibility, mobile, and motion

Completed:

- Skip links, semantic headings, 44px primary targets, visible focus behaviour
- Keyboard-operable menus and interactive case controls
- Escape-to-close mobile navigation
- Text alternatives for every interactive visual through persistent detail panels
- Responsive layouts for 320px through desktop widths
- `prefers-reduced-motion` support
- Removed global scroll-reveal concealment; content is visible by default
- Motion limited to meaningful state transitions inside case interactions

Protected decision:

- No scroll hijacking, bounce, parallax, or motion required to access content.
- Core content must remain visible before JavaScript and without scrolling-triggered animation.

## Remaining external upgrades

These are outside the static source package rather than unfinished page work:

- Purchase and connect a custom domain
- Add privacy-conscious analytics after the site is live
- Validate real Core Web Vitals after deployment
- Optionally replace system serif with a licensed editorial typeface

## Privacy and distribution control — v69.1

- Removed the standalone employment-history page and downloadable career document from the public package.
- Removed all header, hero, case-page, footer, sitemap, and deployment references to those files.
- Preserved only direct email and LinkedIn contact paths.
- Protected decision: the portfolio demonstrates capability through selected work; detailed employment documents are shared privately at the owner’s discretion.

## Pass 6 — v70 factual precision and privacy regression

Completed:

- Re-established v69.1 as the protected baseline and physically removed a reintroduced standalone employment page and downloadable career document.
- Corrected the deployment instructions that still referenced deleted files.
- Added a permanent static regression rule that fails if a résumé-related filename or public link reappears.
- Refined employer/client wording to “sole on-site supplier representative.”
- Removed the unsupported Power BI tool claim.
- Replaced weak or defensive phrasing such as “role boundary,” “why this is evidence,” and repeated engineering disclaimers with precise delivery-remit and management-capability language.
- Tightened homepage positioning around operating controls, ownership, and decision-ready evidence.

Protected decision:

- No public employment-history document or downloadable career document may be added to this package.
- The website demonstrates capability through selected work; detailed documents remain privately controlled.
- Employer, client, and engineering-accountability boundaries must remain explicit without sounding defensive.

## Pass 7 — semantic interaction and inclusive behaviour

Completed:

- Added semantic breadcrumbs and focusable main landmarks.
- Upgraded all three case interactions to complete tablist, tab, and tabpanel patterns.
- Added roving tabindex and Arrow, Home, and End navigation.
- Added mobile-menu inert state, focus transfer, focus trapping, Escape restoration, outside-click closure, and body scroll locking.
- Added meaningful current-section state on the homepage and a restrained case-reading progress indicator.
- Added visible mobile table labels, no-JavaScript navigation fallback, increased-contrast support, forced-colour support, and print handling.
- Added polite atomic announcements for dynamically updated case panels and explicit button types across every interaction.
- Preserved primary evidence in the HTML so JavaScript enhances rather than creates essential content.

Protected decision:

- Interactive polish must never make essential evidence dependent on pointer input, animation, or JavaScript.
- Every interaction must retain a clear selected state, keyboard path, visible focus, and persistent textual explanation.

## Pass 8 — metadata, identity, and technical trust

Completed:

- Expanded Open Graph and Twitter metadata for homepage and all indexed cases.
- Rebuilt four 1200×630 social-preview images as one coherent editorial system.
- Added favicon and Apple touch icon assets.
- Strengthened Person and CreativeWork JSON-LD.
- Standardized v70 cache keys, root-safe 404 behaviour, and legacy redirect behaviour.
- Added consistent author, locale, theme, referrer, image-dimension, and image-alt metadata.

Protected decision:

- Social-preview artwork must match the live page title and visual identity.
- Search and sharing metadata must not expose private documents or add claims absent from the visible case content.

## Pass 9 — responsive composition and interaction economy

Completed:

- Validated 1440px, 820px, 390px, and 320px layouts in Chromium.
- Confirmed zero horizontal overflow and zero uncaught JavaScript errors at all protected widths.
- Kept homepage and case proof metrics compact in two-column mobile grids.
- Removed the duplicate desktop Contact navigation item while preserving Contact inside the mobile menu and as the single desktop header action.
- Added visible styling for `aria-current` section and case-navigation states.
- Converted outcome tables into labelled mobile records.
- Compacted the AI readiness-state interaction into a two-column mobile composition with the final validation state spanning the full width.
- Re-ran keyboard, click, menu, active-navigation, and reading-progress tests after the visual change.

Protected decision:

- Mobile compression may reduce vertical repetition but may not reduce readability, target size, or evidence clarity.
- Aerospace control tabs remain single-column on mobile because their longer labels benefit from full-width scanning.

## Pass 10 — persistent quality system and saturation review

Completed:

- Added `tools/qa_portfolio.py` for repeatable static, privacy, metadata, asset, link, sitemap, semantic, and JavaScript checks.
- Added `tools/browser_qa.py` for repeatable Chromium layout and interaction regression checks.
- Extended link validation to indexed pages, the legacy redirect, and the custom 404 page.
- Added source-size budgets, duplicate-ID checks, heading-order checks, safe new-tab validation, explicit-button checks, and external-runtime-dependency checks.
- Added no-JavaScript, WCAG text-spacing, forced-colour, responsive Contact hierarchy, and active-navigation-state browser checks.
- Added the `.nojekyll` marker to protect direct static publication on GitHub Pages.
- Completed line-by-line content review, repetition analysis, desktop/mobile visual review, and full regression testing.

Saturation result:

- Further static-source changes now carry more regression risk than likely hiring-value gain.
- Remaining meaningful upgrades depend on external evidence or live infrastructure: a custom domain, real anonymized artifacts, third-party recommendations, live Core Web Vitals, and device-level assistive-technology validation.
- The current package is the maximum defensible refinement of the available material without inventing evidence, overstating authority, or adding decorative complexity.

Protected decision:

- Do not add content merely to increase perceived sophistication.
- Future changes require new evidence, a measurable usability issue, a factual correction, or live analytics—not aesthetic novelty alone.
