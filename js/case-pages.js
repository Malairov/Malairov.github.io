const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));



function setupArchitecturalCaseReveals() {
  const items = $$(".content-card, .proof-panel, .smartc-summary-grid article, .workstream-grid article, .pilot-grid article, .transfer-grid article, .governance-stack article, .related a");
  items.forEach((item, index) => {
    if (!item.classList.contains("reveal")) item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 220)}ms`);
  });

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


function setupOpsRows() {
  $$(".ops-row").forEach((row) => {
    row.addEventListener("click", () => {
      const section = row.closest("section") || document;
      const detail = $(".ops-detail-card", section);
      $$(".ops-row", row.closest(".ops-table-card") || document).forEach((r) => r.classList.remove("active"));
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
  const toggle = $("#menuToggle");
  const nav = $("#primaryNav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }

  toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("nav-open")));
  $$("a", nav).forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) setOpen(false);
  });
}

function setupCaseStage() {
  $$(".stage").forEach((stage) => {
    const nodes = $$(".stage-node", stage);
    const container = stage.closest(".operating-model-grid") || stage.parentElement || document;
    const detail = $(".loop-detail-panel", container) || $(".stage-detail", stage);
    if (!nodes.length || !detail) return;

    function activate(node) {
      nodes.forEach((n) => {
        const active = n === node;
        n.classList.toggle("active", active);
        n.setAttribute("aria-pressed", active ? "true" : "false");
      });

      const title = node.dataset.title || "Selected loop";
      const tag = node.dataset.tag || "Selected";
      const problem = node.dataset.problem || "";
      const control = node.dataset.control || node.dataset.detail || "";
      const impact = node.dataset.impact || "";
      const relevance = node.dataset.relevance || "";

      if (problem || impact || relevance) {
        detail.innerHTML = `
          <span class="mono-label">${tag}</span>
          <h3>Selected loop: ${title}</h3>
          <dl class="loop-detail-list">
            ${problem ? `<div><dt>Problem</dt><dd>${problem}</dd></div>` : ""}
            ${control ? `<div><dt>Control built</dt><dd>${control}</dd></div>` : ""}
            ${impact ? `<div><dt>Why it mattered</dt><dd>${impact}</dd></div>` : ""}
            ${relevance ? `<div><dt>PM relevance</dt><dd>${relevance}</dd></div>` : ""}
          </dl>
        `;
      } else {
        detail.innerHTML = `
          <span class="mono-label">${tag}</span>
          <h3>${title}</h3>
          <p>${control}</p>
        `;
      }
    }

    nodes.forEach((node) => {
      node.setAttribute("type", "button");
      node.setAttribute("aria-pressed", "false");
      node.addEventListener("click", () => activate(node));
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate(node);
        }
      });
    });

    activate(nodes[0]);
  });
}

function setupFailureLab() {
  const output = $("#failureOutput");
  const buttons = $$("[data-failure]");
  if (!output || !buttons.length) return;

  function activate(button) {
    buttons.forEach((b) => b.classList.toggle("active", b === button));
    output.innerHTML = `
      <span class="mono-label">${button.dataset.failure}</span>
      <h3>${button.dataset.title}</h3>
      <p>${button.dataset.detail}</p>
    `;
  }

  buttons.forEach((button) => button.addEventListener("click", () => activate(button)));
  activate(buttons[0]);
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupArchitecturalCaseReveals();
  setupCaseStage();
  setupFailureLab();
});