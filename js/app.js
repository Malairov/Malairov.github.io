const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

const state = {
  arch: 'feedback',
  flow: 0,
  filter: 'All',
  diagnostic: new Set(),
};

function renderHeroMetrics() {
  const root = qs('#heroMetrics');
  root.innerHTML = PORTFOLIO_DATA.metrics.slice(0, 4).map(m => `
    <article class="kpi-tile glass tilt-subtle">
      <div class="kpi-kicker">${m.label}</div>
      <div class="kpi-value">${m.value}</div>
      <div class="kpi-caption">${m.note}</div>
    </article>`).join('');
}

function renderMetricStrip() {
  const root = qs('#metricStrip');
  root.innerHTML = PORTFOLIO_DATA.metrics.map(m => `
    <article class="metric-card glass tilt-subtle reveal-child">
      <div class="metric-top">${m.label}</div>
      <div class="metric-value">${m.value}</div>
      <div class="metric-note">${m.note}</div>
    </article>`).join('');
}

function hydrateArchNodes() {
  const map = Object.fromEntries(PORTFOLIO_DATA.architecture.map(a => [a.id, a]));
  qsa('.arch-node').forEach(node => {
    const data = map[node.dataset.arch];
    if (!data) return;
    node.dataset.label = data.tag;
    node.dataset.title = data.title;
    node.addEventListener('click', () => {
      state.arch = data.id;
      renderArchDetail();
    });
  });
}

function renderArchDetail() {
  const data = PORTFOLIO_DATA.architecture.find(x => x.id === state.arch) || PORTFOLIO_DATA.architecture[0];
  qsa('.arch-node').forEach(node => node.classList.toggle('active', node.dataset.arch === data.id));
  qs('#archDetail').innerHTML = `
    <div class="detail-badge">${data.tag} · ${data.cadence}</div>
    <h3>${data.title}</h3>
    <div class="detail-sub">${data.subtitle}</div>
    <p class="detail-copy">${data.role}</p>
    <div class="meta-grid">
      <div class="meta-card">
        <strong>Inputs</strong>
        <ul class="meta-list">${data.inputs.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div class="meta-card">
        <strong>Outputs</strong>
        <ul class="meta-list">${data.outputs.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="detail-metric">
      <span>Why it matters</span>
      <div>${data.metric}</div>
    </div>`;
}

function renderFlow() {
  const root = qs('#skuFlow');
  root.innerHTML = PORTFOLIO_DATA.skuFlow.map((step, idx) => `
    <article class="flow-step ${idx === state.flow ? 'active' : ''} tilt-subtle" data-step="${idx}">
      <span class="step-num">0${idx + 1}</span>
      <small>${step.subtitle}</small>
      <strong>${step.title}</strong>
      <p>${step.detail}</p>
    </article>`).join('');
  qsa('.flow-step', root).forEach(card => card.addEventListener('click', () => {
    state.flow = Number(card.dataset.step);
    renderFlow();
    renderFlowDetail();
  }));
  renderFlowDetail();
}

function renderFlowDetail() {
  const step = PORTFOLIO_DATA.skuFlow[state.flow] || PORTFOLIO_DATA.skuFlow[0];
  qs('#flowDetail').innerHTML = `
    <div class="flow-badge">Step ${state.flow + 1} of ${PORTFOLIO_DATA.skuFlow.length}</div>
    <h3>${step.title}</h3>
    <div class="detail-sub">${step.subtitle}</div>
    <p class="flow-copy">${step.detail}</p>
    <div class="detail-metric">
      <span>Lifecycle framing</span>
      <div>This step exists to preserve governance visibility, not to let the item drift into the system without an explicit state.</div>
    </div>`;
}

function renderFilters() {
  const root = qs('#caseToolbar');
  root.innerHTML = PORTFOLIO_DATA.filters.map(filter => `
    <button class="filter-chip ${filter === state.filter ? 'active' : ''}" data-filter="${filter}">${filter}</button>
  `).join('');
  qsa('.filter-chip', root).forEach(btn => btn.addEventListener('click', () => {
    state.filter = btn.dataset.filter;
    renderFilters();
    renderCases();
  }));
}

