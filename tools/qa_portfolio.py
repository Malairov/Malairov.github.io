#!/usr/bin/env python3
"""Static regression checks for the public portfolio package."""
from __future__ import annotations

from pathlib import Path
from urllib.parse import urlparse
import json
import re
import subprocess
import sys
from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_PAGES = [
    ROOT / "index.html",
    ROOT / "cases/four-operating-loops.html",
    ROOT / "cases/ai-transportation-delivery.html",
    ROOT / "cases/safety-stock-diagnostic.html",
]
ALL_HTML = PUBLIC_PAGES + [ROOT / "404.html", ROOT / "cases/smartc-ai-delivery.html"]
EXPECTED_EMAIL = "pavlomalairov@gmail.com"
FORBIDDEN_EMAIL = "pavmalairov@gmail.com"
EXPECTED_SITEMAP = {
    "https://malairov.github.io/",
    "https://malairov.github.io/cases/four-operating-loops.html",
    "https://malairov.github.io/cases/ai-transportation-delivery.html",
    "https://malairov.github.io/cases/safety-stock-diagnostic.html",
}

errors: list[str] = []
notes: list[str] = []

def fail(message: str) -> None:
    errors.append(message)


def check_source_budgets() -> None:
    budgets = {
        ROOT / "css/site.css": 60_000,
        ROOT / "js/site.js": 35_000,
    }
    for path, limit in budgets.items():
        if path.stat().st_size > limit:
            fail(
                f"Source budget exceeded for {path.relative_to(ROOT)}: "
                f"{path.stat().st_size} > {limit} bytes"
            )
    for page in PUBLIC_PAGES:
        if page.stat().st_size > 50_000:
            fail(
                f"HTML source budget exceeded for {page.relative_to(ROOT)}: "
                f"{page.stat().st_size} > 50000 bytes"
            )

def local_target(page: Path, href: str) -> Path | None:
    parsed = urlparse(href)
    if parsed.scheme or href.startswith("mailto:") or href.startswith("tel:") or href.startswith("#"):
        return None
    path = parsed.path
    if not path:
        return None
    if path.startswith("/"):
        return ROOT / path.lstrip("/")
    return (page.parent / path).resolve()

check_source_budgets()

# Privacy/distribution controls.
for forbidden in [ROOT / "resume.html", ROOT / "assets/Pavlo-Malairov-PMP-Resume.pdf"]:
    if forbidden.exists():
        fail(f"Forbidden public career document exists: {forbidden.relative_to(ROOT)}")
for p in ROOT.rglob("*"):
    if p.is_file() and "resume" in p.name.lower():
        fail(f"Forbidden résumé-related filename exists: {p.relative_to(ROOT)}")
    if p.is_file() and p.suffix.lower() in {".html", ".xml", ".txt", ".md", ".js", ".css"}:
        text = p.read_text(errors="ignore")
        if FORBIDDEN_EMAIL in text:
            fail(f"Incorrect email found in {p.relative_to(ROOT)}")
        if re.search(r'href=["\'][^"\']*(?:resume\.html|Pavlo-Malairov-PMP-Resume\.pdf)', text, re.I):
            fail(f"Public résumé link found in {p.relative_to(ROOT)}")

for page in PUBLIC_PAGES:
    if not page.exists():
        fail(f"Missing public page: {page.relative_to(ROOT)}")
        continue
    soup = BeautifulSoup(page.read_text(), "html.parser")
    if soup.html.get("lang") != "en":
        fail(f"Missing or incorrect language on {page.relative_to(ROOT)}")
    if len(soup.find_all("h1")) != 1:
        fail(f"Expected exactly one H1 on {page.relative_to(ROOT)}")
    if not soup.find("title") or not soup.title.get_text(strip=True):
        fail(f"Missing title on {page.relative_to(ROOT)}")
    for attrs, label in [
        ({"name": "description"}, "meta description"),
        ({"rel": "canonical"}, "canonical link"),
        ({"property": "og:title"}, "Open Graph title"),
        ({"property": "og:description"}, "Open Graph description"),
        ({"property": "og:image"}, "Open Graph image"),
        ({"name": "twitter:image"}, "Twitter image"),
    ]:
        if not soup.find(attrs=attrs):
            fail(f"Missing {label} on {page.relative_to(ROOT)}")
    if not soup.find("a", class_="skip-link"):
        fail(f"Missing skip link on {page.relative_to(ROOT)}")
    main = soup.find("main", id="main")
    if not main or main.get("tabindex") != "-1":
        fail(f"Main landmark is not focusable on {page.relative_to(ROOT)}")
    ids = [node.get("id") for node in soup.find_all(id=True)]
    duplicates = sorted({value for value in ids if ids.count(value) > 1})
    if duplicates:
        fail(f"Duplicate IDs on {page.relative_to(ROOT)}: {duplicates}")
    heading_levels = [int(node.name[1]) for node in soup.find_all(re.compile(r"^h[1-6]$"))]
    for previous, current in zip(heading_levels, heading_levels[1:]):
        if current > previous + 1:
            fail(
                f"Heading level skips from H{previous} to H{current} on "
                f"{page.relative_to(ROOT)}"
            )
    for button in soup.find_all("button"):
        if not button.get("type"):
            fail(f"Button without explicit type on {page.relative_to(ROOT)}")
        if not button.get_text(" ", strip=True) and not button.get("aria-label"):
            fail(f"Unlabelled button on {page.relative_to(ROOT)}")
    for image in soup.find_all("img"):
        if image.get("alt") is None:
            fail(f"Image without alt text on {page.relative_to(ROOT)}: {image.get('src')}")
    runtime_assets = list(soup.find_all("script", src=True))
    runtime_assets.extend(
        link
        for link in soup.find_all("link", href=True)
        if set(link.get("rel") or [])
        & {"stylesheet", "preload", "modulepreload", "icon", "apple-touch-icon"}
    )
    for asset in runtime_assets:
        ref = asset.get("href") or asset.get("src") or ""
        if urlparse(ref).scheme in {"http", "https"}:
            fail(f"External runtime dependency on {page.relative_to(ROOT)}: {ref}")
    if EXPECTED_EMAIL not in page.read_text():
        fail(f"Expected contact email missing from {page.relative_to(ROOT)}")
    # Public assets use the v70 cache key consistently.
    stylesheet = soup.find("link", rel="stylesheet")
    if not stylesheet or "?v=70" not in (stylesheet.get("href") or ""):
        fail(f"Stylesheet cache key is not v70 on {page.relative_to(ROOT)}")
    script = soup.find("script", src=re.compile(r"site\.js"))
    if not script or "?v=70" not in (script.get("src") or ""):
        fail(f"JavaScript cache key is not v70 on {page.relative_to(ROOT)}")
    # JSON-LD must parse.
    for ld in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            json.loads(ld.string or "")
        except json.JSONDecodeError as exc:
            fail(f"Invalid JSON-LD in {page.relative_to(ROOT)}: {exc}")
    for link in soup.find_all("a", target="_blank"):
        rel = set(link.get("rel") or [])
        if not {"noopener", "noreferrer"}.issubset(rel):
            fail(f"Unsafe new-tab link in {page.relative_to(ROOT)}: {link.get('href')}")


