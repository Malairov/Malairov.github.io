# Pavlo Malairov — Project Management Portfolio

A static, privacy-controlled portfolio focused on technical operations, implementation delivery, and operational control design.

## Public pages

- `index.html` — portfolio home
- `cases/four-operating-loops.html` — aerospace service-delivery controls
- `cases/ai-transportation-delivery.html` — AI transportation implementation
- `cases/safety-stock-diagnostic.html` — operational control failure diagnostic
- `cases/smartc-ai-delivery.html` — legacy noindex redirect
- `404.html` — custom not-found page

## Distribution model

The public site demonstrates capability through selected case studies. Detailed employment documents are not included and are shared privately at the owner’s discretion.

## Quality controls

Run the repeatable static regression suite before deployment:

```bash
python tools/qa_portfolio.py
```

The suite checks public-page metadata, all internal links, social images, tab semantics, JavaScript syntax, email consistency, sitemap accuracy, and the absence of public career-document files or links.

For optional layout and interaction regression testing in Chromium:

```bash
python tools/browser_qa.py
```

This second suite requires Playwright and checks 1440px, 820px, 390px, and 320px layouts, horizontal overflow, mobile-menu focus, keyboard tabs, current-section state, reading progress, no-JavaScript resilience, WCAG text spacing, and forced-colour rendering.

## Deployment

Upload the contents of this folder directly to the repository root. Remove the old repository contents first so deleted files cannot remain accessible under legacy URLs. Keep the included `.nojekyll` marker in the root so GitHub Pages publishes the package as an unprocessed static site.
