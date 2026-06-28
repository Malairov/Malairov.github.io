const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

const state = {
  lens: "recruiter",
  arch: "feedback"
};

function renderMetrics() {
  const hero = qs("#heroMetrics");
  const strip = qs("#metricStrip");
  const cards = PORTFOLIO_DATA.metrics.map(m => `
    <article class="metric-mini">
      <strong>${m.value}</strong>
      <span>${m.label}</span>
    </article>`).join("");
  if (hero) hero.innerHTML = cards;
  if (strip) strip.innerHTML = PORTFOLIO_DATA.metrics.map(m => `
    <article class="metric-card reveal">
      <span>${m.label}</span>
      <strong>${m.value}</strong>
      <p>${m.context}</p>
    </article>`).join("");
}

function renderLens() {
  const panel = qs("#lensPanel");
  if (!panel) return;
  const item = PORTFOLIO_DATA.audienceLens[state.lens] || PORTFOLIO_DATA.audienceLens.recruiter;
  panel.innerHTML = `
    <span>${item.title}</span>
    <strong>${item.headline}</strong>
    <p>${item.summary}</p>
    <div class="lens-bullets">${item.bullets.map(b => `<em>${b}</em>`).join("")}</div>
  `;
  qsa("[data-lens]").forEach(btn => {
    const active = btn.dataset.lens === state.lens;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function setupLens() {
  qsa("[data-lens]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.lens = btn.dataset.lens;
      renderLens();
    });
  });
  renderLens();
}

function nodeClass(id) {
  return {
    feedback: "node-feedback",
    slot: "node-slot",
    jit: "node-jit",
    billing: "node-billing",
    governance: "node-governance",
    intake: "node-intake",
    tracking: "node-tracking"
  }[id] || "";
}

function renderArchitecture() {
  const map = qs("#archMap");
  const detail = qs("#archDetail");
  if (!map || !detail) return;
  map.innerHTML = `
    <svg class="arch-svg" viewBox="0 0 1000 620" aria-hidden="true">
      <path class="arch-wire" d="M500 104 C760 110, 860 260, 806 330 S630 520, 500 516 S194 410, 194 330 S270 110, 500 104"/>
      <path class="arch-wire alt" d="M165 145 C330 250, 650 250, 835 330"/>
      <path class="arch-wire alt" d="M835 145 C655 250, 345 250, 195 330"/>
    </svg>
    <div class="arch-core">Operating<br>System<br>Core</div>
    ${PORTFOLIO_DATA.architecture.map(n => `
      <button class="arch-node ${nodeClass(n.id)} ${n.id === state.arch ? "active" : ""}" data-arch="${n.id}">
        <span>${n.tag}</span>
        <strong>${n.title}</strong>
        <small>${n.sub}</small>
      </button>`).join("")}
  `;
  qsa("[data-arch]", map).forEach(btn => {
    btn.addEventListener("click", () => {
      state.arch = btn.dataset.arch;
      renderArchitecture();
    });
  });
  const node = PORTFOLIO_DATA.architecture.find(n => n.id === state.arch) || PORTFOLIO_DATA.architecture[0];
  detail.innerHTML = `
    <span class="tag">${node.tag}</span>
    <h3>${node.title}</h3>
    <p>${node.role}</p>
    <div class="detail-grid">
      <div><span>Inputs</span><strong>${node.inputs}</strong></div>
      <div><span>Outputs</span><strong>${node.outputs}</strong></div>
    </div>
  `;
}

function setupReveal() {
  const items = qsa(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(i => i.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(i => io.observe(i));
}

document.addEventListener("DOMContentLoaded", () => {
  renderMetrics();
  setupLens();
  renderArchitecture();
  setupReveal();
});
