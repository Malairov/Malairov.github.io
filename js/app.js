const data = window.PORTFOLIO_DATA;

const q = (selector, root = document) => root.querySelector(selector);
const qa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function html(strings, ...values) {
  return strings.map((s, i) => s + (values[i] ?? "")).join("");
}

function renderMetrics() {
  q("#heroMetrics").innerHTML = data.heroMetrics.map(metric => html`
    <div class="kpi-card">
      <strong>${metric.value}</strong>
      <span>${metric.label}</span>
    </div>
  `).join("");

  q("#metricStrip").innerHTML = data.metrics.map(metric => html`
    <article class="metric-tile">
      <div class="value">${metric.value}</div>
      <div class="label">${metric.label}</div>
      <div class="context">${metric.context}</div>
    </article>
  `).join("");
}

function renderArchitecture() {
  data.architecture.forEach(node => {
    const target = q(`[data-arch="${node.id}"]`);
    if (!target) return;
    target.setAttribute("role", "button");
    target.setAttribute("tabindex", "0");
    target.setAttribute("aria-label", `Open ${node.title}`);
    target.innerHTML = html`
      <span class="tag">${node.tag}</span>
      <strong>${node.title}</strong>
      <span>${node.subtitle}</span>
    `;
  });

  const setDetail = (id) => {
    const node = data.architecture.find(item => item.id === id) ?? data.architecture[0];
    qa(".arch-node").forEach(el => el.classList.toggle("active", el.dataset.arch === node.id));
    q("#archDetail").innerHTML = html`
      <p class="eyebrow">${node.tag} · ${node.cadence}</p>
      <h3>${node.title}</h3>
      <p>${node.role}</p>
      <div class="detail-meta">
        <span class="chip">Cadence: ${node.cadence}</span>
        <span class="chip">Metric: ${node.metric}</span>
      </div>
      <h4>Inputs</h4>
      <ul class="detail-list">${node.inputs.map(input => `<li>${input}</li>`).join("")}</ul>
      <h4>Outputs</h4>
      <ul class="detail-list">${node.outputs.map(output => `<li>${output}</li>`).join("")}</ul>
    `;
  };

  qa(".arch-node").forEach(el => {
    el.addEventListener("click", () => setDetail(el.dataset.arch));
    el.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setDetail(el.dataset.arch);
      }
    });
  });

  setDetail("feedback");
}

function renderSkuFlow() {
  const flow = q("#skuFlow");
  flow.innerHTML = data.skuFlow.map((step, index) => html`
    <button class="flow-step" data-step="${index}" type="button">
      <span class="step-no">STEP ${String(index + 1).padStart(2, "0")}</span>
      <strong>${step.title}</strong>
      <span>${step.subtitle}</span>
    </button>
  `).join("");

  const setStep = (index) => {
    const step = data.skuFlow[index];
    qa(".flow-step").forEach((el, i) => el.classList.toggle("active", i === index));
    q("#flowDetail").innerHTML = html`
      <p class="eyebrow">Lifecycle step ${String(index + 1).padStart(2, "0")}</p>
      <h3>${step.title}</h3>
      <p>${step.detail}</p>
      <span class="chip">${step.subtitle}</span>
    `;
  };

  qa(".flow-step").forEach((button, index) => button.addEventListener("click", () => setStep(index)));
  setStep(0);
}

function renderCases(filter = "All") {
  const toolbar = q("#caseToolbar");
  toolbar.innerHTML = data.filters.map(item => html`
    <button class="filter-button ${item === filter ? "active" : ""}" type="button" data-filter="${item}">${item}</button>
  `).join("");

  const visibleCases = filter === "All" ? data.cases : data.cases.filter(item => item.category === filter);
  q("#caseGrid").innerHTML = visibleCases.map((item, index) => html`
    <article class="case-card">
      <span class="case-type">${item.category}</span>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <div class="case-metric">${item.metric}</div>
      <div class="case-tabs">
        ${["problem", "built", "result", "transfer"].map(key => html`
          <div>
            <button class="case-toggle" type="button" aria-expanded="false">
              <span>${key === "built" ? "System built" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span>+</span>
            </button>
            <div class="case-body">${item[key]}</div>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");

  qa("#caseToolbar .filter-button").forEach(button => button.addEventListener("click", () => renderCases(button.dataset.filter)));
  qa(".case-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const body = button.nextElementSibling;
      const isOpen = body.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.lastElementChild.textContent = isOpen ? "−" : "+";
    });
  });
}

function renderDiagnostic() {
  const active = new Set(["noHistory", "formula", "classification"]);
  const toggles = q("#diagnosticToggles");

  const sync = () => {
    toggles.innerHTML = data.diagnostic.map(item => html`
      <button class="toggle-button ${active.has(item.id) ? "active" : ""}" data-fail="${item.id}" type="button">${item.label}</button>
    `).join("");

    const activeItems = data.diagnostic.filter(item => active.has(item.id));
    const severity = activeItems.length === 0 ? "ok" : activeItems.length <= 2 ? "warn" : "fail";
    const label = activeItems.length === 0 ? "Controlled" : activeItems.length <= 2 ? "Partial failure" : "Systemic failure";

    q("#diagnosticStatus").innerHTML = html`
      <div>
        <strong>${activeItems.length} active failure mode${activeItems.length === 1 ? "" : "s"}</strong>
        <div style="color: var(--muted); font-size: .92rem; margin-top: 3px;">Toggle modes to inspect the failure chain.</div>
      </div>
      <span class="status-chip ${severity}">${label}</span>
    `;

    q("#failureChain").innerHTML = activeItems.length ? activeItems.map(item => html`
      <div class="chain-item">
        <strong>${item.title}</strong>
        <span>${item.effect}</span>
      </div>
    `).join("") : html`
      <div class="chain-item">
        <strong>No active failure mode</strong>
        <span>The item remains visible to the control process.</span>
      </div>
    `;

    q("#fixBox").innerHTML = html`
      <strong>Control fix</strong>
      <span>Move critical classification logic into Power Query, add a NO-USAGE state with a configurable threshold, use dynamic header-name lookup, and keep diagnostic columns visible during testing.</span>
    `;

    qa("#diagnosticToggles .toggle-button").forEach(button => button.addEventListener("click", () => {
      const id = button.dataset.fail;
      if (active.has(id)) active.delete(id); else active.add(id);
      sync();
    }));
  };

  sync();
}

function renderTimeline() {
  q("#timelineList").innerHTML = data.timeline.map(item => html`
    <article class="timeline-item">
      <div class="timeline-year">${item.year}</div>
      <div class="timeline-content">
        <h3>${item.title}</h3>
        <p><strong>${item.org}</strong></p>
        <p>${item.body}</p>
        <div class="chips">${item.chips.map(chip => `<span class="chip">${chip}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

function revealOnScroll() {
  const items = qa(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("in"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

function init() {
  renderMetrics();
  renderArchitecture();
  renderSkuFlow();
  renderCases();
  renderDiagnostic();
  renderTimeline();
  revealOnScroll();
}

document.addEventListener("DOMContentLoaded", init);
