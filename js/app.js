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
      <div class="kpi-caption">${m.context}</div>
    </article>`).join('');
}

function renderMetricStrip() {
  const root = qs('#metricStrip');
  root.innerHTML = PORTFOLIO_DATA.metrics.map(m => `
    <article class="metric-card glass tilt-subtle reveal-child">
      <div class="metric-top">${m.label}</div>
      <div class="metric-value">${m.value}</div>
      <div class="metric-note">${m.context}</div>
    </article>`).join('');
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
  const steps = PORTFOLIO_DATA.skuFlow;
  const step = steps[state.flow] || steps[0];
  const isSlotDecision = /slot decision/i.test(step.title);
  const isReentry = /re-entry/i.test(step.title);

  const branch = isSlotDecision ? `
    <div class="flow-branch">
      <div class="branch-path branch-fail">
        <span class="branch-label">If it fails the audit</span>
        <div class="branch-body">Item is removed and the slot is freed for a candidate that earns the space.</div>
      </div>
      <div class="branch-path branch-pass">
        <span class="branch-label">If it passes</span>
        <div class="branch-body">Item continues to JIT tuning, then billing transition, then steady state.</div>
      </div>
    </div>` : '';

  const reentryNote = isReentry ? `
    <div class="flow-loopback">↻ Steady-state items keep re-entering floor feedback weekly, so the system never freezes around old assumptions.</div>` : '';

  qs('#flowDetail').innerHTML = `
    <div class="flow-badge">Step ${state.flow + 1} of ${steps.length}</div>
    <h3>${step.title}</h3>
    <div class="detail-sub">${step.subtitle}</div>
    <p class="flow-copy">${step.detail}</p>
    ${branch}
    ${reentryNote}
    <div class="detail-metric">
      <span>Lifecycle framing</span>
      <div>This step exists to preserve governance visibility, not to let the item drift into the system without an explicit state.</div>
    </div>
    <div class="flow-controls">
      <button class="flow-nav" id="flowPrev" ${state.flow === 0 ? 'disabled' : ''}>&larr; Previous</button>
      <button class="flow-nav" id="flowNext" ${state.flow === steps.length - 1 ? 'disabled' : ''}>Next &rarr;</button>
    </div>`;

  const prev = qs('#flowPrev');
  const next = qs('#flowNext');
  if (prev) prev.addEventListener('click', () => { if (state.flow > 0) { state.flow--; renderFlow(); } });
  if (next) next.addEventListener('click', () => { if (state.flow < steps.length - 1) { state.flow++; renderFlow(); } });
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
          ${c.proves ? `<span class="case-proves">${c.proves}</span>` : ''}
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

  // wire replay button (rendered in HTML)
  const replayBtn = qs('#diagReplay');
  if (replayBtn && !replayBtn.dataset.wired) {
    replayBtn.dataset.wired = '1';
    replayBtn.addEventListener('click', replayFailureChain);
  }
}

function replayFailureChain() {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const order = PORTFOLIO_DATA.diagnostic.map(d => d.id);
  state.diagnostic = new Set();
  renderDiagnostic();
  if (reduceMotion) {
    state.diagnostic = new Set(order);
    renderDiagnostic();
    return;
  }
  let i = 0;
  function step() {
    if (i >= order.length) return;
    state.diagnostic.add(order[i]);
    renderDiagnostic();
    i++;
    setTimeout(step, 750);
  }
  step();
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
  if (window.ArchSystem) ArchSystem.init();
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
/* v6 Animated Operating Loop System
   Generates a live SVG architecture: central core, 4 ring loops, 3 supporting
   nodes, curved connectors, traveling signal pulses, hover/active states.
   Renders real SVG <text> labels (not CSS pseudo-elements) for reliability. */

(function () {
  const SVGNS = 'http://www.w3.org/2000/svg';

  // Layout geometry on a 1000 x 640 viewBox
  const CX = 500, CY = 320;
  const RING = 210; // radius of the 4 main loops around the core

  // Node positions. Main loops sit on a ring (top, right, bottom, left).
  // Supporting modules sit further out on the diagonals.
  const POS = {
    core:       { x: CX,        y: CY,        kind: 'core' },
    feedback:   { x: CX,        y: CY - RING, kind: 'loop' }, // top
    slot:       { x: CX + RING, y: CY,        kind: 'loop' }, // right
    jit:        { x: CX,        y: CY + RING, kind: 'loop' }, // bottom
    billing:    { x: CX - RING, y: CY,        kind: 'loop' }, // left
    governance: { x: CX - 330,  y: CY - 250,  kind: 'support' }, // upper-left
    intake:     { x: CX + 330,  y: CY - 250,  kind: 'support' }, // upper-right
    tracking:   { x: CX + 330,  y: CY + 250,  kind: 'support' }  // lower-right
  };

  // Connectors: [from, to, role]. 'loop' = main cycle, 'feed' = supporting feed.
  const LINKS = [
    ['feedback', 'slot', 'loop'],
    ['slot', 'jit', 'loop'],
    ['jit', 'billing', 'loop'],
    ['billing', 'feedback', 'loop'],
    ['feedback', 'core', 'spoke'],
    ['slot', 'core', 'spoke'],
    ['jit', 'core', 'spoke'],
    ['billing', 'core', 'spoke'],
    ['governance', 'feedback', 'feed'],
    ['intake', 'feedback', 'feed'],
    ['tracking', 'slot', 'feed']
  ];

  // Which links light up when a given node is active
  const RELATED = {
    feedback:   ['feedback-slot', 'billing-feedback', 'feedback-core', 'governance-feedback', 'intake-feedback'],
    slot:       ['feedback-slot', 'slot-jit', 'slot-core', 'tracking-slot'],
    jit:        ['slot-jit', 'jit-billing', 'jit-core'],
    billing:    ['jit-billing', 'billing-feedback', 'billing-core'],
    governance: ['governance-feedback'],
    intake:     ['intake-feedback'],
    tracking:   ['tracking-slot'],
    core:       ['feedback-core', 'slot-core', 'jit-core', 'billing-core']
  };

  function el(tag, attrs) {
    const node = document.createElementNS(SVGNS, tag);
    if (attrs) Object.keys(attrs).forEach((k) => node.setAttribute(k, attrs[k]));
    return node;
  }

  function curve(a, b) {
    // gentle curved path between two points
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    // perpendicular offset for the control point, scaled by distance
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const off = Math.min(70, len * 0.18);
    const cxp = mx + (-dy / len) * off;
    const cyp = my + (dx / len) * off;
    return { d: `M${a.x} ${a.y} Q ${cxp} ${cyp} ${b.x} ${b.y}`, cxp, cyp };
  }

  function build() {
    const board = document.getElementById('archBoard');
    if (!board || !window.PORTFOLIO_DATA) return;

    const dataMap = {};
    PORTFOLIO_DATA.architecture.forEach((a) => { dataMap[a.id] = a; });

    const svg = el('svg', {
      viewBox: '0 0 1000 660',
      class: 'arch-svg',
      role: 'img',
      'aria-label': 'Interactive operating architecture: four loops around a glowing core with supporting governance, intake, and tracking modules.'
    });

    // ---- defs: gradients, glows, radial backdrop ----
    const defs = el('defs');

    const wireGrad = el('linearGradient', { id: 'wireGrad', x1: '0', x2: '1', y1: '0', y2: '1' });
    wireGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#ffb454' }));
    wireGrad.appendChild(el('stop', { offset: '52%', 'stop-color': '#7fb2ff' }));
    wireGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#4a86ff' }));
    defs.appendChild(wireGrad);

    const coreGrad = el('radialGradient', { id: 'coreGrad', cx: '40%', cy: '35%', r: '75%' });
    coreGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#2f6fb0' }));
    coreGrad.appendChild(el('stop', { offset: '55%', 'stop-color': '#173f6b' }));
    coreGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#0c243f' }));
    defs.appendChild(coreGrad);

    const plateGrad = el('linearGradient', { id: 'plateGrad', x1: '0', x2: '0', y1: '0', y2: '1' });
    plateGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#ffffff' }));
    plateGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#eef3fb' }));
    defs.appendChild(plateGrad);

    const plateActiveGrad = el('linearGradient', { id: 'plateActiveGrad', x1: '0', x2: '0', y1: '0', y2: '1' });
    plateActiveGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#fffaf0' }));
    plateActiveGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#fde9c8' }));
    defs.appendChild(plateActiveGrad);

    const bgGlow = el('radialGradient', { id: 'bgGlow', cx: '50%', cy: '48%', r: '60%' });
    bgGlow.appendChild(el('stop', { offset: '0%', 'stop-color': 'rgba(120,170,255,.16)' }));
    bgGlow.appendChild(el('stop', { offset: '60%', 'stop-color': 'rgba(120,170,255,.04)' }));
    bgGlow.appendChild(el('stop', { offset: '100%', 'stop-color': 'rgba(120,170,255,0)' }));
    defs.appendChild(bgGlow);

    const softGlow = el('filter', { id: 'softGlow', x: '-60%', y: '-60%', width: '220%', height: '220%' });
    softGlow.appendChild(el('feGaussianBlur', { stdDeviation: '4', result: 'b' }));
    const m1 = el('feMerge');
    m1.appendChild(el('feMergeNode', { in: 'b' }));
    m1.appendChild(el('feMergeNode', { in: 'SourceGraphic' }));
    softGlow.appendChild(m1);
    defs.appendChild(softGlow);

    const coreGlow = el('filter', { id: 'coreGlow', x: '-80%', y: '-80%', width: '260%', height: '260%' });
    coreGlow.appendChild(el('feGaussianBlur', { stdDeviation: '10', result: 'cb' }));
    const m2 = el('feMerge');
    m2.appendChild(el('feMergeNode', { in: 'cb' }));
    m2.appendChild(el('feMergeNode', { in: 'SourceGraphic' }));
    coreGlow.appendChild(m2);
    defs.appendChild(coreGlow);

    const plateShadow = el('filter', { id: 'plateShadow', x: '-40%', y: '-40%', width: '180%', height: '200%' });
    const fe = el('feDropShadow', { dx: '0', dy: '12', stdDeviation: '14', 'flood-color': 'rgba(17,34,58,.28)' });
    plateShadow.appendChild(fe);
    defs.appendChild(plateShadow);

    svg.appendChild(defs);

    // ---- ambient backdrop layers ----
    const bg = el('g', { class: 'arch-bg' });
    bg.appendChild(el('rect', { x: '0', y: '0', width: '1000', height: '660', fill: 'url(#bgGlow)' }));
    // concentric guide rings around core for depth
    [340, 270, 200].forEach((rr, idx) => {
      bg.appendChild(el('circle', { cx: 500, cy: 320, r: rr, class: 'depth-ring', 'data-ring': idx }));
    });
    svg.appendChild(bg);

    const linkLayer = el('g', { class: 'arch-links' });
    const pulseLayer = el('g', { class: 'arch-pulses' });
    const nodeLayer = el('g', { class: 'arch-nodes' });
    svg.appendChild(linkLayer);
    svg.appendChild(pulseLayer);
    svg.appendChild(nodeLayer);

    const linkEls = {};
    const pulseEls = {};

    LINKS.forEach(([from, to, role], i) => {
      const a = POS[from], b = POS[to];
      const { d } = curve(a, b);
      const key = `${from}-${to}`;

      // base wire (dim) + flowing wire (animated dash) layered for depth
      const base = el('path', { d: d, class: `wire wire-${role} wire-base`, 'data-link': key, fill: 'none' });
      const flow = el('path', { d: d, class: `wire wire-${role} wire-flow`, 'data-link': key + '-flow', fill: 'none' });
      linkLayer.appendChild(base);
      linkLayer.appendChild(flow);
      linkEls[key] = base;

      if (role !== 'spoke') {
        // two staggered pulses per wire for a denser, more alive feel
        [0, 0.5].forEach((phase, pi) => {
          const pulse = el('circle', { r: role === 'loop' ? '5' : '4', class: `pulse pulse-${role}` });
          const dur = (role === 'loop' ? 3.4 : 4.6);
          const mp = el('animateMotion', {
            dur: dur + 's',
            repeatCount: 'indefinite',
            begin: (i * 0.35 + phase * dur) + 's',
            path: d,
            rotate: 'auto'
          });
          pulse.appendChild(mp);
          pulseLayer.appendChild(pulse);
          if (pi === 0) pulseEls[key] = mp;
        });
      }
    });

    // ---- Core node: large, glowing, layered ----
    const core = POS.core;
    const coreG = el('g', { class: 'arch-node-g core-node', 'data-arch': 'core', tabindex: '0', role: 'button', 'aria-label': 'Operating system core' });
    coreG.appendChild(el('circle', { cx: core.x, cy: core.y, r: '92', class: 'core-aura' }));
    coreG.appendChild(el('circle', { cx: core.x, cy: core.y, r: '78', class: 'core-halo' }));
    coreG.appendChild(el('circle', { cx: core.x, cy: core.y, r: '64', class: 'core-orbit' }));
    coreG.appendChild(el('circle', { cx: core.x, cy: core.y, r: '54', class: 'core-body', filter: 'url(#coreGlow)' }));
    coreG.appendChild(el('circle', { cx: core.x, cy: core.y, r: '54', class: 'core-rim' }));
    // orbiting accent dot
    const orbitDot = el('circle', { cx: core.x, cy: core.y - 64, r: '4', class: 'core-orbit-dot' });
    const orbAnim = el('animateTransform', { attributeName: 'transform', type: 'rotate', from: `0 ${core.x} ${core.y}`, to: `360 ${core.x} ${core.y}`, dur: '9s', repeatCount: 'indefinite' });
    orbitDot.appendChild(orbAnim);
    coreG.appendChild(orbitDot);
    const coreT1 = el('text', { x: core.x, y: core.y - 6, 'text-anchor': 'middle', class: 'core-label core-label-lg' });
    coreT1.textContent = 'OPERATING';
    const coreT2 = el('text', { x: core.x, y: core.y + 12, 'text-anchor': 'middle', class: 'core-label core-label-lg' });
    coreT2.textContent = 'SYSTEM CORE';
    const coreT3 = el('text', { x: core.x, y: core.y + 30, 'text-anchor': 'middle', class: 'core-sub' });
    coreT3.textContent = 'steady-state SKU control';
    coreG.appendChild(coreT1);
    coreG.appendChild(coreT2);
    coreG.appendChild(coreT3);
    nodeLayer.appendChild(coreG);

    // ---- Surrounding nodes ----
    Object.keys(POS).forEach((id) => {
      if (id === 'core') return;
      const p = POS[id];
      const d = dataMap[id];
      if (!d) return;

      const g = el('g', {
        class: `arch-node-g node-${p.kind}`,
        'data-arch': id,
        tabindex: '0',
        role: 'button',
        'aria-label': `${d.title}. ${d.tag}. Click to inspect.`
      });

      const w = p.kind === 'loop' ? 166 : 148;
      const h = p.kind === 'loop' ? 72 : 60;
      const rx = 16;
      const x0 = p.x - w / 2, y0 = p.y - h / 2;

      // depth shadow plate (offset, behind)
      g.appendChild(el('rect', { x: x0, y: y0, width: w, height: h, rx: rx, class: 'node-plate', filter: 'url(#plateShadow)' }));
      // accent edge bar (left)
      g.appendChild(el('rect', { x: x0, y: y0, width: 5, height: h, rx: 2.5, class: 'node-edge' }));
      // LED
      g.appendChild(el('circle', { cx: x0 + 22, cy: y0 + 17, r: '4.5', class: 'node-led' }));
      g.appendChild(el('circle', { cx: x0 + 22, cy: y0 + 17, r: '8', class: 'node-led-ring' }));

      const tag = el('text', { x: x0 + 36, y: y0 + 21, class: 'node-tag' });
      tag.textContent = d.tag.toUpperCase();
      g.appendChild(tag);

      // title wrap
      const words = d.title.split(' ');
      let line1 = d.title, line2 = '';
      if (d.title.length > 16) {
        const mid = Math.ceil(words.length / 2);
        line1 = words.slice(0, mid).join(' ');
        line2 = words.slice(mid).join(' ');
      }
      const t1 = el('text', { x: x0 + 18, y: p.y + (line2 ? 4 : 10), class: 'node-title' });
      t1.textContent = line1;
      g.appendChild(t1);
      if (line2) {
        const t2 = el('text', { x: x0 + 18, y: p.y + 21, class: 'node-title' });
        t2.textContent = line2;
        g.appendChild(t2);
      }

      nodeLayer.appendChild(g);
    });

    board.innerHTML = '';
    board.appendChild(svg);

    const cap = document.createElement('div');
    cap.className = 'board-caption';
    cap.id = 'boardCaption';
    cap.textContent = 'Idle: signal pulses cycle the loops. Click any node — or replay the flow — to read the logic.';
    board.appendChild(cap);

    return { svg, linkEls, pulseEls };
  }

  function routeReplay(id, ctx) {
    if (!ctx) return;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const related = RELATED[id] || [];
    related.forEach((key) => {
      const wire = ctx.svg.querySelector('.wire-flow[data-link="' + key + '-flow"]');
      if (wire) {
        wire.classList.remove('replay');
        // force reflow to restart the animation
        void wire.getBBox();
        wire.classList.add('replay');
        setTimeout(() => wire.classList.remove('replay'), 1200);
      }
    });
  }

  function setActive(id, ctx, opts) {
    if (!ctx) return;
    const data = PORTFOLIO_DATA.architecture.find((x) => x.id === id);

    // node active states
    Array.prototype.slice.call(ctx.svg.querySelectorAll('.arch-node-g')).forEach((n) => {
      n.classList.toggle('active', n.getAttribute('data-arch') === id);
    });

    // link highlight / fade
    const related = RELATED[id] || [];
    Object.keys(ctx.linkEls).forEach((key) => {
      const lit = related.includes(key);
      ctx.linkEls[key].classList.toggle('lit', lit);
      ctx.linkEls[key].classList.toggle('dim', related.length > 0 && !lit);
    });

    // route replay burst on the related paths
    if (opts && opts.replay) routeReplay(id, ctx);

    // detail panel with structured chips
    const panel = document.getElementById('archDetail');
    if (panel && data) {
      const inChips = data.inputs.map((i) => `<span class="io-chip in-chip">${i}</span>`).join('');
      const outChips = data.outputs.map((i) => `<span class="io-chip out-chip">${i}</span>`).join('');
      panel.innerHTML = `
        <div class="detail-badge">${data.tag} · ${data.cadence}</div>
        <h3>${data.title}</h3>
        <div class="detail-sub">${data.subtitle}</div>
        <p class="detail-copy">${data.role}</p>
        <div class="io-block">
          <div class="io-row"><span class="io-label">Inputs</span><div class="io-chips">${inChips}</div></div>
          <div class="io-flow-arrow" aria-hidden="true">&#8595;</div>
          <div class="io-row"><span class="io-label">Outputs</span><div class="io-chips">${outChips}</div></div>
        </div>
        <div class="detail-metric">
          <span>Why it matters</span>
          <div>${data.metric}</div>
        </div>`;
    }

    const cap = document.getElementById('boardCaption');
    if (cap && data) cap.textContent = `Active: ${data.title} — ${data.cadence}.`;
  }

  function setHover(id, ctx, on) {
    if (!ctx) return;
    const related = RELATED[id] || [];
    Object.keys(ctx.linkEls).forEach((key) => {
      ctx.linkEls[key].classList.toggle('hover-lit', on && related.includes(key));
    });
  }

  // Guided tour sequence: the 7-step walk through the system
  const TOUR = ['intake', 'feedback', 'slot', 'jit', 'billing', 'tracking', 'governance'];
  const TOUR_NOTE = {
    intake: 'A new signal enters — the item must first clear qualification gates.',
    feedback: 'Floor feedback catches friction fastest, before it becomes a shortage.',
    slot: 'Slot economics decides whether the item earns its physical space.',
    jit: 'JIT tuning adjusts reorder timing against real draw and hard constraints.',
    billing: 'Billing-state tracking protects lifecycle accuracy through the transition.',
    tracking: 'MWO tracking feeds shortage evidence back into the system.',
    governance: 'Governance / spec control prevents non-compliant inputs from entering.'
  };

  window.ArchSystem = {
    init() {
      const ctx = build();
      if (!ctx) return;

      const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let idleTimer = null;
      let tourTimer = null;
      let userEngaged = false;
      let cycleIdx = 0;

      function stopIdle() { if (idleTimer) { clearInterval(idleTimer); idleTimer = null; } }
      function stopTour() { if (tourTimer) { clearTimeout(tourTimer); tourTimer = null; } }

      function startIdle() {
        if (reduceMotion || userEngaged) return;
        stopIdle();
        idleTimer = setInterval(() => {
          if (userEngaged) { stopIdle(); return; }
          cycleIdx = (cycleIdx + 1) % TOUR.length;
          setActive(TOUR[cycleIdx], ctx);
        }, 3200);
      }

      function engage() {
        userEngaged = true;
        stopIdle();
        stopTour();
      }

      Array.prototype.slice.call(ctx.svg.querySelectorAll('.arch-node-g')).forEach((n) => {
        const id = n.getAttribute('data-arch');
        n.addEventListener('click', () => { engage(); setActive(id, ctx, { replay: true }); });
        n.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); engage(); setActive(id, ctx, { replay: true }); }
        });
        n.addEventListener('mouseenter', () => setHover(id, ctx, true));
        n.addEventListener('mouseleave', () => setHover(id, ctx, false));
      });

      // Guided tour button
      const tourBtn = document.getElementById('archTourBtn');
      if (tourBtn) {
        tourBtn.addEventListener('click', () => {
          engage();
          let step = 0;
          const cap = document.getElementById('boardCaption');
          function next() {
            if (step >= TOUR.length) {
              if (cap) cap.textContent = 'Tour complete — click any node to inspect it directly.';
              return;
            }
            const id = TOUR[step];
            setActive(id, ctx, { replay: true });
            if (cap) cap.textContent = `Step ${step + 1}/${TOUR.length}: ${TOUR_NOTE[id]}`;
            step++;
            tourTimer = setTimeout(next, reduceMotion ? 0 : 2600);
          }
          stopTour();
          next();
        });
      }

      // default selection + idle auto-cycle
      setActive('feedback', ctx);
      cycleIdx = 1; // feedback is index 1 in TOUR
      startIdle();
    }
  };
})();
