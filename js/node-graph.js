(function () {
  const container = document.getElementById('node-graph');
  if (!container) return;

  const nodes = [
    { id: 'floor', label: 'Floor feedback', x: 230, y: 70 },
    { id: 'slot', label: 'Slot economics', x: 390, y: 230 },
    { id: 'jit', label: 'JIT tuning', x: 230, y: 390 },
    { id: 'billing', label: 'Billing state', x: 70, y: 230 }
  ];

  const r = 230;
  const cx = 230, cy = 230;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 460 460');
  svg.setAttribute('role', 'img');

  const title = document.createElementNS(svgNS, 'title');
  title.textContent = 'Four operating loops, shown as a live connected system';
  svg.appendChild(title);

  function addEl(tag, attrs) {
    const el = document.createElementNS(svgNS, tag);
    Object.keys(attrs).forEach((k) => el.setAttribute(k, attrs[k]));
    svg.appendChild(el);
    return el;
  }

  addEl('circle', { cx: cx, cy: cy, r: r, fill: 'none', stroke: '#242c38', 'stroke-width': '1', 'stroke-dasharray': '2 6' });

  const order = ['floor', 'slot', 'jit', 'billing'];
  const byId = {};
  nodes.forEach((n) => (byId[n.id] = n));

  for (let i = 0; i < order.length; i++) {
    const a = byId[order[i]];
    const b = byId[order[(i + 1) % order.length]];
    addEl('path', {
      d: 'M' + a.x + ' ' + a.y + ' L' + b.x + ' ' + b.y,
      fill: 'none',
      stroke: '#3a4554',
      'stroke-width': '1'
    });

    const pulse = addEl('circle', { r: '3', fill: '#ff9d2e', opacity: '0' });
    const duration = 2.2 + i * 0.3;
    const delay = i * 0.55;
    pulse.style.animation = 'node-pulse-travel-' + i + ' ' + duration + 's linear infinite';
    pulse.style.animationDelay = delay + 's';

    const styleTag = document.createElement('style');
    styleTag.textContent =
      '@keyframes node-pulse-travel-' + i + ' {' +
      '0% { transform: translate(' + a.x + 'px,' + a.y + 'px); opacity: 0; }' +
      '8% { opacity: 1; }' +
      '92% { opacity: 1; }' +
      '100% { transform: translate(' + b.x + 'px,' + b.y + 'px); opacity: 0; }' +
      '}';
    document.head.appendChild(styleTag);
  }

  addEl('circle', { cx: cx, cy: cy, r: '34', fill: '#12161d', stroke: '#3a4554', 'stroke-width': '1' });
  const hubText1 = addEl('text', { x: cx, y: cy - 4, 'text-anchor': 'middle', fill: '#e8eaed', 'font-family': 'JetBrains Mono, monospace', 'font-size': '11', 'font-weight': '600' });
  hubText1.textContent = '1 SKU';
  const hubText2 = addEl('text', { x: cx, y: cy + 12, 'text-anchor': 'middle', fill: '#8b95a3', 'font-family': 'JetBrains Mono, monospace', 'font-size': '9' });
  hubText2.textContent = 'base';

  nodes.forEach((n, i) => {
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'hero-node');
    g.setAttribute('data-id', n.id);
    g.style.cursor = 'pointer';

    const halo = document.createElementNS(svgNS, 'circle');
    halo.setAttribute('cx', n.x);
    halo.setAttribute('cy', n.y);
    halo.setAttribute('r', '26');
    halo.setAttribute('fill', '#ff9d2e');
    halo.setAttribute('opacity', '0');
    halo.style.animation = 'node-halo 2.4s ease-in-out infinite';
    halo.style.animationDelay = (i * 0.6) + 's';
    g.appendChild(halo);

    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', n.x);
    circle.setAttribute('cy', n.y);
    circle.setAttribute('r', '18');
    circle.setAttribute('fill', '#1a2029');
    circle.setAttribute('stroke', '#ff9d2e');
    circle.setAttribute('stroke-width', '1.5');
    g.appendChild(circle);

    const numText = document.createElementNS(svgNS, 'text');
    numText.setAttribute('x', n.x);
    numText.setAttribute('y', n.y + 4);
    numText.setAttribute('text-anchor', 'middle');
    numText.setAttribute('fill', '#ff9d2e');
    numText.setAttribute('font-family', 'JetBrains Mono, monospace');
    numText.setAttribute('font-size', '12');
    numText.setAttribute('font-weight', '600');
    numText.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
    g.appendChild(numText);

    const labelY = n.y < cy ? n.y - 30 : n.y + 38;
    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', n.x);
    label.setAttribute('y', labelY);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('fill', '#8b95a3');
    label.setAttribute('font-family', 'JetBrains Mono, monospace');
    label.setAttribute('font-size', '10.5');
    label.textContent = n.label;
    g.appendChild(label);

    svg.appendChild(g);
  });

  const haloStyle = document.createElement('style');
  haloStyle.textContent =
    '@keyframes node-halo { 0%,100% { opacity: 0; r: 18; } 50% { opacity: 0.18; r: 28; } }' +
    '.hero-node circle:nth-child(2) { transition: stroke 0.2s ease, fill 0.2s ease; }' +
    '.hero-node:hover circle:nth-child(2) { fill: #ff9d2e22; }';
  document.head.appendChild(haloStyle);

  container.appendChild(svg);
})();
