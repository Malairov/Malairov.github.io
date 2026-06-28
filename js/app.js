const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

const state = { lens: "recruiter", arch: "feedback" };

function renderMetrics() {
  const strip = qs("#metricGrid");
  if (!strip) return;
  strip.innerHTML = PORTFOLIO_DATA.metrics.map((m) => `
    <article class="metric-card reveal">
      <span>${m.label}</span>
      <strong>${m.value}</strong>
      <p>${m.detail}</p>
    </article>
  `).join("");
}

function renderLens() {
  const panel = qs("#lensPanel");
  if (!panel) return;
  const item = PORTFOLIO_DATA.lens[state.lens] || PORTFOLIO_DATA.lens.recruiter;
  panel.innerHTML = `
    <span class="mono-label">${item.label}</span>
    <h3>${item.headline}</h3>
    <p>${item.body}</p>
    <div class="chip-row">${item.points.map((p) => `<span>${p}</span>`).join("")}</div>
  `;
  qsa("[data-lens]").forEach((button) => {
    const active = button.dataset.lens === state.lens;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function renderArchitecture() {
  const map = qs("#architectureMap");
  const detail = qs("#architectureDetail");
  if (!map || !detail) return;

  const classes = {
    feedback: "node-a",
    slot: "node-b",
    jit: "node-c",
    billing: "node-d",
    governance: "node-e",
    intake: "node-f",
    tracking: "node-g"
  };

  map.innerHTML = `
    <svg class="map-lines" viewBox="0 0 1000 620" aria-hidden="true">
      <path d="M500 92 C770 96 890 260 825 335 C760 493 615 528 500 528 C385 528 240 493 175 335 C110 260 230 96 500 92" />
      <path d="M170 158 C320 248 680 248 830 158" />
      <path d="M190 470 C350 365 650 365 810 470" />
    </svg>
    <div class="map-core">Control<br>System</div>
    ${PORTFOLIO_DATA.architecture.map((node) => `
      <button class="map-node ${classes[node.id] || ""} ${node.id === state.arch ? "active" : ""}" data-arch="${node.id}">
        <span>${node.tag}</span>
        <strong>${node.title}</strong>
      </button>
    `).join("")}
  `;

  qsa("[data-arch]", map).forEach((button) => {
    button.addEventListener("click", () => {
      state.arch = button.dataset.arch;
      renderArchitecture();
    });
  });

  const active = PORTFOLIO_DATA.architecture.find((node) => node.id === state.arch) || PORTFOLIO_DATA.architecture[0];
  detail.innerHTML = `
    <span class="mono-label">${active.tag}</span>
    <h3>${active.title}</h3>
    <p>${active.detail}</p>
    <div class="proof-box"><span>PM / operations relevance</span><strong>${active.proof}</strong></div>
  `;
}

function renderCases() {
  const grid = qs("#caseGrid");
  if (!grid) return;
  grid.innerHTML = PORTFOLIO_DATA.cases.map((c) => `
    <a class="case-card reveal" href="${c.url}">
      <span class="mono-label">${c.tag}</span>
      <h3>${c.title}</h3>
      <dl>
        <div><dt>Problem</dt><dd>${c.problem}</dd></div>
        <div><dt>Control / mechanism</dt><dd>${c.mechanism}</dd></div>
        <div><dt>Result</dt><dd>${c.result}</dd></div>
      </dl>
      <p class="case-relevance">${c.relevance}</p>
      <strong>View proof-of-work case →</strong>
    </a>
  `).join("");
}


function setupArchitecturalStagger() {
  const selectors = [".metric-card", ".case-card", ".fit-card", ".preview-list article", ".card", ".detail-panel"];
  let index = 0;
  selectors.forEach((selector) => {
    qsa(selector).forEach((item) => {
      if (!item.classList.contains("reveal")) item.classList.add("reveal");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 220)}ms`);
      index += 1;
    });
  });
}

function setupLens() {
  qsa("[data-lens]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lens = button.dataset.lens;
      renderLens();
    });
  });
  renderLens();
}


function setupOpsRows() {
  const rows = qsa(".ops-row");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const section = row.closest("section") || document;
      const detail = qs(".ops-detail-card", section) || qs("#architectureDetail");
      qsa(".ops-row", row.closest(".ops-table-card") || document).forEach((r) => r.classList.remove("active"));
      row.classList.add("active");
      if (!detail) return;
      detail.innerHTML = `
        <span class="mono-label">Selected loop</span>
        <h3>${row.dataset.title || "Selected loop"}</h3>
        <dl>
          ${row.dataset.problem ? `<div><dt>Problem</dt><dd>${row.dataset.problem}</dd></div>` : ""}
          ${row.dataset.control ? `<div><dt>Control built</dt><dd>${row.dataset.control}</dd></div>` : ""}
          ${row.dataset.impact ? `<div><dt>Why it mattered</dt><dd>${row.dataset.impact}</dd></div>` : ""}
          ${row.dataset.relevance ? `<div><dt>PM relevance</dt><dd>${row.dataset.relevance}</dd></div>` : ""}
        </dl>
      `;
    });
  });
}

function setupMobileNav() {
  const toggle = qs("#menuToggle");
  const nav = qs("#primaryNav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }

  toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("nav-open")));
  qsa("a", nav).forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) setOpen(false);
  });
}

function setRevealDelays() {
  const groups = [
    ".metric-grid .reveal",
    ".case-grid .reveal",
    ".preview-list article",
    ".fit-cards .fit-card"
  ];
  groups.forEach((selector) => {
    qsa(selector).forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
    });
  });
}

function setupReveal() {
  const items = qsa(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
  renderMetrics();
  setupLens();
  renderArchitecture();
  renderCases();
  setupArchitecturalStagger();
  setupMobileNav();
  setupOpsRows();
  setupReveal();
});