#!/usr/bin/env python3
"""Optional Chromium regression checks for layout and interactions.

Requirements:
    pip install playwright beautifulsoup4
    playwright install chromium

The script also uses a system Chromium binary when one is available.
"""
from __future__ import annotations

from pathlib import Path
import shutil
import sys

from bs4 import BeautifulSoup

try:
    from playwright.sync_api import sync_playwright
except ImportError as exc:  # pragma: no cover - environment-dependent helper
    raise SystemExit(
        "Playwright is not installed. Run: pip install playwright && playwright install chromium"
    ) from exc

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / "css/site.css").read_text()
JS = (ROOT / "js/site.js").read_text()
PAGES = [
    "index.html",
    "cases/four-operating-loops.html",
    "cases/ai-transportation-delivery.html",
    "cases/safety-stock-diagnostic.html",
    "404.html",
]
VIEWPORTS = [
    ("desktop", 1440, 900),
    ("tablet", 820, 980),
    ("mobile", 390, 844),
    ("small-mobile", 320, 740),
]


def bundle(relative_path: str) -> str:
    """Inline local CSS and JS so browser QA works without a web server."""
    soup = BeautifulSoup((ROOT / relative_path).read_text(), "html.parser")
    for link in soup.find_all("link", rel="stylesheet"):
        style = soup.new_tag("style")
        style.string = CSS
        link.replace_with(style)
    for script in soup.find_all("script", src=True):
        inline = soup.new_tag("script")
        inline.string = JS
        script.replace_with(inline)
    return str(soup)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def launch_options() -> dict:
    executable = shutil.which("chromium") or shutil.which("chromium-browser")
    options: dict = {
        "headless": True,
        "args": ["--no-sandbox", "--disable-dev-shm-usage"],
    }
    if executable:
        options["executable_path"] = executable
    return options


