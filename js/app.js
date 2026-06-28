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
      viewBox: '0 0 1000 640',
      class: 'arch-svg',
      role: 'img',
      'aria-label': 'Interactive operating architecture: four loops around a core with supporting governance, intake, and tracking modules.'
    });

    // defs: gradients + glow filter
    const defs = el('defs');
    const grad = el('linearGradient', { id: 'wireGrad', x1: '0', x2: '1' });
    grad.appendChild(el('stop', { offset: '0%', 'stop-color': '#f5a23c' }));
    grad.appendChild(el('stop', { offset: '100%', 'stop-color': '#5aa0ff' }));
    defs.appendChild(grad);
    const glow = el('filter', { id: 'softGlow', x: '-50%', y: '-50%', width: '200%', height: '200%' });
    glow.appendChild(el('feGaussianBlur', { stdDeviation: '4', result: 'b' }));
    const merge = el('feMerge');
    merge.appendChild(el('feMergeNode', { in: 'b' }));
    merge.appendChild(el('feMergeNode', { in: 'SourceGraphic' }));
    glow.appendChild(merge);
    defs.appendChild(glow);
    svg.appendChild(defs);

    const linkLayer = el('g', { class: 'arch-links' });
    const pulseLayer = el('g', { class: 'arch-pulses' });
    const nodeLayer = el('g', { class: 'arch-nodes' });
    svg.appendChild(linkLayer);
    svg.appendChild(pulseLayer);
    svg.appendChild(nodeLayer);

    const linkEls = {};

    LINKS.forEach(([from, to, role], i) => {
      const a = POS[from], b = POS[to];
      const { d } = curve(a, b);
      const key = `${from}-${to}`;

      const path = el('path', { d: d, class: `wire wire-${role}`, 'data-link': key, fill: 'none' });
      linkLayer.appendChild(path);
      linkEls[key] = path;

      // traveling pulse on loop + feed wires (not the spokes, to reduce noise)
      if (role !== 'spoke') {
        const pulse = el('circle', { r: role === 'loop' ? '4.5' : '3.5', class: `pulse pulse-${role}` });
        const mp = el('animateMotion', {
          dur: (role === 'loop' ? 3.2 : 4.4) + 's',
          repeatCount: 'indefinite',
          begin: (i * 0.4) + 's',
          path: d,
          rotate: 'auto'
        });
        pulse.appendChild(mp);
        pulseLayer.appendChild(pulse);
      }
    });

    // Core node
    const core = POS.core;
    const coreG = el('g', { class: 'arch-node-g core-node', 'data-arch': 'core', tabindex: '0', role: 'button', 'aria-label': 'Operating system core' });
    coreG.appendChild(el('circle', { cx: core.x, cy: core.y, r: '58', class: 'core-halo' }));
    coreG.appendChild(el('circle', { cx: core.x, cy: core.y, r: '46', class: 'core-ring' }));
    const coreT1 = el('text', { x: core.x, y: core.y - 4, 'text-anchor': 'middle', class: 'core-label' });
    coreT1.textContent = 'Operating';
    const coreT2 = el('text', { x: core.x, y: core.y + 14, 'text-anchor': 'middle', class: 'core-label' });
    coreT2.textContent = 'System Core';
    coreG.appendChild(coreT1);
    coreG.appendChild(coreT2);
    nodeLayer.appendChild(coreG);

    // Other nodes
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

      const w = p.kind === 'loop' ? 150 : 138;
      const h = p.kind === 'loop' ? 64 : 56;
      const rx = 14;

      // LED + glow plate
      g.appendChild(el('rect', { x: p.x - w / 2, y: p.y - h / 2, width: w, height: h, rx: rx, class: 'node-plate' }));
      g.appendChild(el('circle', { cx: p.x - w / 2 + 16, cy: p.y - h / 2 + 15, r: '4', class: 'node-led' }));

      // tag (kicker)
      const tag = el('text', { x: p.x - w / 2 + 28, y: p.y - h / 2 + 19, class: 'node-tag' });
      tag.textContent = d.tag.toUpperCase();
      g.appendChild(tag);

      // title — wrap to two lines if long
      const words = d.title.split(' ');
      let line1 = d.title, line2 = '';
      if (d.title.length > 16) {
        // split roughly in half on a space
        let mid = Math.ceil(words.length / 2);
        line1 = words.slice(0, mid).join(' ');
        line2 = words.slice(mid).join(' ');
      }
      const t1 = el('text', { x: p.x - w / 2 + 14, y: p.y + (line2 ? 2 : 8), class: 'node-title' });
      t1.textContent = line1;
      g.appendChild(t1);
      if (line2) {
        const t2 = el('text', { x: p.x - w / 2 + 14, y: p.y + 18, class: 'node-title' });
        t2.textContent = line2;
        g.appendChild(t2);
      }

      nodeLayer.appendChild(g);
    });

    board.innerHTML = '';
    board.appendChild(svg);

    // caption
    const cap = document.createElement('div');
    cap.className = 'board-caption';
    cap.id = 'boardCaption';
    cap.textContent = 'Idle: signal pulses cycle the loops. Click any node to lock it and read the logic.';
    board.appendChild(cap);

    return { svg, linkEls };
  }

  function setActive(id, ctx) {
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

    // detail panel (reuse existing renderer markup style)
    const panel = document.getElementById('archDetail');
    if (panel && data) {
      panel.innerHTML = `
        <div class="detail-badge">${data.tag} · ${data.cadence}</div>
        <h3>${data.title}</h3>
        <div class="detail-sub">${data.subtitle}</div>
        <p class="detail-copy">${data.role}</p>
        <div class="meta-grid">
          <div class="meta-card">
            <strong>Inputs</strong>
            <ul class="meta-list">${data.inputs.map((i) => `<li>${i}</li>`).join('')}</ul>
          </div>
          <div class="meta-card">
            <strong>Outputs</strong>
            <ul class="meta-list">${data.outputs.map((i) => `<li>${i}</li>`).join('')}</ul>
          </div>
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

  window.ArchSystem = {
    init() {
      const ctx = build();
      if (!ctx) return;

      Array.prototype.slice.call(ctx.svg.querySelectorAll('.arch-node-g')).forEach((n) => {
        const id = n.getAttribute('data-arch');
        n.addEventListener('click', () => setActive(id, ctx));
        n.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(id, ctx); }
        });
        n.addEventListener('mouseenter', () => setHover(id, ctx, true));
        n.addEventListener('mouseleave', () => setHover(id, ctx, false));
      });

      // default selection
      setActive('feedback', ctx);
    }
  };
})();