function renderCases() {
  const root = qs('#caseGrid');
  const cases = PORTFOLIO_DATA.cases.filter(c => state.filter === 'All' || c.category === state.filter);
  root.innerHTML = cases.map((c, idx) => `
    <article class="case-card glass tilt-subtle" data-case="${idx}">
      <div class="case-head">
        <div>
          <span class="case-tag">${c.category}</span>
          <h3 class="case-title">${c.title}</h3>
          <p class="case-summary">${c.summary}</p>
        </div>
        <div class="case-metric">
          <span>Evidence</span>
          <strong>${c.metric}</strong>
        </div>
      </div>
      <div class="case-body">
        <div class="case-columns">
          <div class="case-mini"><strong>Problem</strong>${c.problem}</div>
          <div class="case-mini"><strong>System built</strong>${c.built}</div>
        </div>
        <button class="case-expand">Open result and transferability</button>
        <div class="case-extra">
          <div class="case-columns">
            <div class="case-mini"><strong>Result</strong>${c.result}</div>
            <div class="case-mini"><strong>Transferability</strong>${c.transfer}</div>
          </div>
        </div>
      </div>
    </article>`).join('');
  qsa('.case-card', root).forEach(card => {
    const btn = qs('.case-expand', card);
    btn.addEventListener('click', () => {
      const open = card.classList.toggle('open');
      btn.textContent = open ? 'Hide detail' : 'Open result and transferability';
    });
  });
}

function renderDiagnostic() {
  const toggleRoot = qs('#diagnosticToggles');
  toggleRoot.innerHTML = PORTFOLIO_DATA.diagnostic.map(item => `
    <label class="toggle-card ${state.diagnostic.has(item.id) ? 'active' : ''}">
      <input type="checkbox" data-diag="${item.id}" ${state.diagnostic.has(item.id) ? 'checked' : ''} />
      <div>
        <strong>${item.label}</strong>
        <span>${item.effect}</span>
      </div>
    </label>`).join('');
  qsa('input[data-diag]', toggleRoot).forEach(input => input.addEventListener('change', e => {
    const id = e.target.dataset.diag;
    if (e.target.checked) state.diagnostic.add(id); else state.diagnostic.delete(id);
    renderDiagnostic();
  }));

  const active = PORTFOLIO_DATA.diagnostic.filter(d => state.diagnostic.has(d.id));
  const count = active.length;
  const severity = count === 0 ? 'Stable view' : count <= 2 ? 'Emerging failure' : count <= 4 ? 'Compounding failure' : 'System-level breakdown';
  const subtitle = count === 0
    ? 'Turn on a failure mode to inspect the chain.'
    : count === 1
      ? 'One layer is degraded, but the system may still be recoverable.'
      : 'Multiple layers are interacting. This is why the issue was hard to detect with one quick fix.';

  qs('#diagnosticStatus').innerHTML = `
    <div class="diag-overline">Failure-state engine</div>
    <div class="diag-title">${severity}</div>
    <div class="diag-sub">${subtitle}</div>`;

  qs('#failureChain').innerHTML = PORTFOLIO_DATA.diagnostic.map(item => `
    <span class="chain-pill ${state.diagnostic.has(item.id) ? 'active' : ''}">${item.title}</span>`).join('');

  qs('#fixBox').innerHTML = `
    <strong>Fix pattern</strong>
    <ul>
      <li>Move fragile logic upstream into Power Query where possible.</li>
      <li>Add an explicit no-history state instead of routing new items to dead demand.</li>
      <li>Use dynamic header lookup instead of hardcoded column numbers.</li>
      <li>Keep workbook governance strict so formulas are not overwritten with static values.</li>
      <li>Verify the running macro version matches the code being edited.</li>
    </ul>`;
}

function renderTimeline() {
  const root = qs('#timelineList');
  root.innerHTML = PORTFOLIO_DATA.timeline.map(item => `
    <article class="timeline-card glass tilt-subtle">
      <span class="timeline-year">${item.year}</span>
      <h3>${item.title}</h3>
      <div class="timeline-org">${item.org}</div>
      <p>${item.body}</p>
      <div class="chip-list">${item.chips.map(chip => `<span class="chip">${chip}</span>`).join('')}</div>
    </article>`).join('');
}

function setupReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  qsa('.reveal').forEach(el => io.observe(el));
}

function setupTilt() {
  qsa('.tilt, .tilt-subtle').forEach(card => {
    const max = card.classList.contains('tilt') ? 9 : 4.5;
    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 900) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * max;
      const ry = (px - 0.5) * max;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-1px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

function setupSectionSpy() {
  const links = qsa('.nav-links a');
  const badge = qs('#sectionBadge');
  const sections = links.map(link => qs(link.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = `#${visible.target.id}`;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === id));
    badge.textContent = visible.target.id.charAt(0).toUpperCase() + visible.target.id.slice(1);
  }, { rootMargin: '-35% 0px -50% 0px', threshold: [0.15, 0.35, 0.55] });
  sections.forEach(sec => io.observe(sec));
}

function init() {
  renderHeroMetrics();
  renderMetricStrip();
  hydrateArchNodes();
  renderArchDetail();
  renderFlow();
  renderFilters();
  renderCases();
  renderDiagnostic();
  renderTimeline();
  setupReveal();
  setupTilt();
  setupSectionSpy();
}

document.addEventListener('DOMContentLoaded', init);