def main() -> int:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(**launch_options())

        # Layout and runtime health at all protected viewport widths.
        for page_path in PAGES:
            for label, width, height in VIEWPORTS:
                context = browser.new_context(
                    viewport={"width": width, "height": height},
                    reduced_motion="reduce",
                )
                page = context.new_page()
                runtime_errors: list[str] = []
                page.on("pageerror", lambda error: runtime_errors.append(str(error)))
                page.set_content(bundle(page_path), wait_until="load")
                page.wait_for_timeout(50)
                dimensions = page.evaluate(
                    """() => ({
                        scrollWidth: document.documentElement.scrollWidth,
                        clientWidth: document.documentElement.clientWidth,
                        h1Count: document.querySelectorAll('h1').length
                    })"""
                )
                require(
                    dimensions["scrollWidth"] <= dimensions["clientWidth"],
                    f"{page_path} at {label}: horizontal overflow "
                    f"{dimensions['scrollWidth']} > {dimensions['clientWidth']}",
                )
                require(
                    dimensions["h1Count"] == 1,
                    f"{page_path} at {label}: expected one H1",
                )
                require(not runtime_errors, f"{page_path} at {label}: {runtime_errors}")
                context.close()

        # No-JavaScript resilience on the mobile homepage and case pages.
        for page_path in PAGES[:4]:
            context = browser.new_context(
                viewport={"width": 390, "height": 844},
                java_script_enabled=False,
            )
            page = context.new_page()
            page.set_content(bundle(page_path), wait_until="load")
            require(
                page.locator(".nav-links").evaluate("element => getComputedStyle(element).display")
                != "none",
                f"{page_path}: navigation disappears without JavaScript",
            )
            require(
                page.evaluate(
                    "document.documentElement.scrollWidth <= document.documentElement.clientWidth"
                ),
                f"{page_path}: no-JavaScript layout overflows horizontally",
            )
            if page_path != "index.html":
                require(
                    page.locator('[role="tabpanel"]').count() == 1,
                    f"{page_path}: core case evidence is absent without JavaScript",
                )
            context.close()

        # WCAG text-spacing resilience at the smallest protected width.
        spacing_override = (
            "*{line-height:1.5!important;letter-spacing:.12em!important;"
            "word-spacing:.16em!important}p{margin-bottom:2em!important}"
        )
        for page_path in PAGES:
            context = browser.new_context(viewport={"width": 320, "height": 740})
            page = context.new_page()
            page.set_content(bundle(page_path), wait_until="load")
            page.add_style_tag(content=spacing_override)
            require(
                page.evaluate(
                    "document.documentElement.scrollWidth <= document.documentElement.clientWidth"
                ),
                f"{page_path}: text-spacing override causes horizontal overflow",
            )
            context.close()

        # Forced-colour rendering remains structurally usable.
        context = browser.new_context(
            viewport={"width": 390, "height": 844}, forced_colors="active"
        )
        page = context.new_page()
        page.set_content(bundle("cases/ai-transportation-delivery.html"), wait_until="load")
        require(
            page.evaluate(
                "document.documentElement.scrollWidth <= document.documentElement.clientWidth"
            ),
            "Forced-colour rendering causes horizontal overflow",
        )
        context.close()

        # Mobile menu focus, inert state, and Escape behaviour.
        context = browser.new_context(
            viewport={"width": 390, "height": 844}, reduced_motion="reduce"
        )
        page = context.new_page()
        page.set_content(bundle("index.html"), wait_until="load")
        button = page.locator(".menu-toggle")
        require(
            page.locator(".mobile-nav-only").evaluate(
                "element => getComputedStyle(element).display"
            )
            != "none",
            "Mobile-only Contact link is not available in the mobile menu",
        )
        require(
            page.locator(".header-actions .desktop-only").evaluate(
                "element => getComputedStyle(element).display"
            )
            == "none",
            "Desktop Contact action remains visible on mobile",
        )
        require(button.get_attribute("aria-expanded") == "false", "Menu starts open")
        require(
            page.evaluate("document.querySelector('#primaryNav').inert") is True,
            "Closed mobile navigation is not inert",
        )
        button.click()
        page.wait_for_timeout(50)
        require(button.get_attribute("aria-expanded") == "true", "Menu did not open")
        require(
            page.evaluate(
                "document.activeElement === document.querySelector('#primaryNav a')"
            ),
            "First navigation link did not receive focus",
        )
        page.keyboard.press("Escape")
        require(button.get_attribute("aria-expanded") == "false", "Escape did not close menu")
        require(
            page.evaluate("document.activeElement === document.querySelector('.menu-toggle')"),
            "Escape did not restore menu-button focus",
        )
        context.close()

        # Current-section state on the homepage.
        context = browser.new_context(
            viewport={"width": 1440, "height": 900}, reduced_motion="reduce"
        )
        page = context.new_page()
        page.set_content(bundle("index.html"), wait_until="load")
        require(
            page.locator(".mobile-nav-only").evaluate(
                "element => getComputedStyle(element).display"
            )
            == "none",
            "Mobile-only Contact link is visible in desktop navigation",
        )
        require(
            page.locator(".header-actions .desktop-only").evaluate(
                "element => getComputedStyle(element).display"
            )
            != "none",
            "Desktop Contact action is hidden on desktop",
        )
        page.locator("#approach").scroll_into_view_if_needed()
        page.wait_for_timeout(250)
        current_link = page.locator('.nav-links a[aria-current="location"]')
        current = current_link.get_attribute("href")
        require(current == "#approach", f"Unexpected current navigation state: {current}")
        underline_right = current_link.evaluate(
            "element => getComputedStyle(element, '::after').right"
        )
        require(underline_right == "0px", "Current-section underline is not visible")
        context.close()

        # Roving tabindex, panel relationships, click activation, and reading progress.
        cases = [
            (
                "cases/four-operating-loops.html",
                "[data-control-key]",
                "[data-control-panel]",
                "ArrowDown",
            ),
            (
                "cases/ai-transportation-delivery.html",
                "[data-arch-key]",
                "[data-arch-detail]",
                "ArrowRight",
            ),
            (
                "cases/safety-stock-diagnostic.html",
                "[data-trace-key]",
                "[data-trace-output]",
                "ArrowDown",
            ),
        ]
        for page_path, tab_selector, panel_selector, key in cases:
            context = browser.new_context(
                viewport={"width": 1280, "height": 900},
                reduced_motion="no-preference",
            )
            page = context.new_page()
            runtime_errors: list[str] = []
            page.on("pageerror", lambda error: runtime_errors.append(str(error)))
            page.set_content(bundle(page_path), wait_until="load")
            tabs = page.locator(tab_selector)
            panel = page.locator(panel_selector)
            require(tabs.count() >= 5, f"{page_path}: tabs are missing")
            first = tabs.nth(0)
            second = tabs.nth(1)
            first.focus()
            page.keyboard.press(key)
            page.wait_for_timeout(50)
            require(
                second.get_attribute("aria-selected") == "true",
                f"{page_path}: arrow key did not activate the second tab",
            )
            require(
                second.get_attribute("tabindex") == "0",
                f"{page_path}: roving tabindex failed",
            )
            require(
                panel.get_attribute("aria-labelledby") == second.get_attribute("id"),
                f"{page_path}: panel/tab relationship failed",
            )
            last = tabs.nth(tabs.count() - 1)
            last.click()
            require(
                last.get_attribute("aria-selected") == "true",
                f"{page_path}: click activation failed",
            )
            before = float(
                page.evaluate(
                    "getComputedStyle(document.documentElement).getPropertyValue('--reading-progress') || 0"
                )
            )
            page.evaluate(
                "document.documentElement.style.scrollBehavior='auto'; "
                "window.scrollTo(0, document.documentElement.scrollHeight)"
            )
            page.wait_for_timeout(120)
            after = float(
                page.evaluate(
                    "getComputedStyle(document.documentElement).getPropertyValue('--reading-progress') || 0"
                )
            )
            require(after > before and after > 0.9, f"{page_path}: reading progress failed")
            require(not runtime_errors, f"{page_path}: runtime errors {runtime_errors}")
            context.close()

        browser.close()

    print("BROWSER QA: PASS")
    print(f"- Pages: {len(PAGES)}")
    print(f"- Protected viewport widths: {', '.join(str(v[1]) for v in VIEWPORTS)} px")
    print("- Horizontal overflow: none")
    print("- Mobile menu, current-section state, tabs, and reading progress: valid")
    print("- No-JavaScript, WCAG text-spacing, and forced-colour resilience: valid")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as error:
        print(f"BROWSER QA: FAIL\n- {error}")
        raise SystemExit(1)