# Validate links and local assets on public, redirect, and error pages.
for page in ALL_HTML:
    if not page.exists():
        fail(f"Missing HTML page: {page.relative_to(ROOT)}")
        continue
    soup = BeautifulSoup(page.read_text(), "html.parser")
    for tag, attr in [("a", "href"), ("link", "href"), ("script", "src"), ("img", "src")]:
        for node in soup.find_all(tag):
            ref = node.get(attr)
            if not ref:
                continue
            target = local_target(page, ref)
            if target is not None:
                if target.is_dir():
                    target = target / "index.html"
                if not target.exists():
                    fail(f"Broken local reference in {page.relative_to(ROOT)}: {ref}")

# Tab semantics.
for page in PUBLIC_PAGES[1:]:
    soup = BeautifulSoup(page.read_text(), "html.parser")
    for tablist in soup.find_all(attrs={"role": "tablist"}):
        tabs = tablist.find_all(attrs={"role": "tab"})
        if not tabs:
            fail(f"Empty tablist in {page.relative_to(ROOT)}")
        selected = [t for t in tabs if t.get("aria-selected") == "true"]
        if len(selected) != 1:
            fail(f"Tablist must have one selected tab in {page.relative_to(ROOT)}")
        for tab in tabs:
            panel_id = tab.get("aria-controls")
            panel = soup.find(id=panel_id) if panel_id else None
            if not tab.get("id") or not panel_id or not panel:
                fail(f"Incomplete tab relationship in {page.relative_to(ROOT)}")
                continue
            if panel.get("role") != "tabpanel":
                fail(f"Controlled element is not a tabpanel in {page.relative_to(ROOT)}")
            if panel.get("aria-live") != "polite" or panel.get("aria-atomic") != "true":
                fail(f"Dynamic tabpanel is not announced accessibly in {page.relative_to(ROOT)}")

# Images and social cards.
for name in ["og-home.png", "og-aerospace.png", "og-ai.png", "og-diagnostic.png"]:
    path = ROOT / "assets" / name
    if not path.exists():
        fail(f"Missing social image: assets/{name}")
    else:
        with Image.open(path) as image:
            if image.size != (1200, 630):
                fail(f"Incorrect social image dimensions for {name}: {image.size}")
for name in ["favicon.svg", "apple-touch-icon.png"]:
    if not (ROOT / "assets" / name).exists():
        fail(f"Missing brand icon: assets/{name}")

# GitHub Pages must publish the package as an unprocessed static site.
if not (ROOT / ".nojekyll").exists():
    fail("Missing .nojekyll static-site marker")

# Sitemap exactness.
sitemap_text = (ROOT / "sitemap.xml").read_text()
urls = set(re.findall(r"<loc>(.*?)</loc>", sitemap_text))
if urls != EXPECTED_SITEMAP:
    fail(f"Sitemap URLs do not match public pages: {sorted(urls)}")

# JS syntax.
result = subprocess.run(["node", "--check", str(ROOT / "js/site.js")], capture_output=True, text=True)
if result.returncode:
    fail(f"JavaScript syntax error: {result.stderr.strip()}")

# Deployment file must not instruct users to deploy removed documents.
deploy = (ROOT / "DEPLOY_INSTRUCTIONS.txt").read_text()
if "resume.html" in deploy or "Pavlo-Malairov-PMP-Resume.pdf" in deploy:
    fail("Deployment instructions still reference a removed career document")

if errors:
    print("PORTFOLIO QA: FAIL")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("PORTFOLIO QA: PASS")
print(f"- Public pages checked: {len(PUBLIC_PAGES)}")
print("- Privacy controls: no public résumé HTML/PDF and no public résumé links")
print(f"- Internal links/assets: valid across {len(ALL_HTML)} HTML files")
print("- Metadata/JSON-LD/social images: valid")
print("- Semantic structure and source-size budgets: valid")
print("- Tab semantics and JavaScript syntax: valid")
