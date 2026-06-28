const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

function setupStage() {
  $$(".interactive-stage").forEach(stage => {
    const detail = $(".stage-detail", stage);
    const nodes = $$(".stage-node", stage);
    function activate(node) {
      if (!node || !detail) return;
      nodes.forEach(n => n.classList.toggle("active", n === node));
      detail.innerHTML = `
        <span>${node.dataset.tag || "Layer"}</span>
        <strong>${node.dataset.title || node.textContent.trim()}</strong>
        <p>${node.dataset.detail || ""}</p>
      `;
    }
    nodes.forEach(node => node.addEventListener("click", () => activate(node)));
    activate(nodes[0]);
  });
}

function setupFailures() {
  const output = $("#failureOutput");
  const buttons = $$("[data-failure]");
  if (!output || !buttons.length) return;
  function activate(btn) {
    buttons.forEach(b => b.classList.toggle("active", b === btn));
    output.innerHTML = `<strong>${btn.dataset.title}</strong><p>${btn.dataset.detail}</p>`;
  }
  buttons.forEach(btn => btn.addEventListener("click", () => activate(btn)));
  activate(buttons[0]);
}

document.addEventListener("DOMContentLoaded", () => {
  setupStage();
  setupFailures();
});
