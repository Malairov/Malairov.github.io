(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileNavigation = window.matchMedia("(max-width: 1020px)");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const analyticsOptOutKey = "pm_portfolio_analytics_opt_out";
  const cloudflareAnalyticsToken = "bcb63e8bd75048248da5e03af697c7ea";
  const cloudflareAnalyticsPlaceholder = "";
  const cloudflareBeaconUrl =
    "https://static.cloudflareinsights.com/beacon.min.js";

  const getStoredAnalyticsOptOut = () => {
    try {
      return window.localStorage.getItem(analyticsOptOutKey) === "1";
    } catch {
      return false;
    }
  };

  const setStoredAnalyticsOptOut = (optedOut) => {
    try {
      if (optedOut) window.localStorage.setItem(analyticsOptOutKey, "1");
      else window.localStorage.removeItem(analyticsOptOutKey);
    } catch {
      return;
    }
  };

  const removeAnalyticsParameter = () => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("analytics")) return;

    url.searchParams.delete("analytics");
    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  };

  const processAnalyticsPreference = () => {
    const params = new URLSearchParams(window.location.search);
    const preference = params.get("analytics");
    if (preference !== "off" && preference !== "on") {
      if (params.has("analytics")) removeAnalyticsParameter();
      return false;
    }

    setStoredAnalyticsOptOut(preference === "off");
    removeAnalyticsParameter();
    return true;
  };

  const loadCloudflareAnalytics = () => {
    if (document.querySelector(`script[src="${cloudflareBeaconUrl}"]`)) return;
    if (
      !cloudflareAnalyticsToken ||
      cloudflareAnalyticsToken === cloudflareAnalyticsPlaceholder
    ) {
      return;
    }

    const script = document.createElement("script");
    script.defer = true;
    script.src = cloudflareBeaconUrl;
    script.dataset.cfBeacon = JSON.stringify({
      token: cloudflareAnalyticsToken,
    });
    document.head.append(script);
  };

  const analyticsPreferenceChanged = processAnalyticsPreference();
  if (!analyticsPreferenceChanged && !getStoredAnalyticsOptOut()) {
    loadCloudflareAnalytics();
  }

  const getCampaignRef = () => {
    const value = new URLSearchParams(window.location.search).get("ref");
    if (!value) return "";
    const normalized = value.trim();
    return /^[A-Za-z0-9_-]{1,64}$/.test(normalized) ? normalized : "";
  };
  const campaignRef = getCampaignRef();

  if (campaignRef) {
    document.querySelectorAll("[data-preserve-ref]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      url.searchParams.set("ref", campaignRef);
      link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    });
  }

  const setMenuState = (open, { moveFocus = false } = {}) => {
    if (!menuButton || !nav) return;

    const shouldOpen = Boolean(open && mobileNavigation.matches);
    menuButton.setAttribute("aria-expanded", String(shouldOpen));
    menuButton.setAttribute(
      "aria-label",
      shouldOpen ? "Close navigation menu" : "Open navigation menu",
    );
    nav.classList.toggle("is-open", shouldOpen);
    document.body.classList.toggle("menu-open", shouldOpen);
    nav.inert = mobileNavigation.matches && !shouldOpen;

    if (moveFocus) {
      const target = shouldOpen ? nav.querySelector("a") : menuButton;
      if (shouldOpen) {
        window.requestAnimationFrame(() =>
          window.requestAnimationFrame(() => target?.focus()),
        );
      } else target?.focus();
    }
  };

  if (menuButton && nav) {
    setMenuState(false);

    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      setMenuState(!open, { moveFocus: !open });
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("click", (event) => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      if (
        open &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setMenuState(false, { moveFocus: true });
        return;
      }

      if (event.key === "Tab") {
        const focusable = [...nav.querySelectorAll("a"), menuButton];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    if (typeof mobileNavigation.addEventListener === "function") {
      mobileNavigation.addEventListener("change", () => setMenuState(false));
    } else {
      mobileNavigation.addListener(() => setMenuState(false));
    }
  }

  const homeNavigationLinks = [
    ...document.querySelectorAll('.home-page .nav-links a[href^="#"]'),
  ];
  const homeSections = homeNavigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (homeSections.length && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        homeNavigationLinks.forEach((link) => {
          const current = link.getAttribute("href") === `#${visible.target.id}`;
          if (current) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: [0, 0.1, 0.5] },
    );
    homeSections.forEach((section) => sectionObserver.observe(section));
  }

  const progressElement = document.querySelector(".reading-progress span");
  if (progressElement) {
    let progressTicking = false;
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;
      document.documentElement.style.setProperty(
        "--reading-progress",
        progress.toFixed(4),
      );
      progressTicking = false;
    };
    const requestProgressUpdate = () => {
      if (!progressTicking) {
        progressTicking = true;
        window.requestAnimationFrame(updateProgress);
      }
    };
    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
  }

  const animatePanel = (panel) => {
    if (reducedMotion.matches || typeof panel.animate !== "function") return;
    panel.animate(
      [
        { opacity: 0.68, transform: "translateY(3px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
  };

  const setupTabs = ({ selector, panelSelector, getKey, data, render }) => {
    const tabs = [...document.querySelectorAll(selector)];
    const panel = document.querySelector(panelSelector);
    if (!tabs.length || !panel) return;

    const activate = (tab, { focus = false, animate = true } = {}) => {
      const key = getKey(tab);
      const content = data[key];
      if (!content) return;

      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panel.setAttribute("aria-labelledby", tab.id);
      render(panel, content);
      if (animate) animatePanel(panel);
      if (focus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown")
          nextIndex = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;

        event.preventDefault();
        activate(tabs[nextIndex], { focus: true });
      });
    });

    const selected =
      tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ||
      tabs[0];
    activate(selected, { animate: false });
  };

  const controlData = {
    feedback: {
      title: "Floor feedback became an operating signal",
      summary:
        "Informal production-floor concerns were converted into a visible review path with explicit ownership and follow-up.",
      problem:
        "Issues could remain anecdotal until they developed into shortage or service escalations.",
      control:
        "A structured review signal connected item, location, impact, owner, status, and next action.",
      decision:
        "Separate urgent recovery from recurring-pattern analysis so immediate service and systemic correction could proceed in parallel.",
      value:
        "Earlier visibility, cleaner escalation, and less dependence on memory or informal conversations.",
    },
    slot: {
      title: "Finite capacity was governed by operating value",
      summary:
        "Vending and crib capacity was reviewed against usage, item criticality, package constraints, and service relevance.",
      problem:
        "Limited slots could be consumed by items that did not justify the space while higher-value items remained harder to access.",
      control:
        "A slot-economics review combined usage behaviour, package size, demand stability, and operational priority.",
      decision:
        "Treat placement as a portfolio decision rather than a first-come administrative task.",
      value:
        "More deliberate capacity allocation and clearer justification for additions, removals, and relocations.",
    },
    replenish: {
      title: "Replenishment moved from habit to exception control",
      summary:
        "Usage, lead time, MOQ, package size, open-order state, and risk buffers were brought into one review logic.",
      problem:
        "Manual ordering relied on fragmented information and created repeat work, duplication risk, and inconsistent prioritization.",
      control:
        "Power Query and Excel/VBA surfaced only items requiring a decision, with item-level context attached.",
      decision:
        "Automate visibility, not judgement: the system prioritizes exceptions while the operator retains the final decision.",
      value:
        "Review effort fell from roughly five hours to roughly thirty minutes per cycle.",
    },
    lifecycle: {
      title: "Lifecycle state replaced ambiguous follow-up",
      summary:
        "Pending, approved, ordered, received, active, blocked, and resolved states were made visible across the operating workflow.",
      problem:
        "Items could appear “in progress” without a shared understanding of the actual blocking point.",
      control:
        "A state model connected each item to the current gate, responsible party, evidence, and next action.",
      decision:
        "Use defined states rather than free-text status descriptions for recurring operational work.",
      value:
        "Cleaner handoffs, faster status review, and reduced communication gaps.",
    },
    vendor: {
      title: "Availability and approval were treated as different gates",
      summary:
        "Supplier availability did not automatically mean a product was technically acceptable or approved for use.",
      problem:
        "Substitutions could create false confidence when commercial availability was confused with specification acceptance.",
      control:
        "Vendor, technical specification, package, approval, and lead-time checks were separated into explicit gates.",
      decision:
        "Escalate with a decision-ready package rather than forwarding an unqualified substitute.",
      value:
        "More reliable supplier coordination and fewer circular clarification cycles.",
    },
    shortage: {
      title: "Shortage recovery became measurable work",
      summary:
        "Critical shortages were connected to ownership, status movement, escalation dates, and closure evidence.",
      problem:
        "Recovery work could be intense but remain difficult to audit or learn from after the immediate issue was resolved.",
      control:
        "A shortage register tracked event, impact, owner, action, dependency, escalation, and time to closure.",
      decision:
        "Close the issue only when service is restored and the recurring cause has an assigned preventive action.",
      value:
        "Stronger accountability and a reusable evidence base for root-cause improvement.",
    },
  };

  setupTabs({
    selector: "[data-control-key]",
    panelSelector: "[data-control-panel]",
    getKey: (tab) => tab.dataset.controlKey,
    data: controlData,
    render: (panel, content) => {
      panel.innerHTML = `
        <h3>${content.title}</h3>
        <p>${content.summary}</p>
        <div class="panel-grid">
          <div class="panel-block"><span>Operating problem</span><p>${content.problem}</p></div>
          <div class="panel-block"><span>Control introduced</span><p>${content.control}</p></div>
          <div class="panel-block"><span>Management decision</span><p>${content.decision}</p></div>
          <div class="panel-block"><span>Business value</span><p>${content.value}</p></div>
        </div>`;
    },
  });

  const architectureData = {
    detect: {
      title: "Detection and direction logic",
      text: "Computer-vision teams identified pedestrians and movement direction. The PM requirement was ownership, test records, dependency tracking, and acceptance criteria.",
    },
    compute: {
      title: "Edge-computing and enclosure package",
      text: "Camera, microcomputer, heating, and enclosure components had to operate as one field-ready unit. Procurement and integration dependencies were tracked as project risks, not isolated engineering tasks.",
    },
    alert: {
      title: "Driver-warning output",
      text: "The system translated a verified pedestrian event into a driver-warning state. Acceptance required defined warning behaviour, failure handling, and test records.",
    },
    monitor: {
      title: "Remote equipment monitoring",
      text: "Operational telemetry and exception visibility helped field failures be identified, assigned, and resolved without relying only on public reports or site visits.",
    },
    pilot: {
      title: "City pilot, field records, and scale transition",
      text: "One city pilot tested the product under live field conditions. Go/no-go decisions connected night-time sign glare, wind-related camera displacement, winter survivability, installation records, sponsor acceptance, and lessons for the next phase.",
    },
  };

  setupTabs({
    selector: "[data-arch-key]",
    panelSelector: "[data-arch-detail]",
    getKey: (tab) => tab.dataset.archKey,
    data: architectureData,
    render: (panel, content) => {
      panel.innerHTML = `<h3>${content.title}</h3><p>${content.text}</p>`;
    },
  });

  const traceData = {
    input: {
      title: "Input state: a new or low-history item",
      issue:
        "The item existed in the source data but lacked the usage history expected by later logic.",
      failure:
        "A blank or zero-history state could be treated as “no demand” rather than “insufficient evidence.”",
      control:
        "Preserve the item as a distinct review state instead of converting uncertainty into an automatic rejection.",
      evidence: "Source-row validation and explicit no-history classification.",
    },
    transform: {
      title: "Transformation state: Power Query",
      issue:
        "Column changes, type conversion, null handling, or joins could alter the record before the workbook formulas saw it.",
      failure:
        "A technically successful refresh could still remove or misclassify the item.",
      control:
        "Validate row counts, key uniqueness, null behaviour, and exception records after each transformation stage.",
      evidence:
        "Reconciliation checks between source, query output, and workbook table.",
    },
    formula: {
      title: "Calculation state: formula logic",
      issue:
        "Safety-stock and reorder formulas expected mature usage data and did not fully represent new-item uncertainty.",
      failure:
        "A formula could return a valid numeric output while expressing the wrong business meaning.",
      control:
        "Separate mathematical output from decision classification; no-history items receive a review flag, not a false zero-risk signal.",
      evidence:
        "Four core scenarios tested: null, zero, sparse, and mature demand histories; abnormal states routed to exception review.",
    },
    automation: {
      title: "Automation state: VBA and dynamic ranges",
      issue:
        "The macro depended on headers, filters, and data ranges that could change as the workbook evolved.",
      failure:
        "Automation could run without error but omit new columns or records.",
      control:
        "Use named headers, table objects, validation counts, and explicit failure messages instead of fixed positions.",
      evidence: "Macro test cases and post-run record reconciliation.",
    },
    filter: {
      title: "Review state: filter and classification",
      issue:
        "The final review view was designed to reduce noise, but overly aggressive filters could hide the very exceptions requiring judgement.",
      failure:
        "The item disappeared from the decision surface even though it still existed in the workbook.",
      control:
        "Create a visible “new / insufficient history” queue and reconcile all excluded records by reason.",
      evidence: "Filter-state totals and a zero-unexplained-exclusions check.",
    },
  };

  setupTabs({
    selector: "[data-trace-key]",
    panelSelector: "[data-trace-output]",
    getKey: (tab) => tab.dataset.traceKey,
    data: traceData,
    render: (panel, content) => {
      panel.innerHTML = `
        <h3>${content.title}</h3>
        <p>${content.issue}</p>
        <dl>
          <dt>Failure mode</dt><dd>${content.failure}</dd>
          <dt>Control</dt><dd>${content.control}</dd>
          <dt>Evidence</dt><dd>${content.evidence}</dd>
        </dl>`;
    },
  });

  document.querySelectorAll("[data-current-year]").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });
})();
