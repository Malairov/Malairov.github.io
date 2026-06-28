const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));


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
    const detail = $(".stage-detail", stage);
    if (!nodes.length || !detail) return;

    function activate(node) {
      nodes.forEach((n) => n.classList.toggle("active", n === node));
      detail.innerHTML = `
        <span class="mono-label">${node.dataset.tag || "Layer"}</span>
        <h3>${node.dataset.title || ""}</h3>
        <p>${node.dataset.detail || ""}</p>
      `;
    }

    nodes.forEach((node) => node.addEventListener("click", () => activate(node)));
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
  setupCaseStage();
  setupFailureLab();
});